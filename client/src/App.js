import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import LinkPage from "./components/LinkPage";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Admin from "./components/Admin";
import Missing from "./components/Missing";
import Unauthorized from "./components/Unauthorized";
import Lounge from "./components/Lounge";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";

const ROLES = {
  "admin": 777,
  "user": 333,
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.user]} />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
            <Route path="/users" element={<Admin />} />
          </Route>

          <Route
            element={<RequireAuth allowedRoles={[ROLES.admin, ROLES.user]} />}
          >
            <Route path="/lounge" element={<Lounge />} />
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
