import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {HiFire} from 'react-icons/hi'
import Header from '../Header'
import NavItems from '../NavItems'
import TrendingVideoCard from '../TrendingVideoCard'
import ThemeContext from '../../context'
import TrendingBg from './style'
import './index.css'

class Trending extends Component {
  state = {trendingVideos: [], pageStatus: 'LOADING'}

  componentDidMount() {
    this.getVideosData()
  }

  getVideosData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const videosUrl = `https://apis.ccbp.in/videos/trending`
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
        title: each.title,
        thumbnailUrl: each.thumbnail_url,
        viewCount: each.view_count,
        publishedAt: each.published_at,
        channel: {
          name: each.channel.name,
          profileImageUrl: each.channel.profile_image_url,
        },
      }))

      this.setState({trendingVideos: updatedData, pageStatus: 'SUCCESS'})
    } else {
      this.setState({pageStatus: 'FAILURE'})
    }
  }

  successView = () => {
    const {trendingVideos} = this.state
    return (
      <ul className="trending-videos-cont">
        {trendingVideos.map(each => (
          <TrendingVideoCard key={each.id} eachVideo={each} />
        ))}
      </ul>
    )
  }

  failureView = dark => (
    <TrendingBg data-testid="trending" className="failure-cont">
      {dark ? (
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
    </TrendingBg>
  )

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

  finalView = dark => {
    const {pageStatus} = this.state
    switch (pageStatus) {
      case 'SUCCESS':
        return this.successView()
      case 'LOADING':
        return this.loadingView()
      default:
        return this.failureView(dark)
    }
  }

  render() {
    const {history} = this.props

    return (
      <ThemeContext.Consumer>
        {value => {
          const {darkTheme} = value
          return (
            <TrendingBg
              data-testid="trending"
              dark={darkTheme}
              className="app-bg"
            >
              <Header history={history} />
              <div className="home-cont">
                <NavItems />
                <TrendingBg
                  data-testid="trending"
                  dark={darkTheme}
                  className="trending-cont"
                >
                  <div className="trending-head">
                    <HiFire className="trending-icon" />
                    <h1>Trending</h1>
                  </div>
                  {this.finalView(darkTheme)}
                </TrendingBg>
              </div>
            </TrendingBg>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Trending
