import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { login } from "../../redux/slices/authSlice"; 
import { createUser } from "../../redux/slices/userSlice";
import {
  ProfileContainer,
  Header,
  InfoSection,
  InfoBlock,
  InfoBlock2,
  Button,
  Logo,
  ProfileTop,
  ProfileInfo,
  Input,
  Form,
  CheckboxLabel,
} from "./styles";

const CreateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "Huynh123@",
    phone: "",
    gender: "", 
    address: {
      street: "",
      city: "",
      state: "",
      zip: "00008", 
      country: "VietNam",
    },
    isAdmin: false,
  });

  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;
     if (type === "checkbox") {
      if (checked) {
        let password;
        let isValid = false;
        const userData = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : {};
        const email = userData.email;

        while (!isValid) {
          const { value: inputPassword } = await Swal.fire({
        title: "Enter your current password",
        input: "password",
        inputPlaceholder: "Enter your password",
        inputAttributes: {
          autocapitalize: "off",
          autocorrect: "off",
        },
        showCancelButton: true,
          });

          if (!inputPassword) {
        e.target.checked = false;
        return;
          }

          password = inputPassword;

          try {
        await dispatch(login({ email, password }));
        isValid = true;
          } catch (error) {
        await Swal.fire({
          icon: "error",
          title: "Incorrect password",
          text: "Please try again.",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
          }
        }
      }
      setUser({ ...user, [name]: checked });
    } else {
      const nameParts = name.split(".");
      if (nameParts.length > 1) {
        setUser((prevUser) => ({
          ...prevUser,
          address: {
            ...prevUser.address,
            [nameParts[1]]: value,
          },
        }));
      } else {
        setUser({ ...user, [name]: value });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const response = await dispatch(createUser(user)).unwrap();
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "User created successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/users");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  const { name, email, password, phone, gender, address, isAdmin } = user;
  const { street, city, state, zip, country } = address;

  return (
    <ProfileContainer>
      <Button className="go-back" onClick={() => navigate(`/users`)}>
        Go Back
      </Button>{" "}
      <Form onSubmit={handleSubmit}>
        <ProfileTop>
          <Header />
          <Logo
            src="https://res.cloudinary.com/dihhw7jo1/image/upload/v1727766768/products/MacBook%20Air%2013%20inch%20M1%204.jpg.jpg"
            alt="Seller Logo"
          />
          <ProfileInfo>
            <div className="detail-info">
              <h2>{name}</h2>
              <p>
                <label>{street},</label>
                <label>{city},</label>
                <label>{state},</label>
                <label>{zip},</label>
                <label>{country}</label>
              </p>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  name="isAdmin"
                  checked={isAdmin}
                  onChange={handleChange}
                />
                Is Admin
              </CheckboxLabel>
            </div>
          </ProfileInfo>
        </ProfileTop>
        <InfoSection>
          <InfoBlock2>
            <h3>Contacts</h3>
            <p>
              Full Name:{" "}
              <Input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                placeholder="Full Name"
              />
            </p>
            <p>
              Email:{" "}
              <Input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Email"
              />
            </p>
             <p>
              Password:{" "}
              <Input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Password"
              />
            </p>
            <p>
              Phone:{" "}
              <Input
                type="text"
                name="phone"
                value={phone}
                onChange={handleChange}
                placeholder="Phone"
              />
            </p>
            <p>
              Gender:{" "}
              <div>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={handleChange}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={handleChange}
                  />
                  Female
                </label>
              </div>
            </p>
          </InfoBlock2>
          <InfoBlock2>
            <h3>Address</h3>
            <p>
              Street:{" "}
              <Input
                type="text"
                name="address.street"
                value={street}
                onChange={handleChange}
                placeholder="Street"
              />
            </p>
            <p>
              City:{" "}
              <Input
                type="text"
                name="address.city"
                value={city}
                onChange={handleChange}
                placeholder="City"
              />
            </p>
            <p>
              State:{" "}
              <Input
                type="text"
                name="address.state"
                value={state}
                onChange={handleChange}
                placeholder="State"
              />
            </p>
            <p>
              Country:{" "}
              <Input
                type="text"
                name="address.country"
                value={country}
                onChange={handleChange}
                placeholder="Country"
              />
            </p>
          </InfoBlock2>
        </InfoSection>
        <div className="del-user">
          <Button type="submit" className="save-btn">
            Submit
          </Button>
        </div>
      </Form>
    </ProfileContainer>
  );
};

export default CreateUser;