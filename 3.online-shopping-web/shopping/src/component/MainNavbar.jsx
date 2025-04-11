import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHeart } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router";
import { Container, Navbar, Nav } from "react-bootstrap";

const MainNavbar = ({ authenticated, setAuthenticated }) => {
  const menuList = [
    "쇼핑하기",
    "코롱",
    "홈 프레그런스",
    "배스 앤 바디",
    "맨즈",
    "선물하기",
  ];
  const navigate = useNavigate();
  const goToLogin = () => {
    if (authenticated) {
      setAuthenticated(false);
      navigate("/");
    } else navigate("/login");
  };

  const search = (event) => {
    if (event.key === "Enter") {
      const searchValue = event.target.value;
      console.log("searchValue", searchValue);
      if (searchValue) {
        navigate(`/?q=${searchValue}`);
      } else {
        navigate("/?q=");
      }
    }
  };
  return (
    <div className="navbar">
      <Navbar expand="sm">
        <Container fluid>
          <div className="topbar">
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              className="me-auto"
            />
            <div className="search">
              <img
                style={{ width: "20px", height: "20px" }}
                src="https://static-00.iconduck.com/assets.00/search-icon-2048x2048-cmujl7en.png"
                alt="search"
              />
              <input type="text" placeholder="Search" onKeyDown={search} />
            </div>
            <div className="icons">
              <div className="login" onClick={goToLogin}>
                <span>{authenticated ? "Logout" : "Login"}</span>
                <FontAwesomeIcon icon={faUser} />
              </div>
              <FontAwesomeIcon icon={faHeart} />
              <img
                style={{ width: "22px", height: "22px" }}
                src="https://cdn-icons-png.flaticon.com/512/2438/2438157.png"
                alt="shopping bag"
              />
            </div>
          </div>
          <div className="logo">
            <img
              style={{ width: "170px", cursor: "pointer" }}
              src="https://media.elcompanies.com/images/e/estee-lauder-companies/universal/our-brands/jo-malone-london/jo-malone-london_black_1486x499_v3.png?h=499&iar=0&w=1486"
              alt="Shop Logo"
              onClick={() => navigate("/")}
            />
          </div>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="menu" href="#">
              {menuList.map((item, index) => (
                <Nav.Link className="navlink" key={index} href="#">
                  {item}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default MainNavbar;
