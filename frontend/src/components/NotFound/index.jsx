import { useContext } from 'react'
import ThemeContext from '../../context/ThemeContext/index'
import './index.css'

const NotFound = () => {
    const { theme } = useContext(ThemeContext)

    const notFoundImage =
        theme === 'dark'
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'

    return (
        <div
            data-testid="notFound"
            className={`not-found-container not-found-container-${theme}`}
        >
            <img src={notFoundImage} alt="not found" className="not-found-img" />
            <h1 className="notfound-heading">Page Not Found</h1>
            <p className="notfound-text">
                We are sorry, the page you requested could not be found.
            </p>
        </div>
    )
}

export default NotFound
