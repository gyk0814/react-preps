import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHeart } from "@fortawesome/free-regular-svg-icons";

const Navbar = () => {
  const menuList = [
    "쇼핑하기",
    "코롱",
    "홈 프레그런스",
    "배스 앤 바디",
    "맨즈",
    "선물하기",
  ];
  return (
    <div className="navbar">
      <div className="topbar">
        <div className="search">
          <img
            style={{ width: "20px", height: "20px" }}
            src="https://static-00.iconduck.com/assets.00/search-icon-2048x2048-cmujl7en.png"
            alt="search"
          />
          <input type="text" placeholder="Search for products" />
        </div>
        <div
          className="icons"
          // style={{ display: "flex", justifyContent: "flex-end", gap: "30px" }}
        >
          <div className="login">
            <span>Login</span>
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
          style={{ width: "170px" }}
          src="https://media.elcompanies.com/images/e/estee-lauder-companies/universal/our-brands/jo-malone-london/jo-malone-london_black_1486x499_v3.png?h=499&iar=0&w=1486"
          alt="Shop Logo"
        />
      </div>
      <div>
        <ul className="menu">
          {menuList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
