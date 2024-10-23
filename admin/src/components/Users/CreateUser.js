import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { login } from "../../redux/slices/authSlice"; 

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
    phone: "",
    address: {
      street: "",
      city: "",
      country: "",
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
        await dispatch(login({ email, password })).unwrap();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch action to create user
    // dispatch(createUser(user));
  };

  const { name, email, phone, address, isAdmin } = user;
  const { street, city, country } = address;

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
          <InfoBlock>
            <h3>Total Order</h3>
            <p className="total-info">0</p>
            <h3>Total Paid</h3>
            <p className="total-info">$0</p>
          </InfoBlock>
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
              Phone:{" "}
              <Input
                type="text"
                name="phone"
                value={phone}
                onChange={handleChange}
                placeholder="Phone"
              />
            </p>
          </InfoBlock2>
          <InfoBlock2>
            <h3>Address</h3>
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
            <p>
              <Input
                type="text"
                name="address.street"
                value={street}
                onChange={handleChange}
                placeholder="Street"
              />
              <Input
                type="text"
                name="address.city"
                value={city}
                onChange={handleChange}
                placeholder="City"
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