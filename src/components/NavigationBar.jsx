import React from 'react'
import Navbar  from 'react-bootstrap/Navbar'
import Container  from 'react-bootstrap/Container'
import Nav  from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'
import {useSelector} from "react-redux";
import {selectWishlist} from "../redux/slices/wishlistSlice.js";
export default function NavigationBar() {
  const active = {
    fontWeight:"bold",
  };
  const wishlist = useSelector(selectWishlist);
  return (
    <Navbar bg="light" expand="lg" >
    <Container>
      <Navbar.Brand>MyEvents</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link
          as={NavLink}
          to="events"
          style={({ isActive }) => (!isActive ? undefined :active )}
        >
          Events
        </Nav.Link>
        <Nav.Link
          as={NavLink}
          to="add"
          style={({ isActive }) => (!isActive ? undefined :active )}
        >
          Add Event
        </Nav.Link>
       <Nav.Link
          as={NavLink}
          to="wishlist"
          style={({ isActive }) => (!isActive ? undefined :active )}
        >
          Wishlist({wishlist.length})
        </Nav.Link>

      </Nav>
    </Container>
  </Navbar>

  )
}
