import LoginInput from "./LoginInput/index";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useState } from "react";

import {
  Container,
  FormWrapper,
  Title,
  Input,
  Button,
  LogoWrapper,
} from "../../pages/LoginPage/styles";

const loginInfos = {
  email: "",
  password: "",
};
export default function LoginFrom() {
  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;
  console.log(login);
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email address is required.")
      .email("Must be a valid email.")
      .max(100),
    password: Yup.string().required("Password is required"),
  });
  return (
    <Container>
      <FormWrapper>
        {/* Logo */}
        <LogoWrapper>
          <img src="/logo.png" alt="TechStore Logo" />
        </LogoWrapper>

        {/* Login Form */}
        <Formik
          enableReinitialize
          initialValues={{
            email,
            password,
          }}
          validationSchema={loginValidation}
        >
          {(formik) => (
            <Form>
              <Title>Login Account</Title>
              <LoginInput
                type="text"
                name="email"
                placeholder="Email address or phone number"
                onChange={handleLoginChange}
              />
              <LoginInput
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleLoginChange}
                bottom
              />
              <Button>Login</Button>
              <Link to="/forgot" className="forgot_password">
                Forgotten password?
              </Link>
              <Link to="/register">Don't have an account? Register now</Link>
            </Form>
          )}
        </Formik>
      </FormWrapper>
    </Container>
  );
}
