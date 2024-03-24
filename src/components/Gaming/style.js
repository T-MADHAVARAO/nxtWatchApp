import styled from 'styled-components'

const GameBg = styled.div`
  background-color: ${props => (props.dark ? '#0f0f0f' : 'white')};
  color: ${props => (props.dark ? 'white' : 'black')};
`

export default GameBg
