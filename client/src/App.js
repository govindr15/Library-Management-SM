import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import AddBook from "./AddBook";
import Authored from "./Authored";
import BookDetails from "./BookDetails";
import { auth } from "./firebase";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import ViewBooks from "./ViewBooks";

function App() {
  const [user, setUser] = useState([{}]);
  const userDetail = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("The user is :", authUser);
      if (authUser) {
        dispatch({ type: "SET_USER", user: authUser });
      } else {
        dispatch({ type: "SET_USER", user: null });
      }
    });
  }, []);

  // useEffect(() => {
  //   fetch("/members")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data);
  //     });
  // }, []);

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          ></Route>
          <Route
            path="/book/:id"
            element={
              <>
                <Header />
                <BookDetails />
              </>
            }
          />
          <Route
            path="/addBook"
            element={
              <>
                <Header />
                <AddBook />
              </>
            }
          />
          <Route
            path="/viewBooks"
            element={
              <>
                <Header />
                <ViewBooks />
              </>
            }
          />
          <Route
            path="/authored"
            element={
              <>
                <Header />
                <Authored />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Login />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <Signup />
              </>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
