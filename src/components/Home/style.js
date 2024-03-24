import styled from 'styled-components'

export const HomeBg = styled.div`
  background-color: ${props => (props.dark ? '#181818' : 'white')};
  color: ${props => (props.dark ? 'white' : 'black')};
`

export const Search = styled.input`
  background-color: ${props => (props.dark ? '#181818' : 'white')};
  color: ${props => (props.dark ? 'white' : 'black')};
`
export const SearchBtn = styled.button`
  background-color: ${props => (props.dark ? '#181818' : 'white')};
  color: ${props => (props.dark ? 'white' : 'black')};
`
