import React, { useState } from "react";
import LoginForm from "../../components/Login/LoginForm";
import RegisterForm from "../../components/Login/RegisterForm";
import { Container } from "./styles";

const LoginPage = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="login">
      <Container>
        {!visible && <LoginForm setVisible={setVisible} />}
        {visible && <RegisterForm setVisible={setVisible} />}
      </Container>
    </div>
  );
};

export default LoginPage;
