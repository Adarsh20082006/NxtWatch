import { Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import ThemeContext from '../../context/ThemeContext/index'
import './index.css'

const Thumbnail = props => {
    const { videoInfo } = props
    const {
        id,
        title,
        thumbnailUrl,
        viewCount,
        publishedAt,
        channel: { name, profileImageUrl },
    } = videoInfo

    const timeAgo = formatDistanceToNow(new Date(publishedAt), {
        addSuffix: true,
    })

    return (
        <ThemeContext.Consumer>
            {({ theme }) => (
                <Link to={`/videos/${id}`} className="thumbnail-link">
                    <li className={`thumbnail-container ${theme}`}>
                        <img
                            src={thumbnailUrl}
                            alt="video thumbnail"
                            className="thumbnail-img"
                        />
                        <div className="thumbnail-details">
                            <img
                                src={profileImageUrl}
                                alt="channel logo"
                                className="channel-logo"
                            />
                            <div className="text-section">
                                <p className="video-title">{title}</p>
                                <p className="channel-name">{name}</p>
                                <div className="views-time">
                                    <p>{viewCount} views</p>
                                    <span className="dot">•</span>
                                    <p>{timeAgo}</p>
                                </div>
                            </div>
                        </div>
                    </li>
                </Link>
            )}
        </ThemeContext.Consumer>
    )
}

export default Thumbnail
