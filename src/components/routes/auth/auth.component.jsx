import React from "react";

import SignUpForm from "../../sign-up-form/sign-up-form.component";
import SignInForm from "../../sign-in-form/sign-in-form.component";

import "./auth.styles.scss";

const Auth = () => {
  return (
    <div className="auth-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Auth;
