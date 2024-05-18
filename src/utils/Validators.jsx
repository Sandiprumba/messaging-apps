import { isValidUsername } from "6pp";

export const usernameValidator = (username) => {
  if (!isValidUsername(username)) {
    return { isValid: false, errorMessage: "Username Is Invalid" };
  } else {
    return { isValid: true };
  }
};
//here the isValidUsername is like a hook that checks validations of the user
