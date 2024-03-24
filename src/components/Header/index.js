import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {FaMoon} from 'react-icons/fa'
import {FiSun} from 'react-icons/fi'
import Popup from 'reactjs-popup'
import {HeaderBg} from './style'
import ThemeContext from '../../context'

import './index.css'

class Header extends Component {
  onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {toggleTheme, darkTheme} = value
          const changeTheme = () => {
            console.log(darkTheme)
            toggleTheme()
          }
          return (
            <HeaderBg darkTheme={darkTheme} className="header-cont">
              <Link to="/">
                {darkTheme ? (
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                    alt="website logo"
                    className="header-logo"
                  />
                ) : (
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="website logo"
                    className="header-logo"
                  />
                )}
              </Link>
              <div className="profile-theme-cont">
                <button data-testid="theme" type="button" onClick={changeTheme}>
                  {darkTheme ? (
                    <FiSun className="dark-theme-icon" />
                  ) : (
                    <FaMoon className="theme-icon" />
                  )}
                </button>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                  className="profile-img"
                />

                <Popup
                  modal
                  trigger={
                    <button type="button" className="logout-btn">
                      Logout
                    </button>
                  }
                  className="popup-content"
                >
                  {close => (
                    <>
                      <div>
                        <p>Are you sure, you want to logout?</p>
                      </div>
                      <div className="popup-btns">
                        <button
                          type="button"
                          className="trigger-button cancel-btn"
                          onClick={() => close()}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="trigger-button confirm-btn"
                          onClick={this.onLogout}
                        >
                          Confirm
                        </button>
                      </div>
                    </>
                  )}
                </Popup>
              </div>
            </HeaderBg>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Header
