import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserById } from "../../redux/slices/userSlice";
import { FaTrashAlt } from "react-icons/fa";

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
} from "./styles";

const UserDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userDetail, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUserById(id));
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!userDetail) return <p>No user found</p>;

  const { name, address, email, phone } = userDetail;
  const { street, city, country } = address || {};

  return (
    <ProfileContainer>
      <Button className="go-back" onClick={() => navigate(`/users`)}>
        Go Back
      </Button>{" "}
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
              {street}, {city}, {country}
            </p>
          </div>
        </ProfileInfo>
      </ProfileTop>
      <InfoSection>
        <InfoBlock>
          <h3>Total Order</h3>
          <p className="total-info">4</p>
          <h3>Total Paid</h3>
          <p className="total-info">$2380</p>
        </InfoBlock>
        <InfoBlock2>
          <h3>Contacts</h3>
          <p>Full Name: {name}</p>
          <p>Email: {email}</p>
          <p>Phone: {phone}</p>
        </InfoBlock2>
        <InfoBlock2>
          <h3>Address</h3>
          <p>Country: {country}</p>
          <p>
            Address: {street}, {city}
          </p>
        </InfoBlock2>
      </InfoSection>
      <div className="del-user">
        <Button>
          Delete User <FaTrashAlt />
        </Button>
      </div>
    </ProfileContainer>
  );
};

export default UserDetail;
