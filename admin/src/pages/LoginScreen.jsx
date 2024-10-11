import React from "react";
import {
  LoginContainer,
  ImageSection,
  FormSection,
  Form,
  Input,
  Button,
  ForgotPassword,
} from "./styles/LoginScreen";

const LoginPage = () => {
  return (
    <LoginContainer>
      {/* Hình ảnh bên trái */}
      <ImageSection>
        <img
          src="https://res.cloudinary.com/dihhw7jo1/image/upload/v1728618347/banner/Side%20Image.png.png"
          alt="Login Banner"
        />
      </ImageSection>

      {/* Form đăng nhập bên phải */}
      <FormSection>
        <h2>Log in to Exclusive</h2>
        <p>Enter your details below</p>

        <Form>
          <Input type="text" placeholder="Email or Phone Number" />
          <Input type="password" placeholder="Password" />
          <Button>Log In</Button>
        </Form>

        <ForgotPassword href="#">Forgot Password?</ForgotPassword>
      </FormSection>
    </LoginContainer>
  );
};

export default LoginPage;
