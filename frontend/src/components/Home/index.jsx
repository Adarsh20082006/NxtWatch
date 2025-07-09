import { useState, useEffect, useContext, useCallback } from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import { FaSearch } from 'react-icons/fa'

import Navbar from '../Navbar/index'
import Navigator from '../Navigator/index'
import Banner from '../Banner/index'
import Thumbnail from '../Thumbnail/index'

import ThemeContext from '../../context/ThemeContext/index'

import './index.css'

const Home = () => {
    const { theme } = useContext(ThemeContext)

    const [search, setSearch] = useState('')
    const [tempSearch, setTempSearch] = useState('')
    const [videoList, setVideoList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [apiFailure, setApiFailure] = useState(false)

    const jwtToken = Cookies.get('jwt_token')

    const fetchVideos = useCallback(async () => {
        const toCamelCase = obj => {
            if (Array.isArray(obj)) {
                return obj.map(toCamelCase)
            }
            if (obj !== null && typeof obj === 'object') {
                return Object.entries(obj).reduce((acc, [key, val]) => {
                    const camelKey = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase())
                    acc[camelKey] = toCamelCase(val)
                    return acc
                }, {})
            }
            return obj
        }
        setIsLoading(true)
        setApiFailure(false)
        const url = `https://apis.ccbp.in/videos/all?search=${search}`
        const options = {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
            method: 'GET',
        }

        try {
            const response = await fetch(url, options)
            if (response.ok) {
                const jsonData = await response.json()
                const updatedVideos = toCamelCase(jsonData.videos)
                setVideoList(updatedVideos)
            } else {
                setApiFailure(true)
            }
        } catch (err) {
            setApiFailure(true)
        } finally {
            setIsLoading(false)
        }
    }, [search, jwtToken])

    useEffect(() => {
        fetchVideos()
    }, [fetchVideos])

    const onSearch = e => {
        e.preventDefault()
        setSearch(tempSearch)
    }

    const renderLoader = () => (
        <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
        </div>
    )

    const renderFailureView = () => (
        <div className="failure-view-container">
            <img
                src={
                    theme === 'dark'
                        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
                        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
                }
                alt="failure view"
                className="failure-img"
            />
            <h1 className="failure-heading">Oops! Something Went Wrong</h1>
            <p className="failure-description">
                We are having some trouble completing your request. Please try again.
            </p>
            <button type="button" className="retry-btn" onClick={fetchVideos}>
                Retry
            </button>
        </div>
    )

    const renderNoVideosView = () => (
        <div className="no-videos-container">
            <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                alt="no videos"
                className="no-videos-img"
            />
            <h1 className="no-videos-heading">No Search results found</h1>
            <p className="no-videos-description">
                Try different key words or remove search filter.
            </p>
            <button type="button" className="retry-btn" onClick={fetchVideos}>
                Retry
            </button>
        </div>
    )

    const renderVideos = () => {
        if (apiFailure) return renderFailureView()
        if (videoList.length === 0) return renderNoVideosView()

        return (
            <ul className={`home-video-list-container ${theme}`}>
                {videoList.map(video => (
                    <Thumbnail key={video.id} videoInfo={video} />
                ))}
            </ul>
        )
    }

    return (
        <div data-testid="home" className={`home-main-container ${theme}`}>
            <Navbar />
            <div className="home-content-container">
                <div className="sidebar-container">
                    <Navigator />
                </div>

                <div className={`home-body-container ${theme}`}>
                    <Banner />
                    <div className={`home-videos-container ${theme}`}>
                        <form className="searchbar-container" onSubmit={onSearch}>
                            <input
                                type="search"
                                className={`searchbox ${theme}`}
                                placeholder="Search"
                                value={tempSearch}
                                onChange={e => setTempSearch(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="searchbox-btn"
                                data-testid="searchButton"
                            >
                                <FaSearch className="search-icon" />
                            </button>
                        </form>

                        {isLoading ? renderLoader() : renderVideos()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
