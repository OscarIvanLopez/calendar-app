import React from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { startLogin, startRegister } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";
import "./login.css";

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const title = "<CalendarApp />"

  const [formLoginvalues, handleLoginInputChange] = useForm({
    lEmail: "",
    lPassword: "",
  });

  const [formRegistervalues, handleRegisterInputChange] = useForm({
    rName: "",
    rEmail: "",
    rPassword1: "",
    rPassword2: "",
  });

  const { lEmail, lPassword } = formLoginvalues;

  const { rName, rEmail, rPassword1, rPassword2 } = formRegistervalues;

  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(startLogin(lEmail.trim(), lPassword));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (rPassword1 !== rPassword2) {
      return Swal.fire(
        "Error",
        "Las contraseñas deben de ser iguales",
        "error"
      );
    } else {
      dispatch(startRegister(rEmail, rPassword1, rName));
    }
  };
  return (
    
    <div className="container login-container">
    <h1 className="title-app animate__animated animate__fadeInDown">{title}</h1>
    <h1 className="title-login animate__animated animate__fadeInUp animate__faster">Administra eventos con tus compañeros</h1>
      <div className="row forms" >
        <div className="col-md-6 login-form-1 animate__animated animate__fadeInLeft animate__faster">
          <h3>Ingreso</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="lEmail"
                value={lEmail}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="lPassword"
                value={lPassword}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2 animate__animated animate__fadeInRight animate__faster">
          <h3>Registro</h3>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="rName"
                value={rName}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="rEmail"
                value={rEmail}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="rPassword1"
                value={rPassword1}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="rPassword2"
                value={rPassword2}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
