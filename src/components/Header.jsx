import { Button, Navbar, Dropdown, TextInput, Avatar } from "flowbite-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaSun, FaMoon } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { signOutSuccess } from "../redux/user/userSlice.js";
import { toggleTheme } from "../redux/theme/themeSlice.js";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const path = useLocation.path;

  const handleSignout = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/v1/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data?.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  return (
    <Navbar className="border-b-2">
      <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
        <p className="w-12 h-12 bg-teal-600 bg-gradient-to-tl  from-teal-600 via-teal-700 to-gray-200 px-1 rounded-full text-white flex items-center justify-center">
          i.
        </p>
        <span className="text-teal-600 dark:text-teal-200">Inner Lens</span>
      </Link>

      <form>
        <TextInput
          type="text"
          placeholder="Search"
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>

      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex items-center gap-4 md:order-2">
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="user"
                img={currentUser?.rest?.profilePicture}
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">
                @{currentUser?.rest?.username}
              </span>
              <span className="block text-sm font-medium truncate">
                {currentUser?.rest?.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button gradientMonochrome="teal" outline>
              Sign In
            </Button>
          </Link>
        )}
        <Button
          className="w-10 h-10 hidden sm:flex sm:items-center sm:justify-center"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse className="text-center">
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
