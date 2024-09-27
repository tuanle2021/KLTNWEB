import LoginInput from "./LoginInput/index";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useState } from "react";
import DotLoader from "react-spinners/DotLoader";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import {
  FormWrapper,
  Title,
  Button,
  LogoWrapper,
  ForgotPasswordLink,
} from "../../pages/LoginPage/styles";

const loginInfos = {
  email: "",
  password: "",
};
export default function LoginFrom({ setVisible }) {
  const [login, setLogin] = useState(loginInfos);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, password } = login;
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
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const loginSubmit = async () => {
    try {
      setLoading(true);
      console.log("Email:", email);
      console.log("Password:", password);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        {
          email,
          password,
        }
      );
      setError("");
      setSuccess(data.message);
      dispatch({ type: "LOGIN", payload: data });
      Cookies.set("user", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 400) {
        setError(error.response.data.error);
      } else {
        setError(
          error.response
            ? error.response.data.message
            : "An error occurred. Please try again."
        );
      }
    }
  };
  return (
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
        onSubmit={() => {
          loginSubmit();
        }}
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
            <Button type="submit">Login</Button>
            <Button
              style={{ backgroundColor: "orange" }}
              onClick={() => setVisible(true)}
            >
              Register now
            </Button>
            <ForgotPasswordLink to="/forgot">
              Forgotten password?
            </ForgotPasswordLink>
            <DotLoader
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
              color="#1876f2"
              loading={loading}
              size={30}
            />
            {error && <div style={{ color: "#b94a48" }}>{error}</div>}
            {success && (
              <div style={{ color: "var(--green-color)" }}>{success}</div>
            )}
          </Form>
        )}
      </Formik>
    </FormWrapper>
  );
}
