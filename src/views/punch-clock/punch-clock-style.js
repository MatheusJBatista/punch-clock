import styled from 'styled-components'

const Input = styled.input`
  background-color: #212529;
  border: 0;
  color: white;
`

const Title = styled.h1`
  color: white;
`

const SubTitleLevelThree = styled.h3`
  color: white;
`

const BlurDiv = styled.div`
  background-color: #212529;
  z-index: -1;
  position: fixed;
  width: 67.5%;
  max-height: 400px;
  filter: blur(5px);
`

const OverrideBlurDiv = styled.div`
  width: 67.5%;
  position: fixed;
`

export { Input, Title, SubTitleLevelThree, BlurDiv, OverrideBlurDiv }
