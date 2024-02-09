import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const LeftMenuContainer = styled.div`
  width: 250px;
  background-color: #222;
  color: white;
  min-height: 100vh;
`;

export const GenreList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
`;

export const GenreItem = styled(Link)`
  margin-bottom: 10px;
  padding: 12px;
  cursor: pointer;
  color: #ffcc00;
  border-radius: 5px;

  &:hover {
    color: #444;
    background-color: #ffcc00;
    transition: 0.5s;
  }
`;