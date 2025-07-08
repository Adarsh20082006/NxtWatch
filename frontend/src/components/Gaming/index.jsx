import { useState, useEffect, useContext, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Navigator from '../Navigator/index'
import ThemeContext from '../../context/ThemeContext/index'
import Navbar from '../Navbar/index'
import { SiYoutubegaming } from 'react-icons/si'

import './index.css'

const Gaming = () => {
    const { theme } = useContext(ThemeContext)

    const [status, setStatus] = useState('LOADING')
    const [videoList, setVideoList] = useState([])

    const fetchGamingVideos = useCallback(async () => {
        const getCamelCaseData = obj => {
            if (Array.isArray(obj)) return obj.map(getCamelCaseData)
            if (typeof obj === 'object' && obj !== null) {
                return Object.entries(obj).reduce((acc, [key, val]) => {
                    const newKey = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase())
                    acc[newKey] = getCamelCaseData(val)
                    return acc
                }, {})
            }
            return obj
        }
        setStatus('LOADING')
        const jwtToken = Cookies.get('jwt_token')
        const url = `https://apis.ccbp.in/videos/gaming`

        const options = {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
            method: 'GET',
        }

        try {
            const res = await fetch(url, options)
            if (res.ok) {
                const data = await res.json()
                const updatedVideos = getCamelCaseData(data.videos)
                setVideoList(updatedVideos)
                setStatus('SUCCESS')
            } else {
                setStatus('FAILURE')
            }
        } catch {
            setStatus('FAILURE')
        }
    }, [])

    useEffect(() => {
        fetchGamingVideos()
    }, [fetchGamingVideos])

    const renderLoader = () => (
        <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
        </div>
    )

    const renderFailureView = () => (
        <div className="failure-message-container">
            <img
                src={
                    theme === 'dark'
                        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
                        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
                }
                alt="failure view"
                className="failure-img"
            />
            <h1 className="failure-msg">Oops! Something Went Wrong</h1>
            <p className="failure-text">
                We are having some trouble completing your request.
            </p>
            <p className="failure-text">Please try again.</p>
            <button type="button" onClick={fetchGamingVideos} className="retry-btn">
                Retry
            </button>
        </div>
    )

    const renderGamingVideos = () => (
        <ul className="gaming-video-list">
            {videoList.map(({ id, title, thumbnailUrl, viewCount }) => (
                <li key={id} className="gaming-video-item">
                    <Link to={`/videos/${id}`} className="gaming-link">
                        <img
                            src={thumbnailUrl}
                            alt="video thumbnail"
                            className="gaming-thumbnail"
                        />
                        <p className="gaming-title">{title}</p>
                        <p className="gaming-views">{viewCount} Watching Worldwide</p>
                    </Link>
                </li>
            ))}
        </ul>
    )

    const renderContent = () => {
        switch (status) {
            case 'LOADING':
                return renderLoader()
            case 'SUCCESS':
                return renderGamingVideos()
            case 'FAILURE':
            default:
                return renderFailureView()
        }
    }

    // return (
    //     <div data-testid="gaming" className={`gaming-main-container ${theme}`}>
    //         <div className={`gaming-header ${theme}`}>
    //             <h1 className="gaming-main-heading">Gaming</h1>
    //         </div>
    //         {renderContent()}
    //     </div>
    // )
    return (
        <div
            data-testid="gaming"
            className={`gaming-main-container  ${theme}`}
        >
            <Navbar />
            <div className="gaming-content-container">
                <div className="sidebar-container">
                    <Navigator />
                </div>

                <div className={`gaming-body-container ${theme}`}>
                    <div className={`gaming-header ${theme}`}>
                        <SiYoutubegaming className="gaming-icon" />
                        <h1 className="gaming-main-heading">Gaming</h1>
                    </div>
                    <div className="gaming-videos-container">{renderContent()}</div>
                </div>
            </div>
        </div>
    )
}

export default Gaming
