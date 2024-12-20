import { useEffect, useState } from "react";
import FormInput from "../components/FormInput";
import { Form, Link, useActionData } from "react-router-dom";
import "../style.css";
import { ToastContainer, toast } from "react-toastify";
import { useLogin } from "../hooks/useLogin";

// actions
export const action = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");

  return { email, password };
};

function Login() {
  const data = useActionData();
  const { loginWithEmailAndPassword } = useLogin();
  useEffect(() => {
    if (data) {
      loginWithEmailAndPassword(data.email, data.password);
    }
  }, [data]);
  return (
    <div className="h-screen grid place-items-center w-full background">
      <Form
        method="post"
        className="max-w-96 mx-auto w-full bg-slate-500 p-10 rounded-2xl"
      >
        <h2 className="text-4xl font-bold text-center mb-5 uppercase text-black">
          Login
        </h2>
        <FormInput
          type="email"
          placeholder="Email"
          lebel="Enter your email"
          name="email"
        />
        <FormInput
          type="password"
          placeholder="Password"
          lebel=" Password"
          name="password"
        />

        <div className="mt-5 ">
          <button
            className="btn
   bg-black border-black btn-block text-white hover:bg-black opacity-90"
          >
            Login
          </button>
        </div>
        <div className="my-5 text-center">
          <p>
            If you don't have account ,
            <Link to="/register" className="link link-primary">
              Register
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
}

export default Login;
