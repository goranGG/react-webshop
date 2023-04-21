import React, { useContext, useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import { FormInput } from "../form-input/form-input.component";

import "./sign-up-form.styles.scss";
import Button from "../button/button.component";
import { UserContext } from "../../contexts/user.context";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { setCurrentUser } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formFields.password !== formFields.confirmPassword) {
      console.log("Passwords not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        formFields.email,
        formFields.password
      );
      setCurrentUser(user);
      await createUserDocumentFromAuth(user.user, {
        displayName: formFields.displayName,
      });
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

  return (
    <div className="sign-up-container">
      <h2>Dont have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          required
          label="Display name"
          id="displayName"
          name="displayName"
          type="text"
          onChange={handleChange}
          value={formFields.displayName}
        />
        <FormInput
          required
          label="Email"
          id="email"
          name="email"
          type="text"
          onChange={handleChange}
          value={formFields.email}
        />
        <FormInput
          required
          label="Password"
          id="password"
          name="password"
          type="password"
          onChange={handleChange}
          value={formFields.password}
        />
        <FormInput
          required
          label="Confirm Password"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          onChange={handleChange}
          value={formFields.confirmPassword}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
