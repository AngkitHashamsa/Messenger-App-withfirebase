import React from "react";
import { Link, NavLink } from "react-router-dom";
import { link } from "../../Data/data";
import { useAuthProvider } from "../../context";
const Navbar = () => {
  // const [pathName, setPathName] = useState(window.location.pathname);

  // const handleClick = () => {
  //   setPathName(window.location.pathname);
  // };
  const { handleLogOut, loading } = useAuthProvider();
  let token = localStorage.getItem("Auth Token");
  console.log(token);
  return (
    <nav className="bg-black">
      <div className="section-center flex justify-between justify-items-center py-7">
        <div>
          <Link to={token ? "/" : "/login"} className="capitalize ">
            message
          </Link>
        </div>
        <ul className="flex">
          {token ? (
            <li>
              <button onClick={(e) => handleLogOut(e)}>
                {loading ? "loggin out...." : "log out"}
              </button>
            </li>
          ) : (
            link.map((item) => {
              return (
                <li key={item.id}>
                  <NavLink to={item.path} className="ml-3">
                    {item.value}
                  </NavLink>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
