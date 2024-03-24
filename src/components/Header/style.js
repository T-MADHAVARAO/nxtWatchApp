import styled from 'styled-components'

export const HeaderBg = styled.div`
  background-color: ${props => (props.darkTheme ? 'black' : 'white')};
`
export const LogOutBtn = styled.button`
  background-color: black;
  color: white;
`
