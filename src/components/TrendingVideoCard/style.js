import styled from 'styled-components'

const TrendingVideoStyle = styled.li`
  background-color: ${props => (props.dark ? 'black' : 'white')};
  color: ${props => (props.dark ? 'white' : 'black')};
`

export default TrendingVideoStyle
