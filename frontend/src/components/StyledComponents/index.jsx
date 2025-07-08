import styled from 'styled-components'

const LoginTextbox = styled.input`
  width: 100%;
  padding: 10px 12px;
  height: 40px;
  font-size: 14px;
  border-radius: 6px;
  outline: none;
  border: 1px solid #94a3b8;
  background-color: transparent;
  color: inherit;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 1px #2563eb;
  }

  &::placeholder {
    color: #9ca3af;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    padding: 8px 10px;
  }
`

export default LoginTextbox
