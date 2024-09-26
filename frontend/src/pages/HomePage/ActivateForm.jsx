import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FormWrapper, Title } from "../../pages/LoginPage/styles";
import { activateAccount } from "../../redux/slides/verifySlice";

const ActivateForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { loading, error, success } = useSelector((state) => state.verify);

  // Lấy token từ query parameter
  const query = new URLSearchParams(location.search);
  const token = query.get("token");

  useEffect(() => {
    if (token) {
      dispatch(activateAccount(token));
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [success, navigate]);

  return (
    <FormWrapper>
      <Title>Activate Your Account</Title>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "#b94a48" }}>{error}</div>}
      {success && <div style={{ color: "var(--green-color)" }}>{success}</div>}
    </FormWrapper>
  );
};

export default ActivateForm;
