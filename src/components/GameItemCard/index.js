import {Link} from 'react-router-dom'
import ThemeContext from '../../context'
import GameItemBg from './style'
import './index.css'

const GameItemCard = props => {
  const {eachGame} = props
  const {id, title, thumbnailUrl, viewCount} = eachGame
  return (
    <ThemeContext.Consumer>
      {value => {
        const {darkTheme} = value
        return (
          <Link to={`videos/${id}`} className="game-link-cont">
            <GameItemBg dark={darkTheme} className="game-card-cont">
              <img
                src={thumbnailUrl}
                alt="video thumbnail"
                className="game-img"
              />
              <p>{title}</p>
              <p>{viewCount} Watching Worldwide</p>
            </GameItemBg>
          </Link>
        )
      }}
    </ThemeContext.Consumer>
  )
}
export default GameItemCard
