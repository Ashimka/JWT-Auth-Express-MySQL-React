import { Link } from "react-router-dom";

import React from "react";

const LinlPage = () => {
  return (
    <section>
      <h1>Меню</h1>
      <br />
      <h2>Публичные страницы</h2>
      <Link to="/login">Вход</Link>
      <Link to="/register">Регистрация</Link>
      <br />
      <h2>Страницы для авторизовнных</h2>
      <Link to="/">Главная</Link>
      <Link to="/users">Страница админа</Link>
    </section>
  );
};

export default LinlPage;
