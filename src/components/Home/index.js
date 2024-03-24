import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiOutlineClose, AiOutlineSearch} from 'react-icons/ai'
import ThemeContext from '../../context'
import Header from '../Header'
import VideoCard from '../VideoCard'
import NavItems from '../NavItems'
import {HomeBg, Search, SearchBtn} from './style'
import './index.css'

class Home extends Component {
  state = {
    videosArr: [],
    pageStatus: 'LOADING',
    searchVal: '',
    showPremium: true,
  }

  componentDidMount() {
    this.getVideosData()
  }

  getVideosData = async () => {
    const {searchVal} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const videosUrl = `https://apis.ccbp.in/videos/all?search=${searchVal}`
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
      this.setState({videosArr: updatedData, pageStatus: 'SUCCESS'})
      if (updatedData.length === 0) {
        this.setState({pageStatus: 'NO-VIDEOS'})
      }
    } else {
      this.setState({pageStatus: 'FAILURE'})
    }
  }

  closePremium = () => {
    this.setState({showPremium: false})
  }

  premiumCardView = () => (
    <div data-testid="banner" className="premium-cont">
      <div className="close-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="nxt watch logo"
          className="header-logo"
        />
        <button
          data-testid="close"
          type="button"
          className="close-btn"
          onClick={this.closePremium}
        >
          <AiOutlineClose />
        </button>
      </div>
      <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
      <button type="button">GET IT NOW</button>
    </div>
  )

  videosView = () => {
    const {videosArr} = this.state
    return (
      <ul className="videos-cont flow-style">
        {videosArr.map(each => (
          <VideoCard key={each.id} videoDetails={each} />
        ))}
      </ul>
    )
  }

  failureView = dark => (
    <HomeBg data-testid="home" className="failure-cont">
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
    </HomeBg>
  )

  retry = () => {
    this.setState({searchVal: ''}, this.getVideosData)
  }

  noVideosView = () => (
    <div className="failure-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
        className="failure-img"
      />

      <h1>No Search results found</h1>
      <p>Try different key words or remove search filter</p>
      <button type="button" onClick={this.retry}>
        Retry
      </button>
    </div>
  )

  finalView = dark => {
    const {pageStatus} = this.state
    switch (pageStatus) {
      case 'SUCCESS':
        return this.videosView()
      case 'LOADING':
        return this.loadingView()
      case 'NO-VIDEOS':
        return this.noVideosView()
      default:
        return this.failureView(dark)
    }
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

  updatedSearch = event => {
    this.setState({searchVal: event.target.value})
  }

  render() {
    const {searchVal, showPremium} = this.state
    const {history} = this.props
    return (
      <ThemeContext.Consumer>
        {value => {
          const {darkTheme} = value
          return (
            <HomeBg data-testid="home" dark={darkTheme} className="app-bg">
              <Header history={history} />
              <div className="home-cont">
                <NavItems />
                <HomeBg
                  data-testid="home"
                  dark={darkTheme}
                  className="premium-videos-cont"
                >
                  {showPremium && this.premiumCardView()}
                  <div className="videos-searchbar-cont">
                    <div className="search-cont">
                      <Search
                        dark={darkTheme}
                        type="search"
                        placeholder="Search"
                        className="search-bar"
                        value={searchVal}
                        onChange={this.updatedSearch}
                      />
                      <SearchBtn
                        data-testid="searchButton"
                        dark={darkTheme}
                        type="button"
                        className="search-btn"
                        onClick={this.getVideosData}
                      >
                        <AiOutlineSearch />
                      </SearchBtn>
                    </div>
                    {this.finalView(darkTheme)}
                  </div>
                </HomeBg>
              </div>
            </HomeBg>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Home
