import { Link } from "react-router-dom";

import React from "react";

const Missing = () => {
  return (
    <article style={{ padding: "100px" }}>
      <h1>Oops!</h1>
      <p>Page Not Found</p>
      <div className="flexGrow">
        <Link to="/">Перейти на главную страницу</Link>
      </div>
    </article>
  );
};

export default Missing;
