import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/Login.css";
import Logo from "../assets/Captura de pantalla 2023-08-02 221459.png"


const FormularioRegistro = () => {
  const navigate = useNavigate();
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  
  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = {
      nombres: nombres,
      apellidos: apellidos,
      email: email,
      usuario: usuario,
      password: password,
    };
    await axios
      .post(/*"http://89.116.25.43:3500/api/usuarios/registrar"*/"http://localhost:3001/api/registrar", formData)
      .then((resp) => {
        console.log(resp);
        Swal.fire("Información!", "Creado Correctamente!", "success");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status == 400) {
          Swal.fire("Información!", err.response.data.message, "error");
        } else {
          Swal.fire("Información!", "Ocurrio un error!", "error");
        }
      });
  };

  return (
    <div className="main">
      <div className="card_main">
        <div className="init">
          <div className="carinfo">
            <img className="log" src={Logo} alt="Logo" />
            <h1>Feedback Zone: Conectando tu futuro ingenierro con experiencias y conocimientos.</h1>
          </div>
        </div>
        <div className="lind">
          <h2>SIGN UP</h2>
            <form className="cardform">


            <div className="form-group">
                <input
                className="inputs"
                type="text"
                placeholder="Name"
                onChange={(e) => {
                    setNombres(e.target.value);
                }}
                />
            </div>
            <div className="form-group">
                {/* <img className="icons" src={UserIcon} alt="user" /> */}
                <input
                className="inputs"
                type="text"
                placeholder="Last name"
                onChange={(e) => {
                    setApellidos(e.target.value);
                }}
                />
            </div>
            <div className="form-group">
                {/* <img className="icons" src={UserIcon} alt="user" /> */}
                <input
                className="inputs"
                type="email"
                placeholder="Email"
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
                />
            </div>
            <div className="form-group">
                {/* <img className="icons" src={UserIcon} alt="user" /> */}
                <input
                className="inputs"
                type="text"
                placeholder="Username"
                onChange={(e) => {
                    setUsuario(e.target.value);
                }}
                />
            </div>
            <div className="form-group">
                {/* <img className="icons" src={PasswordIcon} alt="password" /> */}
                <input
                className="inputs"
                type="password"
                placeholder="Password"
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
                />
            </div>
            <div className="button">
                <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={(e) => {
                    handleRegister(e);
                    }}
                >
                    Get Started
                </button>
            </div>

            <div className="w-full flex justify-end mr-5">
                <Link to={"/login"}>Login</Link>
            </div>
            
            </form>
        </div>
      </div>
    </div>
  );
};

export default FormularioRegistro;