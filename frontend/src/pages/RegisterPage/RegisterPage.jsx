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

const RegisterPage = () => {
  return (
    <Container>
      <FormWrapper>
        {/* Logo */}
        <LogoWrapper>
          <img src="/logo.png" alt="TechStore Logo" />
        </LogoWrapper>

        {/* Registration Form */}
        <Form>
          <Title>Đăng ký tài khoản</Title>
          <Input type="text" placeholder="Họ và tên" />
          <Input type="email" placeholder="Email của bạn" />
          <Input type="password" placeholder="Mật khẩu" />
          <Input type="password" placeholder="Xác nhận mật khẩu" />
          <Button>Đăng ký</Button>

          {/* Additional Links */}
          <Link href="/login">Đã có tài khoản? Đăng nhập ngay</Link>
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default RegisterPage;
