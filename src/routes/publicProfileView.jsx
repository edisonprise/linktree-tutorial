import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { existsUsername } from "../firebase/firebase";

const PublicProfileView = () => {
  const params = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getProfile();
    async function getProfile() {
      const username = params.username;
      try {
        const userExists = await existsUsername(username);
        if (userExists) {
          const userInfo = await getUserPublicProfileInfo();
        }
      } catch (error) {}
    }
  }, [params]);

  return (
    <div>
      <div>
        <img />
      </div>
      <h2>Username</h2>
      <h3>displayName</h3>
      <div>Links</div>
    </div>
  );
};

export default PublicProfileView;
