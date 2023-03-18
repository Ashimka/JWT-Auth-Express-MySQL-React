import { useNavigate } from "react-router-dom";

import React from "react";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <section>
      <h1>Не авторизованны</h1>
      <br />
      <p>У вас нет доступа к запрошенной странице.</p>
      <div className="flexGrow">
        <button onClick={goBack}>Назад</button>
      </div>
    </section>
  );
};

export default Unauthorized;
