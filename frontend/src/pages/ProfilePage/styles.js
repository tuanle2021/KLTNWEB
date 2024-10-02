import styled from "styled-components";

export const ProfileContainer = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
`;

export const Sidebar = styled.div`
  width: 250px;
  margin-right: 40px;
`;

export const SidebarGroup = styled.div`
  margin-bottom: 40px;

  h4 {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
  }
`;

export const SidebarItem = styled.div`
  font-size: 16px;
  color: #666;
  padding: 10px 0;
  cursor: pointer;
  transition: color 0.3s;
  padding-left: 2em;

  &:hover {
    color: #e74c3c;
  }

  &.active {
    color: #e74c3c;
    font-weight: bold;
  }
`;

export const ProfileForm = styled.div`
  flex: 1;
  background-color: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  h2 {
    color: #e74c3c;
    margin-bottom: 30px;
  }

  h3 {
    margin-top: 40px;
    margin-bottom: 20px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;

  &::placeholder {
    color: #888;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  margin-top: 30px;
`;

export const SaveButton = styled.button`
  background-color: #e74c3c;
  color: white;
  padding: 12px 20px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #d13b2f;
  }
`;

export const CancelButton = styled.button`
  background-color: transparent;
  color: #888;
  padding: 12px 20px;
  font-weight: bold;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    color: #333;
    border-color: #333;
  }
`;
