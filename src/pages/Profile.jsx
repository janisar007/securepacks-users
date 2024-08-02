import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { AiTwotoneEdit } from "react-icons/ai";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";

const Profile = () => {
  const navigate = useNavigate();
  const fileRef = useRef(null); //?In the first input field i defined ref={fileRef} and in img i created an onClick in which fileRef.current.click() is written. in this way i am connecting that input field to this img. so if i click on img, it is actually clicking on that input that opens file storage of our computer. we cannot see that input coz it is hidden
  //!FIREBASE_RULES: After connecting input and img i have to write some rules for read and write in my application in the firebase. coz default i can not write in my application. this is done at vid(3:48:00)->
  const [file, setFile] = useState(undefined);
  const [filePrecent, setFilePrecent] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingError, setShowListingError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();
  // console.log(formData);

  // console.log(filePrecent);
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);


  const { currentUser, loading, error } = useSelector((state) => state.user);

  // console.log(file);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());

      const res = await fetch(`https://securepacks-users-api.onrender.com/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());

      const res = await fetch(`https://securepacks-users-api.onrender.com/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());

      const res = await fetch("https://securepacks-users-api.onrender.com/api/auth/signout"); //default method is GET

      const data = await res.json();

      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }

      dispatch(signOutUserSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(signOutUserFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingError(false);

      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();

      if (data.success === false) {
        setShowListingError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingError(true);
    }
  };


  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />

        <img
          onClick={() => fileRef.current.click()}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          src={formData.avator || currentUser.avator}
          alt="profile"
        />

        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700"> Error Image upload</span>
          ) : filePrecent > 0 && filePrecent < 100 ? (
            <span className="text-slate-700">
              {`Uploading ${filePrecent}%`}
            </span>
          ) : filePrecent === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>

        <input
          type="text"
          placeholder="username"
          id="username"
          defaultValue={currentUser.username}
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="email"
          id="email"
          defaultValue={currentUser.email}
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95"
        >
          {loading ? "Loading..." : "Update"}
        </button>

        {/* Link for create Listing apart from this form functionallity-> */}
        {/* <Link
          className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
          to={"/create-listing"}
        >
          Create Listing
        </Link> */}
      </form>

      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer hover:text-red-900"
        >
          Delete account
        </span>

        <span
          onClick={handleSignOut}
          className="text-red-700 cursor-pointer hover:text-red-900"
        >
          Sign out
        </span>
      </div>
      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-5">
        {updateSuccess ? "Updated successfully!" : ""}
      </p>


    

     
    </div>
  );
};

export default Profile;
