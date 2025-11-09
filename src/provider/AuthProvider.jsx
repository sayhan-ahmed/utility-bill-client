import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import app from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  // 🔹 Create account
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // 🔹 Login with email & password
  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 🔹 Login with Google
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // 🔹 Logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // 🔹 Reset Password
  const resetPass = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  // 🔹 Watch authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authData = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    logIn,
    googleSignIn,
    logOut,
    resetPass,
    updateProfile,
  };

  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
