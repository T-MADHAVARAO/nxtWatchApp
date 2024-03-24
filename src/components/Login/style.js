import styled from 'styled-components'

const LoginBg = styled.div`
  background-color: ${props => (props.dark ? 'black' : 'white')};
  color: ${props => (props.dark ? 'white' : 'black')};
`

export default LoginBg
