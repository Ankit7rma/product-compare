import React from "react";
import styled from "styled-components";
import { FaUserCircle, FaSun, FaMoon } from "react-icons/fa";

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #333;
  color: white;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const UserIcon = styled.div`
  font-size: 2rem;
  cursor: pointer;
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  margin-left: 1rem;
`;

const AppNavbar = ({
  toggleTheme,
  currentTheme,
}: {
  toggleTheme: () => void;
  currentTheme: string;
}) => {
  return (
    <Navbar>
      <Logo>Product</Logo>
      <div className="flex gap-3">
        <ThemeToggle onClick={toggleTheme}>
          {currentTheme === "light" ? <FaMoon /> : <FaSun />}
        </ThemeToggle>
        <UserIcon>
          <FaUserCircle />
        </UserIcon>
      </div>
    </Navbar>
  );
};

export default AppNavbar;
