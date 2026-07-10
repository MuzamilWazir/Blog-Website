import { NavLink } from "react-router-dom";

const Navbar = (): React.JSX.Element => {
  return (
    <nav className="flex justify-center space-x-10 p-5 border-b border-black shadow-b-black font-bold text-md">
      <NavLink className="" to="/">Home</NavLink>
      <NavLink to="/blogs">Blogs</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/signup">Signup</NavLink> 
      <NavLink to="/profile">Profile</NavLink>
    </nav>
  );
};

export default Navbar;
