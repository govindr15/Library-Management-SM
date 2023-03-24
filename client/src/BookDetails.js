import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { auth, createToken } from "./firebase";

function BookDetails() {
  const params = useParams();
  const [rerender, setRerender] = useState(false);
  const cid = params.id;
  const [details, setDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      const header = await createToken();
      const email = auth.currentUser.email;
      const url = `http://localhost:5000/book/${email}/${cid}`;
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
          obj["image"] = "../Images/" + image1;
          setDetails(obj);
        })
        .catch((error) => console.log(error.message));
    };
    fetchBooks();
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
    const url = `/book/${email}/${cid}/changeRent`;
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
    const url = `http://localhost:5000/book/${email}/${cid}/removeBook`;
    fetch(url, {
      method: "POST",
      headers: header.headers,
      body: JSON.stringify({
        cid,
      }),
    })
      .then(async (response) => {
        if (response.ok == true) {
          navigate("/");
        }
      })
      .catch((error) => console.log(error.message));
  };
  return (
    <div class="w-full">
      <div class="flex justify-center pt-12">
        <div class="flex flex-col">
          <div>
            <img
              src={details["image"]}
              alt="bookDetailImg"
              class="h-96 object-contain w-72"
            />
          </div>
          <div class="flex justify-center mt-10">
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
      <div class="w-3/4 pt-5">
        <div class="pt-12 text-xl font-semibold">Name</div>
        <hr />
        <div class="text-lg font-bold text-blue-400 flex justify-start">
          {details["name"]}
        </div>
      </div>
      <div class="w-3/4 pt-5">
        <div class="pt-12 text-xl font-semibold">Author</div>
        <hr />
        <div class="text-lg font-medium text-blue-400 flex justify-start">
          {details["author"]}
        </div>
      </div>
      <div class="w-3/4 pt-5">
        <div class="pt-12 text-xl font-semibold">Description</div>
        <hr />
        <div class="text-sm flex justify-start font-medium text-blue-400">
          {details["description"]}
        </div>
      </div>
      <div class="w-3/4 pt-5">
        <div class="pt-12 text-xl font-semibold">Detailed Story</div>
        <hr />
        <Link class="text-sm flex justify-start font-medium text-red-400 underline">
          Download PDF
        </Link>
      </div>
    </div>
  );
}

export default BookDetails;
