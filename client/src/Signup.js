import {
  faEnvelope,
  faLock,
  faLockOpen,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth, createToken } from "./firebase";

function Signup() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [error, setError] = useState("");
  //   const provider = new firebase.auth.GoogleAuthProvider();

  const userDetail = useSelector((state) => state.users);

  // useEffect(() => {
  //   console.log(userDetail);
  //   if (userDetail.user != null) {
  //     navigate("/");
  //   }
  // }, [userDetail]);

  const register = (e) => {
    e.preventDefault();
    console.log("Entered inside");
    let email_err = document.getElementById("email__err");
    let first_name_err = document.getElementById("first__name__err");
    let last_name_err = document.getElementById("last__name__err");
    let password_err = document.getElementById("password__err");
    let password_err1 = document.getElementById("password__err1");
    let password_err2 = document.getElementById("password__err2");
    let validEmail = true;
    let validPassword = true;
    let validReenterPassword = true;
    let validCredentials = true;
    if (email !== undefined && email_err !== null) {
      if (email === "") {
        email_err.innerText = "Email cannot be null!";
        email_err.style.display = "flex";
        validEmail = false;
      } else if (!validateEmail(email)) {
        email_err.innerText = "Email is of incorrect format!";
        email_err.style.display = "flex";
        validEmail = false;
      } else {
        email_err.style.display = "none";
        validEmail = true;
      }
    }

    if (password !== undefined && password_err !== null) {
      if (password.length < 8) {
        password_err.style.display = "flex";
        validPassword = false;
      } else {
        password_err.style.display = "none";
        validPassword = true;
      }
    }

    if (
      password !== undefined &&
      repassword !== undefined &&
      password_err1 !== null
    ) {
      if (password !== repassword) {
        password_err1.innerText = "Passwords do not match!";
        password_err1.style.display = "flex";
        validReenterPassword = false;
      } else {
        password_err1.style.display = "none";
        validReenterPassword = true;
      }
    }

    if (first_name_err !== null) {
      if (firstName === "") {
        first_name_err.style.display = "flex";
        validCredentials = false;
      } else {
        first_name_err.style.display = "none";
        validCredentials = true;
      }
    }

    if (last_name_err !== null) {
      if (lastName === "") {
        last_name_err.style.display = "flex";
        validCredentials = false;
      } else {
        last_name_err.style.display = "none";
        validCredentials = true;
      }
    }
    if (password_err2 !== null) {
      password_err2.style.display = "none";
    }
    if (
      validEmail &&
      validPassword &&
      validReenterPassword &&
      validCredentials
    ) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (auth) => {
          updateProfile(auth.user, { displayName: firstName });
          console.log(firstName);
          if (auth) {
            const url = "http://localhost:5000/signup";
            const header = await createToken();
            fetch(url, {
              method: "POST",
              headers: header.headers,
              body: JSON.stringify({ firstName, lastName, email, password }),
              //   credentials: "include",
            })
              .then((response) => {
                if (response.ok === true) {
                  alert("User has signed up successfully!");
                  navigate("/login");
                  window.location.reload();
                } else {
                  if (password_err2 !== null) {
                    password_err2.style.display = "flex";
                    response.text().then((text) => {
                      setError(text);
                    });
                  }
                }
              })
              .catch((error) => {
                setError(error.message);
                if (password_err2 !== null) {
                  password_err2.style.display = "flex";
                }
              });
          }
        })
        .catch((error) => {
          if (password_err2 !== null) {
            password_err2.style.display = "flex";
          }
          setError(error.message);
        });
    }
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  return (
    <div className="flex flex-col bg-green-300 min-h-screen w-full sm:items-center px-4">
      <div className="flex justify-between bg-white h-5/6 mt-20 mb-20 ml-72 mr-72 opacity-80 shadow-2xl shadow-slate-900 rounded-3xl w-full sm:w-3/4 m-2 px-2">
        {/* <div className="w-1/2 flex justify-center items-center">
      <img src={logo} alt="" className="flex " />
    </div> */}
        <div className="flex w-full justify-center items-center">
          <div className="flex-col w-4/6">
            <p className="flex font-bold justify-center text-2xl pb-10 pt-5 text-green-600">
              Sign Up
            </p>
            <form id="myForm" onSubmit={register}>
              <div className="flex-col justify-center ml-20 mr-20 mb-6">
                <div id="first__name__err" className="text-red-600 hidden">
                  First Name Field cannot be null!
                </div>
                <div className="flex justify-center rounded-md border-2 mb-8">
                  <div className="flex justify-center items-center w-10 border-r-2 bg-green-300">
                    <FontAwesomeIcon
                      icon={faUserAlt}
                      size={"1x"}
                      color={"grey"}
                    />
                  </div>
                  <label htmlFor="register_first_name"></label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full bg-green-200 placeholder-black"
                    id="register_first_name"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div id="last__name__err" className="text-red-600 hidden">
                  Last Name Field cannot be null!
                </div>
                <div className="flex justify-center rounded-md border-2 mb-8">
                  <div className="flex justify-center items-center w-10 border-r-2 bg-green-300">
                    <FontAwesomeIcon
                      icon={faUserAlt}
                      size={"1x"}
                      color={"grey"}
                    />
                  </div>
                  <label htmlFor="register_last_name"></label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full bg-green-200 placeholder-black"
                    id="register_last_name"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div id="email__err" className="text-red-600 hidden"></div>
                <div className="flex justify-center rounded-md border-2 mb-8">
                  <div className="flex justify-center items-center w-10 border-r-2 bg-green-300">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      size={"1x"}
                      color={"grey"}
                    />
                  </div>
                  <label htmlFor="register_email"></label>
                  <input
                    type="text"
                    placeholder="Email ID"
                    className="w-full bg-green-200 placeholder-black"
                    value={email}
                    id="register_email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div id="password__err" className="text-red-600 hidden">
                  Password must be atleast 6 characters!
                </div>
                <div className="flex justify-center rounded-md border-2 mb-8">
                  <div className="flex justify-center items-center w-10 border-r-2 bg-green-300">
                    <FontAwesomeIcon icon={faLock} size={"1x"} color={"grey"} />
                  </div>
                  <label htmlFor="register_password"></label>
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full bg-green-200 placeholder-black"
                    id="register_password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="flex justify-center rounded-md border-2 mb-8">
                  <div className="flex justify-center items-center w-10 border-r-2 bg-green-300">
                    <FontAwesomeIcon
                      icon={faLockOpen}
                      size={"1x"}
                      color={"grey"}
                    />
                  </div>
                  <label htmlFor="register_re_password"></label>
                  <input
                    type="password"
                    placeholder="Re-Enter Password"
                    className="w-full bg-green-200 placeholder-black"
                    value={repassword}
                    required
                    id="register_re_password"
                    onChange={(e) => setRepassword(e.target.value)}
                  />
                </div>
                <div id="password__err1" className="text-red-600 hidden">
                  Passwords do not match!
                </div>
              </div>
              <div
                id="password__err2"
                className="text-red-600 hidden justify-center"
              >
                <p>{error}</p>
              </div>
              <div className="flex justify-center mb-6">
                <button
                  type="submit"
                  className="w-2/5 rounded-full h-10 text-lg shadow-slate-400 font-bold shadow-2xl bg-green-500 cursor-pointer"
                >
                  Sign Up
                </button>
              </div>
            </form>
            <div className="flex justify-center pb-5">
              <div className="flex-col">
                <div className="flex justify-center">
                  <p className="text-sm font-semibold text-green-700">
                    Already have an account?
                  </p>{" "}
                  <Link to="/login">
                    <span className="text-sm ml-1 font-semibold text-black no-underline cursor-pointer">
                      Login
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="flex h-full w-1/2 rounded-r-3xl bg-indigo-600"></div> */}
      </div>
    </div>
  );
}

export default Signup;
