import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";

const USER_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pass, setPass] = useState("");
  const [validPass, setValidPass] = useState(false);
  const [passFocus, setPassFocus] = useState(false);

  const [matchPass, setMatchPass] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPass(PASS_REGEX.test(pass));
    setValidMatch(pass === matchPass);
  }, [pass, matchPass]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pass, matchPass]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PASS_REGEX.test(pass);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ user, pass }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      // console.log(response?.data);
      // console.log(response?.accessToken);
      // console.log(JSON.stringify(response));
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUser("");
      setPass("");
      setMatchPass("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Пользователь с таким email существует");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h3>Вы зарегистрировались!</h3>
          <p>
            <Link to={"/login"}>Вход</Link>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h2>Регистрация</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              Email:
              <FontAwesomeIcon
                icon={faCheck}
                className={validName ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validName || !user ? "hide" : "invalid"}
              />
            </label>
            <input
              type="email"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="uidnote"
              className={
                userFocus && user && !validName ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Введите Ваш действующий email адрес
            </p>

            <label htmlFor="password">
              Пароль:
              <FontAwesomeIcon
                icon={faCheck}
                className={validPass ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPass || !pass ? "hide" : "invalid"}
              />
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPass(e.target.value)}
              value={pass}
              required
              aria-invalid={validPass ? "false" : "true"}
              aria-describedby="passnote"
              onFocus={() => setPassFocus(true)}
              onBlur={() => setPassFocus(false)}
            />
            <p
              id="passnote"
              className={passFocus && !validPass ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Пароль должен состоять от 8 до 24 символов.
              <br />
              из хотябы одной заглавной и строчной буквы, цифр и
              <br />
              специальных символов
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>

            <label htmlFor="confirm_pass">
              Повторите пароль:
              <FontAwesomeIcon
                icon={faCheck}
                className={validMatch && matchPass ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validMatch || !matchPass ? "hide" : "invalid"}
              />
            </label>
            <input
              type="password"
              id="confirm_pass"
              onChange={(e) => setMatchPass(e.target.value)}
              value={matchPass}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Повторите пароль
            </p>

            <button
              disabled={!validName || !validPass || !validMatch ? true : false}
            >
              Зарегистрировать
            </button>
          </form>
          <p>
            Есть аккаунт?
            <br />
            <span className="line">
              {/*put router link here*/}
              <Link to={"/login"}>Вход</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Register;
