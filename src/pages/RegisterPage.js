import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secPassword, setSecPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!name || !email) {
        throw new Error("이름과 이메일을 모두 입력해주세요.");
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("올바른 이메일 주소를 입력해주세요.");
      }
      if (password !== secPassword) {
        throw new Error("패스워드가 일치하지 않습니다. 다시 입력해주세요.");
      }
      if (!password) {
        throw new Error("패스워드를 입력해주세요.");
      }
      const response = await api.post("/user", { name, email, password });
      console.log("rrrr", response);
      if (response.status === 200) {
        navigate("/login");
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
    if (error) setError("");
  };

  return (
    <div className="display-center">
      {error && <div className="red-error">{error}</div>}
      <Form className="login-box" onSubmit={handleSubmit}>
        <h1>회원가입</h1>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="string"
            placeholder="Name"
            onChange={handleChange(setName)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={handleChange(setEmail)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={handleChange(setPassword)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type="password"
            placeholder="re-enter the password"
            onChange={handleChange(setSecPassword)}
          />
        </Form.Group>

        <Button className="button-primary" type="submit">
          회원가입
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
