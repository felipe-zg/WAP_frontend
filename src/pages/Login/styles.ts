import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #222;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 48px;
  background-color: #333;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px #000;
  width: 400px;
  height: 300px;
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin: 10px 0;
`;