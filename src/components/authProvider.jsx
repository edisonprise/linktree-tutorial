import React from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import {
  auth,
  getUserInfo,
  registerNewUser,
  userExists,
} from "../firebase/firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthProvider = ({
  children,
  onUserLoggedIn,
  onUserNotLoggedIn,
  onUserNotRegistered,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const isRegistered = await userExists(user.uid);
        if (isRegistered) {
          const userInfo = await getUserInfo(user.uid);
          if (userInfo.processCompleted) {
            onUserLoggedIn(userInfo);
          } else {
            onUserNotRegistered(userInfo);
          }
        } else {
          await registerNewUser({
            uid: user.uid,
            displayName: user.displayName,
            profilePicture: "",
            username: "",
            processCompleted: false,
          });
          onUserNotRegistered(user);
        }
      } else {
        onUserNotLoggedIn();
      }
    });
  }, [navigate, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegistered]);
  return <div>{children}</div>;
};

export default AuthProvider;
