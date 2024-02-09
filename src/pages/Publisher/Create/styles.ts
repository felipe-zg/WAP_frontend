import styled from 'styled-components';

export const MainContent = styled.div`
  list-style: none;
  padding: 48px 8px;
  background-color: #444;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 0px #000;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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

export const Title = styled.h1`
  color: #fff;
  margin-bottom: 24px;
`;