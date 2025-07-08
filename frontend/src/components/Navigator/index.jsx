import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IoHomeSharp } from 'react-icons/io5'
import { ImFire } from 'react-icons/im'
import { SiYoutubegaming } from 'react-icons/si'
import { RiPlayListAddFill } from 'react-icons/ri'
import ThemeContext from '../../context/ThemeContext/index'

import './index.css'

const navLinks = [
    { path: '/', icon: <IoHomeSharp />, label: 'Home' },
    { path: '/trending', icon: <ImFire />, label: 'Trending' },
    { path: '/gaming', icon: <SiYoutubegaming />, label: 'Gaming' },
    { path: '/saved-videos', icon: <RiPlayListAddFill />, label: 'Saved videos' },
]

const Navigator = () => {
    const { theme } = useContext(ThemeContext)
    const { pathname } = useLocation() || '/'

    return (
        <div className={`navigator-container ${theme}`}>
            <div className="navigator-top-section">
                {navLinks.map(link => {
                    const isActive = pathname === link.path
                    return (
                        <Link to={link.path} key={link.path} className="nav-link">
                            <div
                                className={`navigator-item ${isActive ? 'active' : ''
                                    } ${theme}`}
                            >
                                <span className={`icon ${isActive ? 'active' : ''
                                    } ${theme}`}>{link.icon}</span>
                                <p className="label">{link.label}</p>
                            </div>
                        </Link>
                    )
                })}
            </div>

            <div className="navigator-bottom-section">
                <p className="contact-heading">CONTACT US</p>
                <div className="social-icons">
                    <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                        alt="facebook logo"
                        className="social-icon"
                    />
                    <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                        alt="twitter logo"
                        className="social-icon"
                    />
                    <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                        alt="linked in logo"
                        className="social-icon"
                    />
                </div>
                <p className="contact-text">
                    Enjoy! Now you can see your recommendations!
                </p>
            </div>
        </div>
    )
}

export default Navigator
