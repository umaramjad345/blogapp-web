import { Alert, Button, FloatingLabel, Spinner } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth.jsx";
import {
  signUpStart,
  signUpSuccess,
  signUpFailure,
} from "../redux/user/userSlice.js";
import { useDispatch, useSelector } from "react-redux";

const SingUp = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value.trim() });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please Provide Required Information");
    }
    try {
      setErrorMessage(null);
      dispatch(signUpStart());
      const res = await fetch("http://localhost:4000/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signUpFailure(data.message));
      }
      if (res.ok) {
        dispatch(signUpSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signUpFailure(error.message));
    }
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3  max-w-5xl  mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex justify-center">
          <div className="flex flex-col justify-start">
            <Link
              to="/"
              className="font-bold text-4xl flex items-center gap-2 "
            >
              <p className="w-16 h-16 bg-teal-600 bg-gradient-to-tl  from-teal-600 via-teal-700 to-teal-200 px-1 rounded-full text-white flex items-center justify-center">
                i.
              </p>
              <span className="font-bold text-teal-600 dark:text-teal-200 text-4xl ">
                Inner Lens
              </span>
            </Link>
            <p className="text-md mt-2">
              Explore Beyond Headlines: Engage, Enlighten, Enrich.
            </p>
          </div>
        </div>
        {/* right */}

        <div className="flex-1">
          <form
            className="flex flex-col gap-4 w-3/4 mx-auto"
            onSubmit={handleSubmit}
          >
            <h1 className="text-4xl text-center text-teal-600 dark:text-teal-200">
              Welcome!
            </h1>
            <FloatingLabel
              variant="outlined"
              label="Username"
              type="text"
              id="username"
              onChange={handleChange}
              className="focus:border-slate-700 rounded-lg text-teal-600 dark:text-teal-200"
            />
            <FloatingLabel
              variant="outlined"
              label="Email"
              type="email"
              id="email"
              onChange={handleChange}
              className="focus:border-slate-700 rounded-lg text-teal-600 dark:text-teal-200"
            />
            <FloatingLabel
              variant="outlined"
              label="Password"
              type="password"
              id="password"
              onChange={handleChange}
              className="focus:border-slate-700 rounded-lg text-teal-600 dark:text-teal-200"
            />
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-teal-600 via-teal-700 to-teal-400"
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex flex-col gap-4 w-3/4 mx-auto">
            <div className="flex gap-2 text-sm mt-5">
              <span>Already Registered?</span>
              <Link to="/sign-in" className="text-blue-500">
                Sign In
              </Link>
            </div>
            {errorMessage && (
              <Alert className="mt-5" color="failure">
                {errorMessage}
              </Alert>
            )}
            {error && (
              <Alert className="mt-5" color="failure">
                {error}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingUp;
