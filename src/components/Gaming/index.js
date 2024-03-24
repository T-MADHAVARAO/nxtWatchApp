import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {SiYoutubegaming} from 'react-icons/si'
import Header from '../Header'
import NavItems from '../NavItems'
import ThemeContext from '../../context'
import GameItemCard from '../GameItemCard'
import GameBg from './style'
import './index.css'

class Gaming extends Component {
  state = {gamesArr: [], pageStatus: 'LOADING'}

  componentDidMount() {
    this.getVideosData()
  }

  getVideosData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const videosUrl = `https://apis.ccbp.in/videos/gaming`
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(videosUrl, options)
    const data = await response.json()
    if (response.ok) {
      const videosArr = data.videos
      const updatedData = videosArr.map(each => ({
        id: each.id,
        thumbnailUrl: each.thumbnail_url,
        viewCount: each.view_count,
        title: each.title,
      }))

      this.setState({gamesArr: updatedData, pageStatus: 'SUCCESS'})
    } else {
      this.setState({pageStatus: 'FAILURE'})
    }
  }

  successView = () => {
    const {gamesArr} = this.state
    return (
      <ul className="game-card-cont">
        {gamesArr.map(each => (
          <GameItemCard key={each.id} eachGame={each} />
        ))}
      </ul>
    )
  }

  failureView = () => {
    const theme = false
    return (
      <div className="failure-cont">
        {theme ? (
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"
            alt="failure view"
            className="failure-img"
          />
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
            alt="failure view"
            className="failure-img"
          />
        )}
        <h1>Oops! Something Went Wrong</h1>
        <p>
          We are having some trouble to complete your request. Please try again
        </p>
        <button type="button" onClick={this.getVideosData}>
          Retry
        </button>
      </div>
    )
  }

  loadingView = () => {
    const isDark = false
    return (
      <div className="loader-container" data-testid="loader">
        <Loader
          type="ThreeDots"
          color={isDark ? 'white' : 'green'}
          height="50"
          width="50"
        />
      </div>
    )
  }

  finalView = () => {
    const {pageStatus} = this.state
    switch (pageStatus) {
      case 'SUCCESS':
        return this.successView()
      case 'LOADING':
        return this.loadingView()
      default:
        return this.failureView()
    }
  }

  render() {
    const {history} = this.props

    return (
      <ThemeContext.Consumer>
        {value => {
          const {darkTheme} = value
          return (
            <GameBg dark={darkTheme} data-testid="gaming">
              <Header history={history} />
              <div className="home-cont">
                <NavItems />
                <div className="gaming-cont">
                  <div className="gaming-head">
                    <SiYoutubegaming className="trending-icon" />
                    <h1>Gaming</h1>
                  </div>
                  {this.finalView()}
                </div>
              </div>
            </GameBg>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Gaming
