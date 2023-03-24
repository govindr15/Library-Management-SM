import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Book from "./Book";
import { auth, createToken } from "./firebase";

function Authored() {
  const userDetail = useSelector((state) => state.users);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const header = await createToken();
      const email = auth.currentUser?.email;
      const url = `http://localhost:5000/books/${email}/authored`;
      fetch(url, {
        method: "GET",
        headers: header.headers,
      })
        .then(async (response) => {
          const data = await response.json();
          console.log(data);
          setBooks(data);
        })
        .catch((error) => console.log(error.message));
    };
    fetchBooks();
    return () => {
      fetchBooks();
    };
  }, []);

  return (
    <div>
      <div class="p-5">
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
              No Books Authored!
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Authored;
