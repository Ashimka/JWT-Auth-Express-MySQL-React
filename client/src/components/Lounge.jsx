import { Link } from "react-router-dom";

import React from "react";

const Lounge = () => {
  return (
    <section>
      <h1>Гостиная</h1>
      <br />
      <p>Страница для зарегистрированных пользователей</p>
      <div className="flexGrow">
        <Link to="/">Главная</Link>
      </div>
    </section>
  );
};

export default Lounge;
