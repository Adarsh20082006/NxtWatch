import { useState } from 'react'
import './index.css'
import { MdClose } from 'react-icons/md'
import ThemeContext from '../../context/ThemeContext/index'

const Banner = () => {
    const [showBanner, setShowBanner] = useState(true)
    if (showBanner) {
        return (
            <ThemeContext.Consumer>
                {val => {
                    const { theme } = val
                    return (

                        <div data-testid="banner" id="banner-lg" className="banner-container ">
                            <div className="banner-header-container">
                                <img
                                    className="website-logo"
                                    src='https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

                                    alt="nxt watch logo"
                                />
                                <button
                                    data-testid="close"
                                    onClick={() => setShowBanner(false)}
                                    type="button"
                                    className="banner-cls"
                                >
                                    <MdClose />
                                </button>
                            </div>

                            <p className="banner-text">
                                Buy Nxt Watch Premium prepaid plans with UPI
                            </p>
                            <button type="button" className="banner-btn">
                                GET IT NOW
                            </button>
                        </div>
                    )
                }}
            </ThemeContext.Consumer>
        )
    }
    return <></>
}

export default Banner
