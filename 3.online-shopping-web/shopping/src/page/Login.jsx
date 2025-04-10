import React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="login-container">
      <div className="login-body">
        <div className="login-form-container">
          <div className="login-buttons">
            <button
              className={`button ${isLogin ? "active" : ""}`}
              onClick={() => {
                setIsLogin(true);
              }}
            >
              로그인
            </button>
            <button
              className={`button ${isLogin ? "" : "active"}`}
              onClick={() => {
                setIsLogin(false);
              }}
            >
              계정 생성하기
            </button>
          </div>
          <div className="login-form">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  className="input-box"
                  type="email"
                  placeholder="*이메일"
                  autoComplete="email"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  className="input-box"
                  type="password"
                  placeholder="*비밀번호"
                  autoComplete="current-password"
                />
              </Form.Group>
              <button className="find-pw">비밀번호 찾기</button>
              <Button className="submit-button">{`${
                isLogin ? "로그인" : "계정 생성하기"
              }`}</Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
