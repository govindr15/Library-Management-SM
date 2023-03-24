import { faLock, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./Images/read-books.gif";
import { auth, createToken } from "./firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigate("/");
      }
    });
  }, []);

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const signIn = (e) => {
    e.preventDefault();
    let email_err = document.getElementById("email__err");
    let password_err = document.getElementById("password__err");
    let password_err2 = document.getElementById("password__err2");
    let form = document.forms[0];
    console.log(email);
    let validEmail = true;
    let validPassword = true;
    if (email !== undefined && email_err !== null) {
      if (email == "") {
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
    if (password_err2 !== null) {
      password_err2.style.display = "none";
    }
    if (validEmail && validPassword) {
      signInWithEmailAndPassword(auth, email, password)
        .then(async (auth) => {
          navigate("/");
          const header = await createToken();
          const url = "http://localhost:5000/login";
          // const requestOptions = {
          //   method: "POST",
          //   headers: { "Content-Type": "application/json" },
          //   body: JSON.stringify({ email }),
          //   credentials: "include",
          // };
          console.log(header.headers);
          fetch(url, {
            method: "POST",
            mode: "cors",
            headers: header.headers,
            body: JSON.stringify({ email, password }),
            // credentials: "include",
          })
            .then((response) => {
              if (response.ok === true) navigate("/");
              else {
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
        })
        .catch((error) => {
          if (password_err2 !== null) {
            password_err2.style.display = "flex";
          }
          setError(error.message);
        });
      // var delayInMilliseconds = 2000;
      // setTimeout(function () {}, delayInMilliseconds);

      console.log("Entered");

      console.log("Entered first");
    }
  };
  return (
    <div className="flex flex-col bg-red-300 min-h-screen w-full items-center sm:items-center px-4">
      <div className="flex justify-center sm:justify-between bg-white h-5/6 mt-20 mb-20 ml-72 mr-72 opacity-80 shadow-2xl shadow-slate-900 rounded-3xl w-full sm:w-3/4 m-2 px-2">
        <div className="w-1/2 lg:flex  hidden justify-center items-center">
          <img
            src={logo}
            alt="logo_image"
            className="flex h-96 p-10 rounded-lg"
          />
        </div>
        <div className="lg:w-1/2 flex justify-center items-center">
          <div className="flex-col w-full">
            <p className="flex font-bold justify-center text-2xl pb-16 text-red-700">
              Sign In
            </p>
            <form id="myForm2" onSubmit={signIn}>
              <div className="flex-col justify-center ml-20 mr-20 mb-10">
                <div id="email__err" className="text-red-600 hidden"></div>
                <div className="flex justify-center rounded-md border-2 mb-10">
                  <div className="flex justify-center items-center w-10 border-r-2 bg-red-200">
                    <FontAwesomeIcon
                      icon={faUserAlt}
                      size={"1x"}
                      color={"grey"}
                    />
                  </div>
                  <label htmlFor="emailid"></label>
                  <input
                    id="emailid"
                    type="text"
                    value={email}
                    placeholder="Email ID"
                    className="w-full"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div id="password__err" className="text-red-600 hidden">
                  Password must be atleast 6 characters!
                </div>
                <div className="flex justify-center rounded-md border-2">
                  <div className="flex justify-center items-center w-10 border-r-2 bg-red-200">
                    <FontAwesomeIcon icon={faLock} size={"1x"} color={"grey"} />
                  </div>
                  <label htmlFor="password"></label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    className="w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div
                id="password__err2"
                className="text-red-600 hidden justify-center"
              >
                <p>{error}</p>
              </div>
              <div className="flex justify-center mb-4">
                <button
                  type="submit"
                  className="bg-red-200 w-2/5 rounded-full h-10 text-lg shadow-slate-400 font-bold shadow-2xl cursor-pointer"
                >
                  Log In
                </button>
              </div>
            </form>
            <div className="flex justify-center">
              <div className="flex-col">
                <div className="flex justify-center">
                  <p className="text-sm font-semibold text-red-600">
                    Don't have an account yet?
                  </p>{" "}
                  <Link to="/signup">
                    <span className="text-sm ml-1 font-semibold cursor-pointer text-black no-underline">
                      Create a new account
                    </span>
                  </Link>
                </div>
                <div className="flex justify-center">
                  <p className="text-sm font-semibold text-red-600">
                    Forgot Password?
                  </p>{" "}
                  <span className="text-sm ml-1 font-semibold text-black no-underline cursor-pointer">
                    Send Reset Password Link to Email
                  </span>
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

export default Login;
