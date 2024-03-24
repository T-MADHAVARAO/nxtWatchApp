import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import ThemeContext from './context'
import Protected from './components/Protected'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import Login from './components/Login'
import NotFound from './components/NotFound'
import SavedVideos from './components/SavedVideos'
import VideoItemDetails from './components/VideoItemDetails'
import Home from './components/Home'

import './App.css'

// Replace your code here
class App extends Component {
  state = {darkTheme: false, savedVideos: []}

  saveVideo = item => {
    const {savedVideos} = this.state
    const contain = savedVideos.some(each => each.id === item.id)
    if (contain) {
      const filterUnSave = savedVideos.filter(each => each.id !== item.id)
      this.setState({savedVideos: filterUnSave})
    } else {
      this.setState(old => ({savedVideos: [...old.savedVideos, item]}))
    }
  }

  toggleTheme = () => {
    this.setState(old => ({darkTheme: !old.darkTheme}))
  }

  render() {
    const {darkTheme, savedVideos} = this.state
    return (
      <ThemeContext.Provider
        value={{
          darkTheme,
          savedVideos,
          saveVideo: this.saveVideo,
          toggleTheme: this.toggleTheme,
        }}
      >
        <Switch>
          <Route path="/login" component={Login} />
          <Protected exact path="/" component={Home} />
          <Protected exact path="/trending" component={Trending} />
          <Protected exact path="/gaming" component={Gaming} />
          <Protected exact path="/saved-videos" component={SavedVideos} />
          <Protected exact path="/videos/:id" component={VideoItemDetails} />
          <Protected component={NotFound} />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}
export default App
