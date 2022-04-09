import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogo from "../../Assets/Image/google.svg";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../Firebase/Firebase.init";
import toast from "react-hot-toast";

const googleProvider = new GoogleAuthProvider();

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    error: "",
  });
  console.log(email);
  console.log(password);
  console.log(confirmPassword);

  const googleAuth = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error(errorMessage);
      });
  };

  const handleEmail = (event) => {
    const emailInput = event.target.value;
    if (/\S+@\S+\.\S+/.test(emailInput)) {
      setEmail({ value: emailInput, error: "" });
    } else {
      setEmail({ value: "", error: "Invalid email" });
    }
  };

  const handlePassword = (event) => {
    const passwordInput = event.target.value;
    if (passwordInput.length < 7) {
      setPassword({ value: "", error: "Password too short" });
    } else {
      setPassword({ value: passwordInput, error: "" });
    }
  };

  const handleConfirmPassword = (event) => {
    const confirmPassword = event.target.value;
    if (confirmPassword === password.value) {
      setConfirmPassword({ value: confirmPassword, error: "" });
    } else {
      setConfirmPassword({ value: "", error: "Password Mismatched" });
    }
  };

  const handleSignup = (event) => {
    event.preventDefault();
    // toast.success("hello", { id: "success" });
    // toast.error("hello", { id: "fail" });
    if (email.value === "") {
      setEmail({ value: "", error: "Email is required" });
    }
    if (password.value === "") {
      setPassword({ value: "", error: "Password is required" });
    }

    if (
      email.value &&
      password.value &&
      confirmPassword.value === password.value
    ) {
      createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          toast.success("User Created", { id: "success" });
          navigate("/");
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.error(errorMessage);
          if (errorMessage.includes("email-already-in-use")) {
            toast.error("Already Exits", { id: "error" });
          } else {
            toast.error(errorMessage, { id: "error" });
          }
          // ..
        });
    }
  };

  return (
    <div className="auth-form-container ">
      <div className="auth-form">
        <h1>Sign Up</h1>
        <form onSubmit={handleSignup}>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <input
                type="email"
                name="email"
                id="email"
                onBlur={(event) => handleEmail(event)}
              />
            </div>
            {email?.error && <p className="error">{email.error}</p>}
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input
                type="password"
                name="password"
                id="password"
                onBlur={(event) => handlePassword(event)}
              />
            </div>
            {password?.error && <p className="error">{password.error}</p>}
          </div>
          <div className="input-field">
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className="input-wrapper">
              <input
                type="password"
                name="confirmPassword"
                id="confirm-password"
                onBlur={(event) => handleConfirmPassword(event)}
              />
            </div>
            {confirmPassword.error && (
              <p className="error">{confirmPassword.error}</p>
            )}
          </div>
          <button type="submit" className="auth-form-submit">
            Sign Up
          </button>
        </form>
        <p className="redirect">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
        <div className="horizontal-divider">
          <div className="line-left" />
          <p>or</p>
          <div className="line-right" />
        </div>
        <div className="input-wrapper">
          <button className="google-auth" onClick={googleAuth}>
            <img src={GoogleLogo} alt="" />
            <p> Continue with Google </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
