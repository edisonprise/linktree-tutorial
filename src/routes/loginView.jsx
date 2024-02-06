import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth, userExists } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginView = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [state, setCurrentState] = useState(0);

  useEffect(() => {
    setCurrentState(1);
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const isRegistered = await userExists(user.uid);
        if (isRegistered) {
          navigate("/dashboard");
          setCurrentState(2);
        } else {
          navigate("/choose-username");
          setCurrentState(3);
        }
      } else {
        setCurrentState(4);
        console.log("No hay nadie autenticado...");
      }
    });
  }, [navigate]);

  async function handleOnClick() {
    const googleProvider = new GoogleAuthProvider();
    await signInWithGoogle(googleProvider);

    async function signInWithGoogle(googleProvider) {
      try {
        const res = await signInWithPopup(auth, googleProvider);
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    }
  }
  if (state === 2) {
    return <div>Estas autenticado y registrado...</div>;
  }
  if (state === 3) {
    return <div>Estas autenticado pero no registrado...</div>;
  }
  if (state === 4) {
    return (
      <div>
        <button onClick={handleOnClick}>Login with Google</button>
      </div>
    );
  }

  return <div>Loading...</div>;
};

export default LoginView;
