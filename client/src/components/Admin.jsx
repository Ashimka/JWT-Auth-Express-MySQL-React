import { Link } from "react-router-dom";
import Users from "./Users";

const Admin = () => {
  return (
    <section>
      <h1>Админ панель</h1>
      <br />
      <Users />
      <br />
      <p>Вам должна быть назначена роль администратора.</p>
      <div className="flexGrow">
        <Link to={"/"}>Главная</Link>
      </div>
    </section>
  );
};

export default Admin;
