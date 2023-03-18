import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Users = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users", {
          signal: controller.signal,
        });
        // console.log(response);
        const userName = response.data.map((user) => user.email);

        isMounted && setUsers(userName);
      } catch (error) {
        console.log(error);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>Список пользователей</h2>
      {users?.length ? (
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ul>
      ) : (
        <p>Пользователи не загружены</p>
      )}
    </article>
  );
};

export default Users;
