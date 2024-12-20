import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

export function useRegister() {
  const registerWithEmailAndPassword = (displayName, email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((profile) => {
        console.log(profile.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return { registerWithEmailAndPassword };
}
