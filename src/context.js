import React from 'react'

const ThemeContext = React.createContext({
  darkTheme: false,
  savedVideos: [],
  saveVideo: () => {},
  toggleTheme: () => {},
})

export default ThemeContext
