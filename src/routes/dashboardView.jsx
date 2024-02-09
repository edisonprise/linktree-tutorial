import AuthProvider from "../components/authProvider";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import DashboardWrapper from "../components/dashboardWrapper";

const DashboardView = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});

  function handleUserLoggedIn(user) {
    setCurrentUser(user);
    setState(2);
  }
  function handleUserNotRegistered(user) {
    navigate("/login");
    setState(3);
  }
  function handleUserNotLoggedIn() {
    navigate("/login");
  }

  if (state === 0) {
    return (
      <AuthProvider
        onUserLoggedIn={handleUserLoggedIn}
        onUserNotLoggedIn={handleUserNotLoggedIn}
        onUserNotRegistered={handleUserNotRegistered}
      >
        Loading...
      </AuthProvider>
    );
  }
  function handleOnSubmit(e) {
    e.preventDefault();
  }
  return (
    <DashboardWrapper>
      <div>
        <h1>Dashboard</h1>
        <form action="" onSubmit={handleOnSubmit}>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" />

          <label htmlFor="url">Url</label>
          <input type="text" name="url" />

          <input type="submit" value="Create new link" />
        </form>
      </div>
    </DashboardWrapper>
  );
};

export default DashboardView;
