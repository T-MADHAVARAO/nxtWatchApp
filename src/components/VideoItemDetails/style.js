import styled from 'styled-components'

export const VideoDetailBg = styled.div`
  background-color: ${props => (props.dark ? '#0f0f0f' : 'white')};
  color: ${props => (props.dark ? 'white' : 'black')};
`

export const VideoDetailBtn = styled.button`
  background-color: ${props => (props.dark ? '#0f0f0f' : 'white')};
  color: ${props => (props.dark ? 'white' : 'black')};
`
