"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AccoutCreated from "./components/AccoutCreated";
import ButtonSubmit from "./components/Button";
import ContainerImage from "./components/ContainerImage";
import InputLabel from "./components/Inpult";
import LabelCreatedUser from "./components/LabelCreatedUser";
import LabelSignUser from "./components/LabelSignUser";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleSignIn = async () => {
    try {
      const response = await axios.post("http://localhost:3001/login/user", {
        email,
        password,
      });

      localStorage.setItem('userData', JSON.stringify(response.data));
      if (response.data.success) {
        toast.success("Conta logada com sucesso!");
        setTimeout(() => {
          router.push("/components/home");
        }, 3000);
      }
    } catch (error) {
      console.error("Erro na chamada de API:", error);
      toast.error("Erro ao logar na conta. Tente novamente.");
    }
  };

  const handleSignUpClick = () => {
    router.push("/components/sign");
  };

  return (
    <div className="h-screen w-full flex md flex-col items-center justify-center bg-slate-900 dark:bg-slate-950">
      <ContainerImage
        src="/images/saida.png"
        width={50}
        height={50}
        alt="Descrição da imagem"
      />
      <LabelSignUser label="Sign in to your account" />
      <LabelCreatedUser label="Email address" />
      <InputLabel onChange={handleEmailChange} />
      <div className="flex-row w-96 flex">
        <LabelCreatedUser label="password" />
        <LabelCreatedUser forPass={true} label="Forgot password?" />
      </div>
      <InputLabel onChange={handlePasswordChange} type="password" />
      <ButtonSubmit text={"Sign in"} onClick={handleSignIn} />
      <div className="flex-row w-96 flex">
        <AccoutCreated label="Have an account?" />
        <AccoutCreated
          forPass={true}
          label="Click Create an account"
          onClick={handleSignUpClick}
        />
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
