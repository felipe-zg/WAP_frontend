
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #333;
  color: #fff;
`;

export const Logo = styled.img`
  width: 120px;
  height: auto;
`;

export const NavLinksContainer = styled.div`
  display: flex;
`;

export const NavLink = styled(Link)`
  margin-left: 16px;
  color: #fff;
  text-decoration: none;

  &:hover {
    color: #ffcc00;
    text-decoration: underline;
  }
`;

export const AnchorLink = styled.a`
  margin-left: 16px;
  color: #fff;
  text-decoration: none;

  &:hover {
    color: #ffcc00;
    text-decoration: underline;
  }
`;