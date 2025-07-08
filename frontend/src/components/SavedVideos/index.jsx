import { useContext } from 'react'
import ThemeContext from '../../context/ThemeContext/index'
import SavedVideoContext from '../../context/SavedVideoContext/index'
import Thumbnail from '../Thumbnail/index'
import Navbar from '../Navbar/index'
import Navigator from '../Navigator/index'
import './index.css'

const SavedVideos = () => {
    const { theme } = useContext(ThemeContext)
    const { savedVideos } = useContext(SavedVideoContext)

    const hasVideos = savedVideos.length > 0

    // return (
    //     <div
    //         data-testid="savedVideos"
    //         className={`saved-videos-main-container saved-videos-main-container-${theme}`}
    //     >
    //         {hasVideos ? (
    //             <>
    //                 <div className="saved-videos-heading-container">
    //                     <h1 className="saved-videos-heading">Saved Videos</h1>
    //                 </div>
    //                 <ul
    //                     className={`saved-video-list-container saved-video-list-container-${theme}`}
    //                 >
    //                     {savedVideos.map(each => (
    //                         <Thumbnail key={each.id} videoInfo={each} />
    //                     ))}
    //                 </ul>
    //             </>
    //         ) : (
    //             <div className="no-saved-videos">
    //                 <img
    //                     src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
    //                     alt="no saved videos"
    //                     className="no-saved-videos-img"
    //                 />
    //                 <h1 className="no-saved-video-heading">No Saved Videos Found</h1>
    //                 <p className="no-saved-video-text">
    //                     You can save your videos while watching them.
    //                 </p>
    //             </div>
    //         )}
    //     </div>
    // )
    return (
        <div
            data-testid="savedVideos"
            className={`saved-videos-main-container saved-videos-main-container-${theme}`}
        >
            <Navbar />
            <div className="saved-videos-content-container">
                <div className="sidebar-container">
                    <Navigator />
                </div>

                <div className={`saved-videos-body-container ${theme}`}>
                    <div className="saved-videos-heading-container">
                        <h1 className="saved-videos-heading">Saved Videos</h1>
                    </div>
                    <div className="saved-videos-container">
                        {hasVideos ? (
                            <div className='saved-video-lists'>
                                <ul
                                    className={`saved-video-list-container saved-video-list-container-${theme}`}
                                >
                                    {savedVideos.map(each => (
                                        <Thumbnail key={each.id} videoInfo={each} />
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <div className="no-saved-videos">
                                <img
                                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                                    alt="no saved videos"
                                    className="no-saved-videos-img"
                                />
                                <h1 className="no-saved-video-heading">No Saved Videos Found</h1>
                                <p className="no-saved-video-text">
                                    You can save your videos while watching them.
                                </p>
                            </div>
                        )}</div>
                </div>
            </div>
        </div>
    )
}

export default SavedVideos
