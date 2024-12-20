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
    // tekshirish
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
  };

  //   ONSUBMIT FUNKSIYA
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, repeatpassword } = formData;

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedRepeatPassword = repeatpassword.trim();

    // qaysidir malumot yoqligini tekshirish
    if (
      !trimmedName ||
      !trimmedEmail ||
      !trimmedPassword ||
      !trimmedRepeatPassword
    ) {
      toast.warning(
        "Qaysidir malumot toldirilmagan.Iltimos ma'lumotni to'ldiring"
      );
      return;
    }
    // paswordni 6 ta raqamli bolish sharti
    if (trimmedPassword.length < 6) {
      toast.warning(
        "kiritilgan parolingiz kamida  6 ta elemetdan iborat bolishi kerak "
      );
      return;
    }
    // password bilan repeatpaswordni bir xilligini tekshirish
    if (trimmedRepeatPassword !== trimmedPassword) {
      toast.warning("bir parol kiritilmagan!");
      return;
    }

    // bitta harf borligini tekshirish
    const containsLetter = /[a-zA-Z]/.test(trimmedPassword);
    if (!containsLetter) {
      toast.error("parolingizda kamida 1 ta harf bolishi kerak");
      return;
    }
    toast.success("E rahmat!");
  };

  return (
    <div className="h-screen grid place-items-center w-full  registerbg  ">
      <ToastContainer />
      <Form
        method="post"
        className="max-w-96 mx-auto w-full  bg-slate-400 p-10 rounded-2xl "
      >
        <h2 className="text-4xl font-bold text-center mb-5 uppercase text-black">
          Register
        </h2>
        <FormInput
          type="text"
          placeholder="Name"
          lebel="Enter your Name"
          name="name"
          value={formData.name}
          onchange={handleChange}
        />
        <FormInput
          type="email"
          placeholder="Email"
          lebel="Enter your email"
          name="email"
          value={formData.email}
          onchange={handleChange}
        />
        <FormInput
          type="password"
          placeholder="Password"
          lebel=" Password"
          name="password"
          value={formData.password}
          onchange={handleChange}
        />
        <FormInput
          type="password"
          placeholder=" Repeat Password"
          lebel="Password"
          value={formData.repeatpassword}
          onchange={handleChange}
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
