import { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import ThemeContext from '../../context/ThemeContext/index'


import './index.css'

const Navbar = () => {
    const { theme, toggleTheme } = useContext(ThemeContext)
    const history = useHistory()

    const onLogout = () => {
        Cookies.remove('jwt_token')
        history.replace('/login')
    }

    const logoUrl =
        theme === 'light'
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

    return (
        <nav className={`navbar-container ${theme}`}>
            <Link to="/" className="navbar-logo-container">
                <img className="navbar-logo" src={logoUrl} alt="website logo" />
            </Link>

            <ul className="navbar-options-container">
                <li>
                    <button
                        type="button"
                        data-testid="theme"
                        className="theme-toggle-btn"
                        onClick={toggleTheme}
                    >
                        {theme === 'light' ? <img src="/src/assets/icons8-dark-mode-30.png" alt="dark" className='dark-icon' /> : <img src="/src/assets/icons8-light-mode-30.png" alt="light" className='light-icon' />}
                    </button>
                </li>

                <li className="profile-img-container">
                    <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                        alt="profile"
                        className="profile-img"
                    />
                </li>

                <li>
                    <Popup
                        modal
                        trigger={
                            <button type="button" className="logout-trigger-btn">
                                Logout
                            </button>
                        }
                        className="popup-content"
                    >
                        {close => (
                            <div className="popup-container">
                                <p className="popup-text">Are you sure you want to logout?</p>
                                <div className="popup-buttons">
                                    <button
                                        type="button"
                                        className="cancel-btn"
                                        onClick={() => close()}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="confirm-btn"
                                        onClick={() => {
                                            onLogout()
                                            close()
                                        }}
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        )}
                    </Popup>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
