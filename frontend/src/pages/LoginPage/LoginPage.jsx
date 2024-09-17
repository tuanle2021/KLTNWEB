import React from "react";
import {
  Container,
  FormWrapper,
  Title,
  Input,
  Button,
  Link,
  LogoWrapper,
  Form,
} from "./styles";

const LoginPage = () => {
  return (
    <Container>
      <FormWrapper>
        {/* Logo */}
        <LogoWrapper>
          <img src="/logo.png" alt="TechStore Logo" />
        </LogoWrapper>

        {/* Login Form */}
        <Form>
          <Title>Đăng nhập</Title>
          <Input type="email" placeholder="Email của bạn" />
          <Input type="password" placeholder="Mật khẩu" />
          <Button>Đăng nhập</Button>

          {/* Additional Links */}
          <Link href="/forgot-password">Quên mật khẩu?</Link>
          <Link href="/register">Chưa có tài khoản? Đăng ký ngay</Link>
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default LoginPage;
