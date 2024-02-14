import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  existsUsername,
  getProfilePhotoUrl,
  getUserPublicProfileInfo,
} from "../firebase/firebase";

const PublicProfileView = () => {
  const params = useParams();
  const [profile, setProfile] = useState(null);
  const [url, setUrl] = useState("");
  const [state, setState] = useState(0);

  useEffect(() => {
    getProfile();
    async function getProfile() {
      const username = params.username;
      try {
        const userUid = await existsUsername(username);
        if (userUid) {
          const userInfo = await getUserPublicProfileInfo(userUid);
          setProfile(userInfo);

          const url = await getProfilePhotoUrl(
            userInfo.profileInfo.profilePicture
          );
          setUrl(url);
        } else {
          setState(7);
        }
      } catch (error) {}
    }
  }, [params]);

  if (state === 7) {
    return (
      <div>
        <h1>Username doesn't exist</h1>
      </div>
    );
  }
  console.log(profile?.profileInfo.username);
  return (
    <div>
      <div>
        <img src={url} alt="" height={60} width={60} />
      </div>
      <h2>{profile?.profileInfo.username}</h2>
      <h3>{profile?.profileInfo.displayName}</h3>
      <div>
        {profile?.linksInfo.map((link) => (
          <div>
            <a href={link.url}>{link.title}</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicProfileView;
