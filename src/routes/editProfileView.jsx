import AuthProvider from "../components/authProvider";
import DashboardWrapper from "../components/dashboardWrapper";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import {
  getProfilePhotoUrl,
  updateUser,
  setUserProfilePhoto,
} from "../firebase/firebase";

const EditProfileView = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [profileUrl, setprofileUrl] = useState(null);
  const fileRef = useRef(null);

  async function handleUserLoggedIn(user) {
    setCurrentUser(user);
    const url = await getProfilePhotoUrl(user.profilePicture);
    setprofileUrl(url);
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
  function handleChangeFile(e) {
    const files = e.target.files;
    const fileReader = new FileReader();
    if (fileReader && files && files.length > 0) {
      fileReader.readAsArrayBuffer(files[0]);
      fileReader.onload = async function () {
        const imageData = fileReader.result;
        const res = await setUserProfilePhoto(currentUser.uid, imageData);
        if (res) {
          const tmpUser = { ...currentUser };
          tmpUser.profilePicture = res.metadata.fullPath;
          await updateUser(tmpUser);
          setCurrentUser({ ...tmpUser });
          const url = await getProfilePhotoUrl(currentUser.profilePicture);
          setprofileUrl(url);
        }
      };
    }
  }

  if (state !== 2) {
    return (
      <AuthProvider
        onUserLoggedIn={handleUserLoggedIn}
        onUserNotLoggedIn={handleUserNotLoggedIn}
        onUserNotRegistered={handleUserNotRegistered}
      ></AuthProvider>
    );
  }
  return (
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
  );
};

export default EditProfileView;
