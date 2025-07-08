// context/SavedVideoContext.js
import { createContext, useState, useCallback } from 'react'

const SavedVideoContext = createContext({
    savedVideos: [],
    toggleSaveVideo: () => { },
    isVideoSaved: () => false,
})

export const SavedVideoProvider = ({ children }) => {
    const [savedVideos, setSavedVideos] = useState([])

    const toggleSaveVideo = useCallback(video => {
        setSavedVideos(prevVideos => {
            const isAlreadySaved = prevVideos.some(item => item.id === video.id)
            if (isAlreadySaved) {
                return prevVideos.filter(item => item.id !== video.id)
            }
            return [...prevVideos, video]
        })
    }, [])

    const isVideoSaved = useCallback(
        id => savedVideos.some(video => video.id === id),
        [savedVideos],
    )

    return (
        <SavedVideoContext.Provider
            value={{ savedVideos, toggleSaveVideo, isVideoSaved }}
        >
            {children}
        </SavedVideoContext.Provider>
    )
}

export default SavedVideoContext
