import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiOutlineLike, AiFillDislike} from 'react-icons/ai'
import {VscNewFolder} from 'react-icons/vsc'
import ReactPlayer from 'react-player'
import {formatDistanceToNow} from 'date-fns'

import ThemeContext from '../../context'
import {VideoDetailBg, VideoDetailBtn} from './style'
import Header from '../Header'
import NavItems from '../NavItems'

import './index.css'

class VideoItemDetails extends Component {
  state = {videoDetails: {}, pageStatus: 'LOADING'}

  componentDidMount() {
    this.getVideoData()
  }

  getVideoData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const each = data.video_details
      const updatedData = {
        id: each.id,
        title: each.title,
        thumbnailUrl: each.thumbnail_url,
        videoUrl: each.video_url,
        viewCount: each.view_count,
        publishedAt: each.published_at,
        description: each.description,
        channel: {
          subscriberCount: each.channel.subscriber_count,
          name: each.channel.name,
          profileImageUrl: each.channel.profile_image_url,
        },
      }
      this.setState({videoDetails: updatedData, pageStatus: 'SUCCESS'})
    } else {
      this.setState({pageStatus: 'FAILURE'})
    }
  }

  successView = (saveVideo, darkTheme) => {
    const {videoDetails} = this.state
    const {
      title,
      videoUrl,
      channel,
      viewCount,
      publishedAt,
      description,
    } = videoDetails
    const onSaveVideo = () => {
      saveVideo(videoDetails)
    }
    const {name, subscriberCount} = channel
    const time = formatDistanceToNow(new Date(publishedAt))
    return (
      <div>
        <ReactPlayer url={videoUrl} controls className="video-player" />
        <p>{title}</p>
        <div className="video-response-cont">
          <p>
            {viewCount} views - {time} ago
          </p>
          <ul className="rate-cont">
            <VideoDetailBtn
              dark={darkTheme}
              type="button"
              onClick={onSaveVideo}
            >
              <li className="like-item">
                <AiOutlineLike />
                <button type="button">Like</button>
              </li>
            </VideoDetailBtn>
            <VideoDetailBtn
              dark={darkTheme}
              type="button"
              onClick={onSaveVideo}
            >
              <li className="like-item">
                <AiFillDislike />
                <button type="button">Dislike</button>
              </li>
            </VideoDetailBtn>
            <VideoDetailBtn
              dark={darkTheme}
              type="button"
              onClick={onSaveVideo}
            >
              <li className="like-item">
                <VscNewFolder />
                <button type="button">Save</button>
              </li>
            </VideoDetailBtn>
          </ul>
        </div>
        <hr />
        <div className="video-description">
          {channel !== undefined && (
            <img
              src={channel.profileImageUrl}
              alt="channel logo"
              className="profile"
            />
          )}
          <div>
            {channel !== undefined && (
              <>
                <p>{name}</p>
                <p>{subscriberCount} subscribers</p>
              </>
            )}
            <p>{description}</p>
          </div>
        </div>
      </div>
    )
  }

  failureView = theme => (
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
        We are having some trouble to complete your request. Please try again.
      </p>
      <button type="button" onClick={this.getVideosData}>
        Retry
      </button>
    </div>
  )

  loadingView = isDark => (
    <div className={isDark ? 'loader-container' : ''} data-testid="loader">
      <Loader
        type="ThreeDots"
        color={isDark ? 'white' : 'green'}
        height="50"
        width="50"
      />
    </div>
  )

  finalView = (theme, saveVideo) => {
    const {pageStatus} = this.state
    switch (pageStatus) {
      case 'SUCCESS':
        return this.successView(saveVideo, theme)
      case 'LOADING':
        return this.loadingView(theme)
      default:
        return this.failureView(theme)
    }
  }

  render() {
    const {history} = this.props

    return (
      <ThemeContext.Consumer>
        {value => {
          const {darkTheme, saveVideo} = value
          return (
            <VideoDetailBg
              data-testid="videoItemDetails"
              dark={darkTheme}
              className="app-bg"
            >
              <Header history={history} />
              <div className="home-cont">
                <NavItems />
                <div className="videoDetails-cont">
                  {this.finalView(darkTheme, saveVideo)}
                </div>
              </div>
            </VideoDetailBg>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default VideoItemDetails
