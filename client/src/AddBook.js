import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { auth, createToken } from "./firebase";

function AddBook() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState();
  // const [files, setFiles] = useState([]);

  function handleChange(event) {
    setFile(event.target.files);
  }

  // function handleChangePdf(event) {
  //   setFile(event.target.files[0]);
  // }

  // onChange function that reads files on uploading them
  // files read are encoded as Base64
  // function onFileUpload(event) {
  //   event.preventDefault();
  //   // Get the file Id
  //   let id = event.target.id;
  //   // Create an instance of FileReader API
  //   let file_reader = new FileReader();
  //   // Get the actual file itself
  //   let file = event.target.files[0];
  //   file_reader.onload = () => {
  //     // After uploading the file
  //     // appending the file to our state array
  //     // set the object keys and values accordingly
  //     setFiles([
  //       ...files,
  //       {
  //         file_id: id,
  //         uploaded_file: file_reader.result,
  //       },
  //     ]);
  //   };
  //   // reading the actual uploaded file
  //   file_reader.readAsDataURL(file);
  // }
  const addBookfn = async (event) => {
    event.preventDefault();
    const email = auth.currentUser?.email;
    const header = await createToken();
    const url = `http://localhost:5000/book/${email}/addBook`;
    var formData = new FormData();
    formData.append("name", name);
    formData.append("author", author);
    formData.append("description", description);
    // formData.append("fileName", file.name);
    console.log(file);
    for (let i = 0; i < file.length; i++) {
      formData.append(`files[${i}]`, file[i]);
      formData.append(`fileName[${i}]`, file[i].name);
    }
    for (var key of formData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }

    fetch(url, {
      method: "POST",
      body: formData,
      // credentials: "include",
    })
      .then(async (response) => {
        // navigate("/");
        // else {
        //   if (password_err2 !== null) {
        //     password_err2.style.display = "flex";
        //     response.text().then((text) => {
        //       setError(text);
        //     });
        //   }
        // }
      })
      .catch((error) => {
        // setError(error.message);
        // if (password_err2 !== null) {
        //   password_err2.style.display = "flex";
        // }
        console.log(error);
      });
  };
  return (
    <div class="p-16">
      <div class="text-center font-bold text-5xl">Add Book</div>
      <form id="myForm1" onSubmit={addBookfn}>
        <div class="pt-20 flex flex-col">
          <div class="flex">
            <label htmlFor="" class="pl-40">
              Enter Name :{" "}
            </label>
            <input
              type="text"
              placeholder="Name"
              class="border-2 w-96"
              id="add_name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div class="pt-10">
            <label htmlFor="" class="pl-40 relative">
              Enter Author :{" "}
            </label>
            <input
              type="text"
              placeholder="Author"
              class="border-2 w-96"
              id="add_author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="Description" class="pl-40 relative">
              Description :{" "}
            </label>
            <textarea
              type="text"
              id="add_description"
              class="border-2 w-96 h-36 top-16 relative"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div class="pt-32 pl-40">
            <label for="img">Upload Image and Story : </label>
            <input
              type="file"
              id="img"
              name="img"
              onChange={handleChange}
              multiple
            />
          </div>
          {/* <div class="pt-10 pl-40">
            <label for="pdf">Upload Story : </label>
            <input type="file" id="pdf" name="pdf" onChange={handleChangePdf} />
          </div> */}
          <div class="mt-10">
            <button
              className="bg-blue-600 mt-10 ml-64 p-2 w-44 text-white"
              onClick={addBookfn}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddBook;
