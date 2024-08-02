import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import About from "./pages/About";
// import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
// import CreateListing from "./pages/CreateListing";
// import UpdateListing from "./pages/UpdateListing";
// import Listing from "./pages/Listing";
// import Search from "./pages/Search";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          

          <Route path="/sign-up" element={<SignUp />} />

          <Route path="/sign-in" element={<Signin />} />

{/* 
          <Route path="/about" element={<About />} />

          <Route path="/search" element={<Search />} />

          <Route path="/listing/:listingId" element={<Listing />} /> */}

          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />

            <Route path="/profile" element={<Profile />} />
            
            {/* <Route path="/create-listing" element={<CreateListing />} /> */}
            
            {/* <Route path="/update-listing/:listingId" element={<UpdateListing />} /> */}
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;

