import { useEffect, useState } from "react";
import FormInput from "../components/FormInput";
import { Form, Link, useActionData } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";

// TOAST
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../style.css";

// ACTIONS loader
export const action = async ({ request }) => {
  const form = await request.formData();
  const displayName = form.get("name");
  const email = form.get("email");
  const password = form.get("password");

  // tekshirish

  return { displayName, email, password };
};

function Register() {
  const { registerWithEmailAndPassword } = useRegister();
  const data = useActionData();

  useEffect(() => {
    if (data) {
      registerWithEmailAndPassword(data.displayName, data.email, data.password);
    }
  }, [data]);

  //   USE STATE DAN FOYDALANAMIZ
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repeatpassword: "",
  });

  // ONCHANGE FUNNKSIYA
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    return;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, repeatpassword } = formData;

    const trimmedName = name?.trim();
    const trimmedEmail = email?.trim();
    const trimmedPassword = password?.trim();
    const trimmedRepeatPassword = repeatpassword?.trim();

    // Barcha maydonlarni birdaniga tekshirish
    if (
      !trimmedName ||
      !trimmedEmail ||
      !trimmedPassword ||
      !trimmedRepeatPassword
    ) {
      toast.warning("At least one field is not filled!");
    }

    // Password uzunligini tekshirish
    else if (trimmedPassword.length < 6) {
      toast.error("Password must be at least 6 characters long!");
    }

    // Password va Repeat Password mosligini tekshirish
    else if (trimmedPassword !== trimmedRepeatPassword) {
      toast.error("Passwords do not match!");
    }

    // Muvaffaqiyatli xabar
    else {
      toast.success("Registration successful!");
      console.log(1);
    }
  };

  return (
    <div className="h-screen grid place-items-center w-full  registerbg  ">
      <ToastContainer />
      <Form
        onSubmit={handleSubmit}
        method="post"
        className="max-w-96 mx-auto w-full  bg-slate-400 p-10 rounded-2xl "
      >
        <h2 className="text-4xl font-bold text-center mb-5 uppercase text-black">
          Register
        </h2>
        <FormInput
          type="text"
          placeholder="Name"
          label="Enter your Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <FormInput
          type="email"
          placeholder="Email"
          label="Enter your email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <FormInput
          type="password"
          placeholder="Password"
          label=" Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <FormInput
          type="password"
          placeholder=" Repeat Password"
          label="Password"
          value={formData.repeatpassword}
          onChange={handleChange}
        />
        <div className="mt-5 ">
          <button
            className="btn
     btn-primary btn-block bg-black border-black text-white hover:bg-black opacity-90"
          >
            Register
          </button>
        </div>
        <div className="my-5 text-center">
          <p>
            If you have account ,
            <Link to="/Login" className="link link-primary">
              Login
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
}

export default Register;
