import AuthProvider from "../components/authProvider";
import DashboardWrapper from "../components/dashboardWrapper";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

const EditProfileView = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [profileUrl, setprofileUrl] = useState(null);
  const fileRef = useRef(null);

  async function handleUserLoggedIn(user) {
    setCurrentUser(user);
    setState(2);
  }
  function handleUserNotRegistered(user) {
    navigate("/login");
  }
  function handleUserNotLoggedIn() {
    navigate("/login");
  }
  function handleOpenFilePicker() {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }
  function handleChangeFile(e) {}
  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotLoggedIn={handleUserNotLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
    >
      <DashboardWrapper>
        <div>
          <h2>EditProfileView</h2>
          <div>
            <div>
              <img src={profileUrl} alt="" width={100} />
            </div>
            <div>
              <button onClick={handleOpenFilePicker}>
                Choose new profile picture
              </button>
              <input
                ref={fileRef}
                type="file"
                style={{ display: "none" }}
                onChange={handleChangeFile}
              />
            </div>
          </div>
        </div>
      </DashboardWrapper>
    </AuthProvider>
  );
};

export default EditProfileView;
