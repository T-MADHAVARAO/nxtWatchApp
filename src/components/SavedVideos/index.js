import {Component} from 'react'
import {VscNewFolder} from 'react-icons/vsc'
import ThemeContext from '../../context'
import Header from '../Header'
import NavItems from '../NavItems'
import TrendingVideoCard from '../TrendingVideoCard'
import SavedVideosBg from './style'

class SavedVideos extends Component {
  noSavedVideoView = () => (
    <div className="failure-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="no saved videos"
        className="failure-img"
      />

      <h1>No saved videos found</h1>
      <p>You can save your videos while watching them</p>
    </div>
  )

  render() {
    const {history} = this.props
    return (
      <ThemeContext.Consumer>
        {value => {
          const {savedVideos, darkTheme} = value
          return (
            <SavedVideosBg
              data-testid="savedVideos"
              dark={darkTheme}
              className="app-bg"
            >
              <Header history={history} />
              <div className="home-cont">
                <NavItems />
                <SavedVideosBg
                  data-testid="savedVideos"
                  dark={darkTheme}
                  className="trending-cont"
                >
                  {savedVideos.length === 0 ? (
                    this.noSavedVideoView()
                  ) : (
                    <div>
                      <div className="trending-head">
                        <VscNewFolder className="trending-icon" />
                        <h1>Saved Videos</h1>
                      </div>
                      <ul className="trending-videos-cont">
                        {savedVideos.map(each => (
                          <TrendingVideoCard key={each.id} eachVideo={each} />
                        ))}
                      </ul>
                    </div>
                  )}
                </SavedVideosBg>
              </div>
            </SavedVideosBg>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default SavedVideos
