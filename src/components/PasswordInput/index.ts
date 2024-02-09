import styled from "styled-components";

const PasswordInput = styled.input.attrs({ type: 'password' })`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  background-color: #444;
  color: #fff;
  font-size: 1.2rem;
`;

export default PasswordInput as any as React.FC<React.InputHTMLAttributes<HTMLInputElement>>;