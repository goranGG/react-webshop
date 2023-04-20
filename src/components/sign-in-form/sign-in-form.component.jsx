import React, { useState } from "react";
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import { FormInput } from "../form-input/form-input.component";

import "./sign-in-form.component.scss";
import Button from "../button/button.component";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const handleSubmitSignIn = async (event) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(
        formFields.email,
        formFields.password
      );
      console.log(response);
      resetFormFields();
    } catch (error) {
      console.log("User creation error:", error);
    }
  };

  const handleChange = (event) => {
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    const response = await signInWithGooglePopup();
    await createUserDocumentFromAuth(response.user);
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmitSignIn}>
        <FormInput
          required
          label="Email"
          name="email"
          type="text"
          onChange={handleChange}
          value={formFields.email}
        />

        <FormInput
          required
          label="Password"
          name="password"
          type="password"
          onChange={handleChange}
          value={formFields.password}
        />

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" onClick={signInWithGoogle} buttonType="google">
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
