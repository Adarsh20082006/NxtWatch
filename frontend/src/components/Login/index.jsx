import { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'
import ThemeContext from '../../context/ThemeContext/index'
import LoginTextbox from '../StyledComponents/index'
import './index.css'

const Login = () => {
    const history = useHistory()
    const { theme } = useContext(ThemeContext)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const onLoginSubmit = async event => {
        event.preventDefault()
        const userDetails = { username, password }
        const url = 'https://apis.ccbp.in/login'
        const options = { method: 'POST', body: JSON.stringify(userDetails) }

        try {
            const response = await fetch(url, options)
            const data = await response.json()

            if (response.ok) {
                Cookies.set('jwt_token', data.jwt_token, { expires: 30 })
                history.replace('/')
            } else {
                setErrorMsg(data.error_msg)
            }
        } catch {
            setErrorMsg('Something went wrong. Please try again later.')
        }
    }

    return (
        <div className={`main-login-container ${theme}`}>
            <div className={`login-container ${theme}`}>
                <img
                    className="login-logo"
                    src={
                        theme === 'light'
                            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                    }
                    alt="website logo"
                />
                <form className="login-form" onSubmit={onLoginSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">USERNAME</label>
                        <LoginTextbox
                            type="text"
                            id="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder="Username"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">PASSWORD</label>
                        <LoginTextbox
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                    </div>

                    <div className="show-password-container">
                        <input
                            id="showPassword"
                            type="checkbox"
                            checked={showPassword}
                            onChange={() => setShowPassword(prev => !prev)}
                        />
                        <label htmlFor="showPassword" className="show-password-text">
                            Show Password
                        </label>
                    </div>

                    {errorMsg && <p className="error-msg">*{errorMsg}</p>}

                    <button type="submit" className="login-btn">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
