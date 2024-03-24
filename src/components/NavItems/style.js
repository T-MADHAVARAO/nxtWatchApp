import styled from 'styled-components'

export const NavBg = styled.div`
  background-color: ${props => (props.darkTheme ? 'Black' : 'white')};
  color: ${props => (props.darkTheme ? 'white' : 'black')};
`
export const NavItem = styled.button`
  background-color: ${props => (props.darkTheme ? 'Black' : 'white')};
  color: ${props => (props.darkTheme ? 'white' : 'black')};
`
