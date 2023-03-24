import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import axios from "axios";

function Header() {
  const navigate = useNavigate();
  const userDetail = useSelector((state) => state.users);
  const { pathname } = useLocation();

  useEffect(() => {
    console.log(pathname);
  }, []);
  const handleLogout = async () => {
    if (userDetail) {
      console.log("logout");
      signOut(auth);
      // const url = `http://localhost:4000/logout`;

      // // const header = await createToken();
      // axios
      //   .post(url)
      //   .then((response) => {
      //     console.log("Logged out Successfully!");
      //     navigate("/login");
      //   })
      //   .catch((error) => console.log(error.message));
      navigate("/login");
      window.location.reload();
    }
  };
  return (
    <div>
      <div className="flex h-full">
        <div class="bg-blue-400 flex justify-start pl-10 w-full h-16">
          <div className="dropdown dropdown-hover">
            <FontAwesomeIcon
              icon={faBars}
              size={"2x"}
              color={"white"}
              className="cursor-pointer relative mt-4"
            />
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-blue-300 rounded-box w-40 "
            >
              <li>
                <Link
                  className="hover:bg-sky-400 hover:text-white text-black font-bold"
                  to="/addBook"
                >
                  Add Book
                </Link>
              </li>
              <li>
                <Link
                  className="hover:bg-sky-400 hover:text-white text-black font-bold"
                  to="/"
                >
                  Library
                </Link>
              </li>
              <li>
                <Link
                  className="hover:bg-sky-400 hover:text-white text-black font-bold"
                  to="/viewBooks"
                >
                  Rented
                </Link>
              </li>
              <li>
                <Link
                  className="hover:bg-sky-400 hover:text-white text-black font-bold"
                  to="/authored"
                >
                  Authored
                </Link>
              </li>
              <li>
                <div
                  className="hover:bg-sky-400 hover:text-white text-black font-bold"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </li>
            </ul>
          </div>
          <div class="bg-blue-400 flex justify-evenly w-full h-16">
            <div class="flex flex-col justify-center">
              <Link to="/addBook">
                {pathname.includes("addBook") ? (
                  <div class=" font-semibold shadow-2xl text-black">
                    Add Book
                  </div>
                ) : (
                  <div class="text-white font-semibold shadow-2xl hover:text-black">
                    Add Book
                  </div>
                )}
              </Link>
            </div>
            <div class="flex flex-col justify-center">
              <Link to="/">
                {pathname === "/" ? (
                  <div class=" font-semibold shadow-2xl text-black">
                    Library
                  </div>
                ) : (
                  <div class="text-white font-semibold shadow-2xl hover:text-black">
                    Library
                  </div>
                )}
              </Link>
            </div>
            <div class="flex flex-col justify-center">
              <Link to="/viewBooks">
                {pathname.includes("viewBooks") ? (
                  <div class=" font-semibold shadow-2xl text-black">
                    Rented Books
                  </div>
                ) : (
                  <div class="text-white font-semibold shadow-2xl hover:text-black">
                    Rented Books
                  </div>
                )}
              </Link>
            </div>
            <div class="flex flex-col justify-center">
              <Link to="/authored">
                {pathname.includes("authored") ? (
                  <div class=" font-semibold shadow-2xl text-black">
                    Authored
                  </div>
                ) : (
                  <div class="text-white font-semibold shadow-2xl hover:text-black">
                    Authored
                  </div>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
