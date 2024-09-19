import React from "react";
import { Form, Formik } from "formik";
import RegisterInput from "../../components/Login/RegisterInput/RegisterInput";
import { useState } from "react";
import {
  Container,
  FormWrapper,
  LogoWrapper,
  Title,
  RegisterCol,
  RegisterLineHead,
  RegGrid,
  Select,
  Label,
  Button,
  Link,
} from "./styles";

const userInfos = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  bYear: "",
  bMonth: "",
  bDay: "",
  gender: "",
};
const RegisterPage = () => {
  const [user, setUser] = useState(userInfos);
  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  } = user;
  const yearTemp = new Date().getFullYear();
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const years = Array.from(new Array(108), (val, index) => yearTemp - index);
  const months = Array.from(new Array(12), (val, index) => 1 + index);
  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };
  const days = Array.from(new Array(getDays()), (val, index) => 1 + index);
  console.log(user);
  return (
    <Container>
      <FormWrapper>
        {/* Logo */}
        <LogoWrapper>
          <img src="/logo.png" alt="TechStore Logo" />
        </LogoWrapper>

        {/* Registration Form */}
        <Formik>
          {(formik) => (
            <Form>
              <Title>Register New Account</Title>
              <RegisterInput
                type="text"
                placeholder="First name"
                name="first_name"
                onChange={handleRegisterChange}
              />
              <RegisterInput
                type="text"
                placeholder="Surname"
                name="last_name"
                onChange={handleRegisterChange}
              />
              <RegisterInput
                type="text"
                placeholder="Mobile number or email address"
                name="email"
                onChange={handleRegisterChange}
              />
              <RegisterInput
                type="password"
                placeholder="New password"
                name="password"
                onChange={handleRegisterChange}
              />
              <RegisterCol>
                <RegisterLineHead>
                  Date of birth
                  {/* <i className="info_icon"></i> */}
                </RegisterLineHead>
                <RegGrid>
                  <Select
                    name="bDay"
                    value={bDay}
                    onChange={handleRegisterChange}
                  >
                    {days.map((day, i) => (
                      <option value={day} key={i}>
                        {day}
                      </option>
                    ))}
                  </Select>
                  <Select
                    name="bMonth"
                    value={bMonth}
                    onChange={handleRegisterChange}
                  >
                    {months.map((month, i) => (
                      <option value={month} key={i}>
                        {month}
                      </option>
                    ))}
                  </Select>
                  <Select
                    name="bYear"
                    value={bYear}
                    onChange={handleRegisterChange}
                  >
                    {years.map((year, i) => (
                      <option value={year} key={i}>
                        {year}
                      </option>
                    ))}
                  </Select>
                </RegGrid>
              </RegisterCol>
              <RegisterCol>
                <RegisterLineHead>
                  Gender
                  {/* <i className="info_icon"></i> */}
                </RegisterLineHead>
                <RegGrid>
                  <Label htmlFor="male">
                    Male
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                      onChange={handleRegisterChange}
                    />
                  </Label>
                  <Label htmlFor="female">
                    Female
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                      onChange={handleRegisterChange}
                    />
                  </Label>
                </RegGrid>
              </RegisterCol>
              <Button>Register</Button>

              {/* Additional Links */}
              <Link href="/login">Đã có tài khoản? Đăng nhập ngay</Link>
            </Form>
          )}
        </Formik>
      </FormWrapper>
    </Container>
  );
};

export default RegisterPage;
