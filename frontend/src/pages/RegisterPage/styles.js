import styled from "styled-components";

// Container for the entire page
export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
`;

// Wrapper for the form and content
export const FormWrapper = styled.div`
  background-color: #ffffff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

// Logo styling
export const LogoWrapper = styled.div`
  margin-bottom: 20px;

  img {
    width: 100px;
  }
`;

// Form title
export const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #0e0620;
  margin-bottom: 20px;
`;

// Input fields
export const Input = styled.input`
  width: 100%;
  padding: 15px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  background-color: #f4f4f4;

  &:focus {
    border-color: #2ccf6d;
    outline: none;
  }
`;

// Submit button
export const Button = styled.button`
  width: 100%;
  padding: 15px;
  margin-top: 20px;
  background-color: #2ccf6d;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #28b35d;
  }
`;

// Additional links (login link)
export const Link = styled.a`
  display: block;
  margin: 15px 0;
  color: #0e0620;
  font-size: 14px;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #2ccf6d;
  }
`;

// Form itself
export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
