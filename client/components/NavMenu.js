import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Nav = styled.nav`
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  padding: 1em 2.5em;
`

const NavItem = styled.span`
  margin: 0 0.75em;
  font-size: 1.25em;
`

const NavMenu = () => {
  return (
    <Nav>
      <NavLink exact activeStyle={activeNavStyle} to="/">
        <NavItem>Home</NavItem>
      </NavLink>
      <NavLink activeStyle={activeNavStyle} to="/posts">
        <NavItem>Posts List</NavItem>
      </NavLink>
      <NavLink activeStyle={activeNavStyle} to="/users">
        <NavItem>Users List</NavItem>
      </NavLink>
    </Nav>
  )
}

const activeNavStyle = {
  color: '#d62828',
  transition: 'color 0.2s',
}

export default NavMenu
