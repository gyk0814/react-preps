import React from "react";
import { Outlet } from "react-router";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router";
import { useTrendingMoviesQuery } from "../hooks/useTrendingMovies";

const AppLayout = () => {
  const navList = [
    "Home",
    "TV Shows",
    "Movies",
    "New & Popular",
    "My List",
    "Browse by Languages",
  ];

  const dropdownList = [
    "Manage Profiles",
    "Transfer Profile",
    "Account",
    "Help Center",
  ];
  const profileImg = () => {
    return (
      <img
        src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-88wkdmjrorckekha.jpg"
        alt="Profile"
        style={{ width: "40px", height: "40px" }}
      />
    );
  };
  const navigate = useNavigate();
  const navigateTo = (item) => {
    switch (item) {
      case "Home":
        navigate("/");
        break;
      case "TV Shows":
        navigate("/tv-shows");
        break;
      case "Movies":
        navigate("/movies");
        break;
      case "New & Popular":
        navigate("/new-popular");
        break;
      case "My List":
        navigate("/my-list");
        break;
      case "Browse by Languages":
        navigate("/languages");
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Navbar
        expand="lg"
        className="bg-body-tertiary nav "
        bg="black"
        data-bs-theme="dark"
      >
        <Container fluid className="mx-5">
          <Navbar.Brand href="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
              alt="logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "150px" }}
              navbarScroll
            >
              {navList.map((item, index) => (
                <Nav.Link
                  className="mx-1"
                  key={index}
                  onClick={() => navigateTo(item)}
                >
                  {item}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
          <Nav className="d-flex my-2 flex-row gap-5">
            <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 border-white"
                aria-label="Search"
              />
              <button
                type="submit"
                style={{ border: "none", background: "none" }}
              >
                <i
                  className="bi bi-search"
                  style={{ color: "white", fontSize: "25px" }}
                ></i>
              </button>
            </Form>

            <NavDropdown title={profileImg()} id="navbarScrollingDropdown">
              {dropdownList.map((item, index) => (
                <NavDropdown.Item key={index} href={`#${item}`}>
                  {item}
                </NavDropdown.Item>
              ))}
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Sign out of Netflix
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>

      <Outlet />
    </div>
  );
};

export default AppLayout;
