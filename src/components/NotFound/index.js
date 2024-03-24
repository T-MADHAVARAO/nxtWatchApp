import {Component} from 'react'
import Header from '../Header'
import NavItems from '../NavItems'
import ThemeContext from '../../context'
import NotFoundBg from './style'
import './index.css'

class NotFound extends Component {
  render() {
    const {history} = this.props
    return (
      <ThemeContext.Consumer>
        {value => {
          const {darkTheme} = value
          const imageUrl = darkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
          return (
            <NotFoundBg dark={darkTheme}>
              <Header history={history} />
              <div className="home-cont">
                <NavItems />
                <NotFoundBg dark={darkTheme} className="not-found-cont">
                  <img
                    src={imageUrl}
                    alt="not found"
                    className="not-found-img"
                  />
                  <h1>Page Not Found</h1>
                  <p>
                    we are sorry, the page you requested could not be found.
                  </p>
                </NotFoundBg>
              </div>
            </NotFoundBg>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default NotFound
