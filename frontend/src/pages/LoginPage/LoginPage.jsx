import React, { useState } from "react";
import LoginForm from "../../components/Login/LoginForm";
import RegisterForm from "../../components/Login/RegisterForm";
import { Container } from "./styles";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";

const LoginPage = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="login">
      <HeaderComponent />
      <Container>
        {!visible && <LoginForm setVisible={setVisible} />}
        {visible && <RegisterForm setVisible={setVisible} />}
      </Container>
    </div>
  );
};

export default LoginPage;
