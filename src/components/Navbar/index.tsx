import React from "react";
import { AnchorLink, HeaderContainer, Logo, NavLink, NavLinksContainer } from "./styles";
import logoImage from "../../assets/images/logo-yellow.png";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { logout } from "../../store/slices";
import { redirect } from "react-router-dom";

interface Props {}

const Header: React.FC<Props> = () => {
  const { user } = useAppSelector((state) => state.user);
  const {isAuthenticated, role} = user;
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    redirect("/login");
  }

  return (
    <HeaderContainer>
      <NavLink to="/">
        <Logo src={logoImage} alt="Logo" />
      </NavLink>
      <NavLinksContainer>
        {!isAuthenticated && (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
          </>
        )}
        {isAuthenticated && role === "admin" && (
          <NavLink to="/dashboard">Dashboard</NavLink>
        )}
        {role !== "admin" && (
          <NavLink to="/Cart">Cart</NavLink>
        )}

        {isAuthenticated && (
          <AnchorLink onClick={handleLogout}>Logout</AnchorLink>
        )}
      </NavLinksContainer>
    </HeaderContainer>
  );
};

export default Header;