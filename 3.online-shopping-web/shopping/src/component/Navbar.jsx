import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHeart } from "@fortawesome/free-regular-svg-icons";
import logo from "../assets/pngegg.png";
import { width } from "@fortawesome/free-regular-svg-icons/faAddressBook";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="login">
        <div>
          Login
          <FontAwesomeIcon icon={faUser} />
        </div>
        <div className="icons">
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
          style={{ width: "150px" }}
          src="https://media.elcompanies.com/images/e/estee-lauder-companies/universal/our-brands/jo-malone-london/jo-malone-london_black_1486x499_v3.png?h=499&iar=0&w=1486"
          alt="Shop Logo"
        />
      </div>
      <div></div>
    </div>
  );
};

export default Navbar;
