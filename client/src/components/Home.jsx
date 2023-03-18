import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const Home = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/linkpage");
  };

  return (
    <section>
      <h1>Главная</h1>
      <br />
      <h3>Вы авторизовались!</h3>
      <br />
      {/* <Link to="/editor">Перейти на страницу модератора</Link>
      <br /> */}
      <Link to="/users">Перейти на страницу админа</Link>
      <br />
      <Link to="/lounge">Перейти в гостиную</Link>
      <br />
      <Link to="/linkpage">Перейти на страницу меню</Link>
      <div className="flexGrow">
        <button onClick={signOut}>Выход</button>
      </div>
    </section>
  );
};

export default Home;
