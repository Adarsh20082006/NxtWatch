// context/ThemeContext.js
import { useState, createContext } from 'react'

const ThemeContext = createContext({
    theme: 'light',
    toggleTheme: () => { },
})

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('dark')

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContext
