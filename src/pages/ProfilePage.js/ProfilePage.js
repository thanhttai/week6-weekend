import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import userAction from "../../redux/actions/user.action";

const ProfilePage = () => {
  const dispatch = useDispatch();

  let navigate = useNavigate();
  useEffect(() => {
    dispatch(userAction.getCurrentUser());
  }, []);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (!isAuthenticated) {
    console.log("isAuthen", isAuthenticated);
    navigate("/login");
  }

  return <div>this is profile page</div>;
};

export default ProfilePage;
