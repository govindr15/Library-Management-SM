import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth, createToken } from "./firebase";

function Book({ id }) {
  const navigate = useNavigate();
  const [rerender, setRerender] = useState(false);
  const [details, setDetails] = useState({});
  const [imagePath, setImagePath] = useState();

  useEffect(() => {
    const fetchBooks = async () => {
      const header = await createToken();
      const email = auth.currentUser?.email;
      const url = `http://localhost:5000/book/${email}/${id}`;
      fetch(url, {
        method: "GET",
        headers: header.headers,
      })
        .then(async (response) => {
          const data = await response.json();
          console.log(data);
          var obj = {};
          var name = data[1];
          var author = data[2];
          var description = data[3];
          var image1 = data[4];
          var rentStatus = false;
          var authored = false;
          if (data[7] == 0) {
            rentStatus = false;
          } else {
            rentStatus = true;
          }

          if (data[8] == 0) {
            authored = false;
          } else {
            authored = true;
          }
          obj["name"] = name;
          obj["author"] = author;
          obj["description"] = description;
          obj["rentStatus"] = rentStatus;
          obj["authored"] = authored;
          obj["image"] = "Images/" + image1;
          setDetails(obj);
          setImagePath("Images/" + image1);
          console.log(image1);
          console.log(imagePath);
          console.log(details);
        })
        .catch((error) => console.log(error.message));
    };
    fetchBooks();
    return () => {
      fetchBooks();
    };
  }, [rerender]);

  //   useEffect(() => {
  //     const fetchRentstatus = async () => {
  //       const header = await createToken();
  //       const email = auth.currentUser.email;
  //       const url = `/book/${email}/${cid}/getRent`;
  //       fetch(url, {
  //         method: "GET",
  //         headers: header.headers,
  //       })
  //         .then(async (response) => {
  //           const data = await response.json();
  //           console.log(data[0][0]);
  //           if (data[0][2] == 0) {
  //             setRent(false);
  //           } else {
  //             setRent(true);
  //           }
  //           console.log(rent);
  //         })
  //         .catch((error) => console.log(error.message));
  //     };
  //     fetchRentstatus();
  //   }, [rent, cid]);

  const changeStatus = async () => {
    const header = await createToken();
    const email = auth.currentUser.email;
    const url = `/book/${email}/${id}/changeRent`;
    fetch(url, {
      method: "POST",
      headers: header.headers,
    })
      .then(async (response) => {
        const data = await response.json();
        console.log(data[0][0]);
        setRerender(!rerender);
      })
      .catch((error) => console.log(error.message));
  };

  const removeBook = async () => {
    const header = await createToken();
    const email = auth.currentUser.email;
    const url = `http://localhost:5000/book/${email}/${id}/removeBook`;
    fetch(url, {
      method: "POST",
      headers: header.headers,
      body: JSON.stringify({
        id,
      }),
    })
      .then(async (response) => {
        if (response.ok == true) {
          window.location.reload();
        }
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div class="w-full">
      <div class="p-10 border-2">
        <div class="">
          <img src={details["image"]} alt="" class="h-96 object-contain w-72" />
        </div>
        <div class="text-lg text-center font-semibold py-5 w-72">
          {details["name"]}
        </div>
        <div class="flex justify-start w-72">
          <button
            className="bg-blue-600 p-3 shadow-2xl text-white mr-2 w-full font-semibold"
            onClick={() => navigate(`/book/${id}`)}
          >
            Go To Details
          </button>
        </div>
        <div class="flex justify-start w-72 pt-4">
          {details["rentStatus"] ? (
            <button
              className="border-2 bg-blue-400 p-3 text-white mr-2 w-full font-bold"
              onClick={changeStatus}
            >
              Rented
            </button>
          ) : (
            <button
              className="border-2 border-blue-400 p-3 text-blue-400 mr-2 w-full font-bold"
              onClick={changeStatus}
            >
              Rent
            </button>
          )}
        </div>
        <div class="flex justify-start w-72 pt-4">
          {details["authored"] ? (
            <button
              className="border-2 bg-red-400 p-3  mr-2 w-full font-bold"
              onClick={removeBook}
            >
              Remove Book
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Book;
