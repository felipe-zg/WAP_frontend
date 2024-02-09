import styled from 'styled-components';

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  background-color: #ffcc00;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c00;
  }
`;

export default Button as any as React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>>;