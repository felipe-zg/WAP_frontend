import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  background: #f5f5f5;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: crimson;
  margin-bottom: 20px;

  h1 {
    font-size: 40px;
    color: #333;
  }

  p {
    font-size: 20px;
    color: #333;
  }
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;

  li {
    text-decoration: none;
    color: #fff;
    font-size: 20px;
    margin: 0 10px;
  }
`;

export const List = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;

  li {
    text-decoration: none;
    color: #fff;
    font-size: 20px;
    margin: 0 10px;
  }
`;