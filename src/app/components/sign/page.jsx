"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import ButtonSubmit from "../Button";
import ContainerImage from "../ContainerImage";
import InputLabel from "../Inpult";
import LabelCreatedUser from "../LabelCreatedUser";
import LabelSignUser from "../LabelSignUser";

const Sign = () => {
  const router = useRouter();
  const base_url = process.env.BASE_URL;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (value) => {
    setName(value);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleSignUpClick = async () => {
    try {
      await axios.post(`${base_url}/user/create`, {
        name,
        email,
        password,
      });

      toast.success("Conta criada com sucesso!");
      setTimeout(() => {
        router.back("/");
      }, 3000);
    } catch (error) {
      toast.error("Erro ao criar conta. Tente novamente.");
    }
  };

  return (
    <div className="h-screen w-full flex md flex-col items-center justify-center bg-slate-900 dark:bg-slate-950">
      <ContainerImage
        src="/images/saida.png"
        width={50}
        height={50}
        alt="Descrição da imagem"
      />
      <LabelSignUser label="Criar uma conta" />
      <LabelCreatedUser label="Nome" />
      <InputLabel onChange={handleNameChange} />
      <LabelCreatedUser label="Endereço de e-mail" />
      <InputLabel onChange={handleEmailChange} />
      <div className="flex-row w-96 flex">
        <LabelCreatedUser label="Senha" />
      </div>
      <InputLabel onChange={handlePasswordChange} type="password" />
      <ButtonSubmit text={"Criar"} onClick={handleSignUpClick} />

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

export default Sign;
