import React, { useContext } from "react";
import { Navbar, Container, Nav,Badge } from "react-bootstrap";
import "./Header.css";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import UserContext from "../../store/user-context";
import { FaShoppingCart,FaShoppingBasket } from 'react-icons/fa';

function Header() {
  const history = useHistory();
  //within this Header component we have connected user context
  const currentUser = useContext(UserContext);
  console.log(currentUser);

  //console.log();

  const { isLoggedIn, getLoggedIn,cartLength} = currentUser;

  async function userLogoutHandler() {
    await axios.get("/logout");
    console.log("Logged out successfully");
    //when user logout completes, then getLoggedIn() method will be called
    //and since user is logout already, so getLoggedIn() method will return false
    //and set the state to false
    getLoggedIn();
    history.push("/login");
  }

  return (
    <Navbar
      fixed="top"
      className="navbar"
      collapseOnSelect
      expand="lg"
      variant="dark"
    >
      <Container>
        <LinkContainer to="/home" style={{fontSize:'1.5rem'}}>
              <Navbar.Brand><FaShoppingBasket style={{margin:'5px',marginTop:'-5px',fontSize:'1.9rem'}}/>Shopping Cart App</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/home">
              <Nav.Link className="nav-link">Home</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/products">
              <Nav.Link className="nav-link">Products</Nav.Link>
            </LinkContainer>
            {/* conditional rendering using user-context, if user is not logged in then add new product form is not visible */}
            {isLoggedIn === true && (
              <LinkContainer to="/products/new">
                <Nav.Link className="nav-link">New</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
          <Nav>
            {/* if user is logged in then login and signup will not be visible */}
            {isLoggedIn === false && (
              <>
                <LinkContainer to="/login">
                  <Nav.Link className="nav-link">Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link className="nav-link">SignUp</Nav.Link>
                </LinkContainer>
              </>
            )}
            {isLoggedIn === true && (
              <>
              <LinkContainer to="/cart">
                  <Nav.Link className="nav-link">
                      <FaShoppingCart /><sup style={{ backgroundColor: 'red', marginLeft: '1px', borderRadius: '3px' }}><Badge bg="danger">{ cartLength }</Badge></sup>
                  </Nav.Link>
              </LinkContainer>
              <Nav.Link onClick={userLogoutHandler} className="nav-link">
                Logout
              </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
