import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FaSave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { createUserAdmin } from "../../redux/slices/userSlice";

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
    password: "",
    gender: "male",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (checked) {
        const password = prompt("Please enter your current password:");
        if (!password) {
          e.target.checked = false;
          return;
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
    dispatch(createUserAdmin(user))
        .unwrap()
        .then(() => {
          navigate(`/users`);
        })
        .catch((error) => {
          console.error(error);
        });
  };

  const { name, email, phone, address, isAdmin, password, gender } = user;
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
                <h2>
                  <Input
                      type="text"
                      name="name"
                      value={name}
                      onChange={handleChange}
                      placeholder="Name"
                  />
                </h2>
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
                  <Input
                      type="text"
                      name="address.country"
                      value={country}
                      onChange={handleChange}
                      placeholder="Country"
                  />
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
                Gender:{" "}
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