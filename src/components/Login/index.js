import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import ThemeContext from '../../context'
import LoginBg from './style'
import './index.css'

class Login extends Component {
  state = {
    showPassword: 'password',
    loginErrMsg: '',
    usernameVal: '',
    passwordVal: '',
  }

  updateUsername = event => {
    this.setState({usernameVal: event.target.value})
  }

  updatePassword = event => {
    this.setState({passwordVal: event.target.value})
  }

  onShowPassword = event => {
    if (event.target.checked) {
      this.setState({showPassword: 'text'})
    } else {
      this.setState({showPassword: 'password'})
    }
  }

  onLogin = async event => {
    const {usernameVal, passwordVal} = this.state
    event.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const data = {username: usernameVal, password: passwordVal}
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
    }
    const response = await fetch(url, options)
    const responseData = await response.json()
    if (response.ok) {
      const {history} = this.props
      const jwtToken = responseData.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 3})
      history.replace('/')
    } else {
      this.setState({loginErrMsg: responseData.error_msg})
    }
  }

  render() {
    const {showPassword, loginErrMsg, usernameVal, passwordVal} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return (
        <ThemeContext.Consumer>
          {value => {
            const {darkTheme} = value
            return (
              <LoginBg dark={darkTheme} className="login-bg">
                <form onSubmit={this.onLogin} className="login-card">
                  {darkTheme ? (
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                      alt="website logo"
                      className="login-logo"
                    />
                  ) : (
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                      alt="website logo"
                      className="login-logo"
                    />
                  )}
                  <label htmlFor="username">USERNAME</label>
                  <br />
                  <input
                    value={usernameVal}
                    type="text"
                    placeholder="Username"
                    id="username"
                    onChange={this.updateUsername}
                  />

                  <br />
                  <label htmlFor="password">PASSWORD</label>
                  <br />
                  <input
                    onChange={this.updatePassword}
                    value={passwordVal}
                    type={showPassword}
                    id="password"
                    placeholder="Password"
                  />
                  <br />
                  <div>
                    <input
                      type="checkbox"
                      id="showPassword"
                      onChange={this.onShowPassword}
                    />
                    <label htmlFor="showPassword">Show Password</label>
                  </div>
                  <button type="submit" className="login-btn">
                    Login
                  </button>
                  <p className="login-err-msg">{loginErrMsg}</p>
                  <p className="user-cred">
                    user credentials: username:rahul, password:rahul@2021
                  </p>
                </form>
              </LoginBg>
            )
          }}
        </ThemeContext.Consumer>
      )
    }
    return <Redirect to="/" />
  }
}

export default Login
