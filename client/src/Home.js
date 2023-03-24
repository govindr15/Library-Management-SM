import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Book from "./Book";
import axios from "axios";
import { createToken } from "./firebase";
import SearchBar from "./SearchBar";

function Home() {
  const userDetail = useSelector((state) => state.users);
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState([{}]);
  const [bookRef, setBookRef] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(userDetail);
    setUser(userDetail.user);
    if (userDetail.user == null) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      const header = await createToken();
      const url = `http://localhost:5000/books`;
      fetch(url, {
        method: "GET",
        headers: header.headers,
      })
        .then(async (response) => {
          const data = await response.json();
          console.log(data);
          setBooks(data);
          setBookRef(data);
        })
        .catch((error) => console.log(error.message));
    };
    fetchBooks();
    return () => {
      fetchBooks();
    };
  }, []);

  const onSearch = (search) => {
    if (search === "") {
      return setBooks(bookRef);
    }
    const filteredBooks = bookRef?.filter((book) => {
      return book[1].toLowerCase().includes(search.toLowerCase());
    });
    setBooks(filteredBooks);
  };

  return (
    <div>
      <div class="p-5">
        <div className="flex justify-left ml-10 mt-2">
          <span className="flex font-bold text-lg items-center">
            Search Books:
          </span>
          <SearchBar onSearch={onSearch} />
        </div>
        {books.length !== 0 ? (
          <div class="flex flex-wrap justify-between">
            {books?.map((book) => (
              <div class="p-5">
                <Book id={book[0]} key={book[0]} />
              </div>
            ))}
          </div>
        ) : (
          <div class="flex justify-center">
            <h1 class="flex justify-center text-3xl font-bold">
              No Books Found!
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
