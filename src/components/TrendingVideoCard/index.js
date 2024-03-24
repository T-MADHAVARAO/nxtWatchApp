import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import ThemeContext from '../../context'
import TrendingVideoStyle from './style'
import './index.css'

const TrendingVideoCard = props => {
  const {eachVideo} = props
  const {id, thumbnailUrl, title, publishedAt, viewCount, channel} = eachVideo
  const {name} = channel
  const time = formatDistanceToNow(new Date(publishedAt))

  return (
    <ThemeContext.Consumer>
      {value => {
        const {darkTheme} = value
        return (
          <Link to={`/videos/${id}`} className="link-style">
            <TrendingVideoStyle dark={darkTheme} className="trending-item-cont">
              <img
                src={thumbnailUrl}
                alt="video thumbnail"
                className="thumbnail-img-trending"
              />
              <div>
                <p>{title}</p>
                <p>{name}</p>
                <p>{viewCount} views</p>
                <p>{time} ago</p>
              </div>
            </TrendingVideoStyle>
          </Link>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default TrendingVideoCard
