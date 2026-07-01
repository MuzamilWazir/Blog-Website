import { NavLink } from "react-router-dom";

const Navbar = (): React.JSX.Element => {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/blogs">Blogs</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/signup">Signup</NavLink>
      <NavLink to="/profile">Profile</NavLink>
    </nav>
  );
};

export default Navbar;
