import { useState, useEffect, useContext } from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import { ImFire } from 'react-icons/im'
import ThemeContext from '../../context/ThemeContext/index'
import Thumbnail from '../Thumbnail/index'
import Navbar from '../Navbar/index'
import Navigator from '../Navigator/index'

import './index.css'

const Trending = () => {
    const { theme } = useContext(ThemeContext)
    const [status, setStatus] = useState('LOADING')
    const [videoList, setVideoList] = useState([])
    const [retryCount, setRetryCount] = useState(0)

    useEffect(() => {
        const getTrendingVideos = async () => {
            const snakeToCamel = str =>
                str.toLowerCase().replace(/(_\w)/g, match => match[1].toUpperCase())

            const convertObjectKeysToCamelCase = obj => {
                if (Array.isArray(obj)) {
                    return obj.map(item => convertObjectKeysToCamelCase(item))
                }
                if (obj !== null && typeof obj === 'object') {
                    return Object.fromEntries(
                        Object.entries(obj).map(([key, value]) => [
                            snakeToCamel(key),
                            convertObjectKeysToCamelCase(value),
                        ]),
                    )
                }
                return obj
            }
            setStatus('LOADING')
            const jwtToken = Cookies.get('jwt_token')
            const url = 'https://apis.ccbp.in/videos/trending'
            const options = {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            }

            try {
                const response = await fetch(url, options)
                if (response.ok) {
                    const data = await response.json()
                    const camelCaseVideos = convertObjectKeysToCamelCase(data.videos)
                    setVideoList(camelCaseVideos)
                    setStatus('SUCCESS')
                } else {
                    setStatus('FAILURE')
                }
            } catch {
                setStatus('FAILURE')
            }
        }

        getTrendingVideos()
    }, [retryCount])

    const renderFailure = () => (
        <div className="failure-message-container">
            <img
                src={
                    theme === 'dark'
                        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
                        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
                }
                alt="failure"
            />
            <p className="failure-msg">Ooops! Something Went Wrong</p>
            <p className="failure-text">
                We are having some trouble completing your request.
            </p>
            <p className="failure-text">Please try again.</p>
            <button type="button" onClick={() => setRetryCount(prev => prev + 1)}>
                Retry
            </button>
        </div>
    )

    const renderLoader = () => (
        <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
        </div>
    )

    const renderVideos = () => (
        <div className={`video-list-container video-list-container-${theme}`}>
            {videoList.map(each => (
                <Thumbnail key={each.id} videoInfo={each} />
            ))}
        </div>
    )

    const renderContent = () => {
        switch (status) {
            case 'LOADING':
                return renderLoader()
            case 'SUCCESS':
                return renderVideos()
            case 'FAILURE':
            default:
                return renderFailure()
        }
    }

    return (
        <div
            data-testid="trending"
            className={`trending-main-container trending-main-container-${theme}`}
        >
            <Navbar />
            <div className="trending-content-container">
                <div className="sidebar-container">
                    <Navigator />
                </div>

                <div className={`trending-body-container ${theme}`}>
                    <div className="trending-heading-container">
                        <ImFire className="fire-icon" />
                        <h1 className="trending-title">Trending</h1>
                    </div>
                    <div className="trending-videos-container">{renderContent()}</div>
                </div>
            </div>
        </div>
    )
}

export default Trending
