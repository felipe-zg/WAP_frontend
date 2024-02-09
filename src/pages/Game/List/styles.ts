import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #222;
`;

export const List = styled.li`
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

export const ListItem = styled.li`
  list-style: none;
  margin: 8px 0;
  padding: 8px;
  background-color: #444;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 0px #000;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ListItemText = styled.h3`
  color: #ffcc00;
`;

export const Button = styled.button`
  padding: 8px 16px;
  margin: 8px 0;
  background-color: #ffcc00;
  border: none;
  border-radius: 5px;
  color: #222;
  font-weight: bold;
  cursor: pointer;
`;

export const DeleteButton = styled(Button)`
  background-color: red;
  color: #fff;
  margin-left: 16px;
`;

export const Title = styled.h1`
  color: #fff;
  margin-left: 32px;
`;