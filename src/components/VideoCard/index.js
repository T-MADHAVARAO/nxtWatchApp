import './index.css'
import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'
import VideoCardBg from './style'
import ThemeContext from '../../context'

const VideoCard = props => {
  const {videoDetails} = props
  const {
    id,
    title,
    publishedAt,
    thumbnailUrl,
    viewCount,
    channel,
  } = videoDetails
  const time = formatDistanceToNow(new Date(publishedAt))

  return (
    <ThemeContext.Consumer>
      {value => {
        const {darkTheme} = value
        return (
          <Link to={`/videos/${id}`} className="video-item">
            <VideoCardBg dark={darkTheme} className="videoItem-cont">
              <img
                src={thumbnailUrl}
                alt="video thumbnail"
                className="thumbnail-img"
              />
              <div className="video-details">
                <img
                  src={channel.profileImageUrl}
                  className="profile-img"
                  alt="channel logo"
                />
                <div className="video-data">
                  <p>{title}</p>
                  <p>{channel.name}</p>
                  <p>
                    {viewCount} views - {time} ago
                  </p>
                </div>
              </div>
            </VideoCardBg>
          </Link>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default VideoCard
