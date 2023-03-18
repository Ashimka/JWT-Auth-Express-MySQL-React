import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

import axios from "../api/axios";
const LOGIN_URL = "/auth";

const Login = () => {
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMessage("");
  }, [user, pass]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pass }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response.data));

      const accessToken = response?.data?.accessToken;

      setAuth({ user, accessToken });
      setUser("");
      setPass("");
      navigate(from, { replace: true });
    } catch (error) {
      if (!error.response) {
        setErrMessage("Сервер не отвечает");
      } else if (error.response.status === 400) {
        setErrMessage("Нет имени или пароля");
      } else if (error.response.status === 401) {
        setErrMessage("Неверный логин или пароль");
      } else {
        setErrMessage("Ошибка входа");
      }
      errRef.current.focus();
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <>
      <section>
        <p
          ref={errRef}
          className={errMessage ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMessage}
        </p>
        <h1>Вход</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Имя пользователя:</label>
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPass(e.target.value)}
            value={pass}
            required
          />
          <button>Войти</button>
          <div className="persistCheck">
            <input
              type="checkbox"
              id="persist"
              onChange={togglePersist}
              checked={persist}
            />
            <label htmlFor="persist">Запомнить меня</label>
          </div>
        </form>
        <p>
          Нет аккаунта?
          <br />
          <span className="line">
            <Link to={"/register"}>Регистрация</Link>
          </span>
        </p>
      </section>
    </>
  );
};

export default Login;
