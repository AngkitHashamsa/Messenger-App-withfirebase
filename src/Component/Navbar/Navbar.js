import React from "react";
import { Link, NavLink } from "react-router-dom";
import { link } from "../../Data/data";
import { useAuthProvider } from "../../context/context";
import profilePic from "../../static/profile-Image.png";
const Navbar = () => {
  // const [pathName, setPathName] = useState(window.location.pathname);

  // const handleClick = () => {
  //   setPathName(window.location.pathname);
  // };
  const { handleLogOut, loading } = useAuthProvider();
  let token = localStorage.getItem("Auth Token");

  return (
    <nav className="bg-black">
      <div className="section-center flex justify-between justify-items-center py-7">
        <div>
          <Link to="/" className="capitalize ">
            message
          </Link>
        </div>
        <ul className="flex">
          {token ? (
            <>
              <li className="mr-3">
                <NavLink to="/profile" className="flex place-content-center">
                  <img
                    src={profilePic}
                    alt="profile image"
                    width={22}
                    height={16}
                    className="rounded-full mr-2"
                  />
                  Profile
                </NavLink>
              </li>
              <li>
                <button onClick={(e) => handleLogOut(e)}>
                  {loading ? "loggin out...." : "log out"}
                </button>
              </li>
            </>
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
