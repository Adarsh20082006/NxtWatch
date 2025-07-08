// Updated VideoDetails Component with Clean Structure & Styling
import { useState, useEffect, useContext } from 'react'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import Cookies from 'js-cookie'
import { BiDislike, BiLike } from 'react-icons/bi'
import { MdPlaylistAdd } from 'react-icons/md'
import Navbar from '../Navbar/index'
import Navigator from '../Navigator/index'
import ThemeContext from '../../context/ThemeContext/index'
import SavedVideoContext from '../../context/SavedVideoContext/index'
import './index.css'

const VideoDetails = props => {
    const { match } = props
    const { params } = match
    const { id } = params

    const { theme } = useContext(ThemeContext)
    const { toggleSaveVideo, isVideoSaved } = useContext(SavedVideoContext)

    const [videoInfo, setVideoInfo] = useState({})
    const [isLiked, setIsLiked] = useState(false)
    const [isDisLiked, setIsDisLiked] = useState(false)
    const [status, setStatus] = useState('LOADING')
    const [retryCount, setRetryCount] = useState(0)

    const handleLike = () => {
        setIsLiked(prev => !prev)
        if (!isLiked) setIsDisLiked(false)
    }

    const handleDislike = () => {
        setIsDisLiked(prev => !prev)
        if (!isDisLiked) setIsLiked(false)
    }

    const isSaved = isVideoSaved(id)

    useEffect(() => {
        const fetchVideoDetails = async () => {
            const convertObjectKeysToCamelCase = obj => {
                const snakeToCamel = str => str.replace(/_\w/g, m => m[1].toUpperCase())
                if (Array.isArray(obj)) return obj.map(convertObjectKeysToCamelCase)
                if (obj && typeof obj === 'object') {
                    return Object.fromEntries(
                        Object.entries(obj).map(([k, v]) => [
                            snakeToCamel(k),
                            convertObjectKeysToCamelCase(v),
                        ]),
                    )
                }
                return obj
            }
            setStatus('LOADING')
            const jwtToken = Cookies.get('jwt_token')
            const url = `https://apis.ccbp.in/videos/${id}`
            const options = {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            }
            try {
                const response = await fetch(url, options)
                if (!response.ok) throw new Error('API failed')
                const data = await response.json()
                const details = convertObjectKeysToCamelCase(data.video_details)
                setVideoInfo(details)
                setStatus('SUCCESS')
            } catch {
                setStatus('FAILURE')
            }
        }
        fetchVideoDetails()
    }, [id, retryCount])

    const renderLoading = () => (
        <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
        </div>
    )

    const renderFailure = () => (
        <div className="failure-message-container">
            <img
                src={`https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-${theme}-theme-img.png`}
                alt="failure view"
            />
            <h1>Oops! Something Went Wrong</h1>
            <p>We are having some trouble to complete your request.</p>
            <button type="button" onClick={() => setRetryCount(prev => prev + 1)}>
                Retry
            </button>
        </div>
    )

    const renderVideoContent = () => (
        <div className={`details-main-container ${theme}`}>
            <div className="details-container">
                <ReactPlayer url={videoInfo.videoUrl} controls width="100%" />
                <h1 className="details-title">{videoInfo.title}</h1>
                <div className="details-options-container">
                    <div className="thumbnail-footer">
                        <p>{videoInfo.viewCount} views</p>
                        <span className="dot">.</span>
                        <p>{videoInfo.publishedAt}</p>
                    </div>
                    <div className="details-features-container">
                        <button
                            type="button"
                            onClick={handleLike}
                            className={isLiked ? 'active' : ''}
                        >
                            <BiLike /> Like
                        </button>
                        <button
                            type="button"
                            onClick={handleDislike}
                            className={isDisLiked ? 'active' : ''}
                        >
                            <BiDislike /> Dislike
                        </button>
                        <button
                            type="button"
                            onClick={() => toggleSaveVideo(videoInfo)}
                            className={isSaved ? 'active' : ''}
                        >
                            <MdPlaylistAdd /> {isSaved ? 'Saved' : 'Save'}
                        </button>
                    </div>
                </div>
                <hr />
                <div className="channel-info">
                    <img
                        src={videoInfo.channel.profileImageUrl}
                        alt="channel logo"
                        className="channel-logo"
                    />
                    <div>
                        <p className="channel-name">{videoInfo.channel.name}</p>
                        <p className="channel-subscribers">
                            {videoInfo.channel.subscriptionCount} subscribers
                        </p>
                        <p className="video-description">{videoInfo.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )

    const renderContent = () => {
        switch (status) {
            case 'LOADING':
                return renderLoading()
            case 'SUCCESS':
                return renderVideoContent()
            default:
                return renderFailure()
        }
    }

    return (
        <div
            className={`details-bg-container ${theme}`}
            data-testid="videoItemDetails"
        >
            <Navbar />
            <div className="navigator-dashboard-container">
                <Navigator />
                {renderContent()}
            </div>
        </div>
    )
}

export default VideoDetails