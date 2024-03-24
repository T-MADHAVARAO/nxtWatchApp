import {Component} from 'react'
import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {VscNewFolder} from 'react-icons/vsc'
import {Link} from 'react-router-dom'
import {NavItem, NavBg} from './style'
import ThemeContext from '../../context'

import './index.css'

class NavItems extends Component {
  state = {activeTab: 'HOME'}

  onHome = () => {
    this.setState({activeTab: 'HOME'})
  }

  onTrend = () => {
    this.setState({activeTab: 'TREND'})
  }

  onGame = () => {
    this.setState({activeTab: 'GAME'})
  }

  onSave = () => {
    this.setState({activeTab: 'SAVE'})
  }

  render() {
    const {activeTab} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {darkTheme} = value
          return (
            <NavBg darkTheme={darkTheme} className="nav-item">
              <ul>
                <Link to="/" className="link-item">
                  <li>
                    <NavItem
                      darkTheme={darkTheme}
                      className="nav-btn"
                      onClick={this.onHome}
                    >
                      <AiFillHome
                        className="home-icon"
                        color={activeTab === 'HOME' && 'red'}
                      />
                      <p>Home</p>
                    </NavItem>
                  </li>
                </Link>
                <Link to="/trending" className="link-item">
                  <li>
                    <NavItem
                      darkTheme={darkTheme}
                      className="nav-btn"
                      onClick={this.onTrend}
                    >
                      <HiFire
                        className="icons"
                        color={activeTab === 'TREND' && 'red'}
                      />
                      <p>Trending</p>
                    </NavItem>
                  </li>
                </Link>
                <Link to="/gaming" className="link-item">
                  <li>
                    <NavItem
                      darkTheme={darkTheme}
                      onClick={this.onGame}
                      className="nav-btn"
                    >
                      <SiYoutubegaming
                        className="icons"
                        color={activeTab === 'GAME' && 'red'}
                      />
                      <p>Gaming</p>
                    </NavItem>
                  </li>
                </Link>
                <Link to="/saved-videos" className="link-item">
                  <li>
                    <NavItem
                      darkTheme={darkTheme}
                      onClick={this.onSave}
                      className="nav-btn"
                    >
                      <VscNewFolder
                        className="icons"
                        color={activeTab === 'SAVE' && 'red'}
                      />
                      <p>Saved Videos</p>
                    </NavItem>
                  </li>
                </Link>
              </ul>
              <div>
                <p>CONTACT US</p>
                <div className="social-cont">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                    alt="facebook logo"
                    className="social-item"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                    alt="twitter logo"
                    className="social-item"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                    alt="linked in logo"
                    className="social-item"
                  />
                </div>
                <p>Enjoy! Now to see your channels and recommendations!</p>
              </div>
            </NavBg>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default NavItems
