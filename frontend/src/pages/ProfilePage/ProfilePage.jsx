import React, { useState } from "react";
import Roadmap from "../../components/RoadmapComponent/Roadmap";
import {
  ProfileContainer,
  Sidebar,
  SidebarGroup,
  SidebarItem,
  ProfileForm,
  FormGroup,
  Input,
  ButtonGroup,
  SaveButton,
  CancelButton,
} from "./styles";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    firstName: "Md",
    lastName: "Rimel",
    email: "rimel1111@gmail.com",
    address: "Kingston, 5236, United State",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSaveChanges = () => {
    console.log("Saving changes...", profile);
  };

  return (
    <div>
      {/* Roadmap hiển thị đường dẫn */}
      <Roadmap />
      <ProfileContainer>
        {/* Sidebar chứa các mục quản lý tài khoản */}
        <Sidebar>
          <SidebarGroup>
            <h4>Manage My Account</h4>
            <SidebarItem className="active">My Profile</SidebarItem>
            <SidebarItem>Address Book</SidebarItem>
            <SidebarItem>My Payment Options</SidebarItem>
          </SidebarGroup>

          <SidebarGroup>
            <h4>My Orders</h4>
            <SidebarItem>My Returns</SidebarItem>
            <SidebarItem>My Cancellations</SidebarItem>
          </SidebarGroup>

          <SidebarGroup>
            <h4>My WishList</h4>
            <SidebarItem>My WishList</SidebarItem>
          </SidebarGroup>
        </Sidebar>

        {/* Form chỉnh sửa thông tin tài khoản */}
        <ProfileForm>
          <h2>Edit Your Profile</h2>

          <FormGroup>
            <Input
              type="text"
              name="firstName"
              value={profile.firstName}
              onChange={handleChange}
              placeholder="First Name*"
            />
            <Input
              type="text"
              name="lastName"
              value={profile.lastName}
              onChange={handleChange}
              placeholder="Last Name*"
            />
          </FormGroup>

          <FormGroup>
            <Input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <Input
              type="text"
              name="address"
              value={profile.address}
              onChange={handleChange}
              placeholder="Address"
            />
          </FormGroup>

          <h3>Password Changes</h3>
          <FormGroup>
            <Input
              type="password"
              name="currentPassword"
              value={profile.currentPassword}
              onChange={handleChange}
              placeholder="Current Password"
            />
          </FormGroup>

          <FormGroup>
            <Input
              type="password"
              name="newPassword"
              value={profile.newPassword}
              onChange={handleChange}
              placeholder="New Password"
            />
            <Input
              type="password"
              name="confirmPassword"
              value={profile.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm New Password"
            />
          </FormGroup>

          <ButtonGroup>
            <CancelButton>Cancel</CancelButton>
            <SaveButton onClick={handleSaveChanges}>Save Changes</SaveButton>
          </ButtonGroup>
        </ProfileForm>
      </ProfileContainer>
    </div>
  );
};

export default ProfilePage;
