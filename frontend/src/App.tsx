import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/Auth/LoginForm";
import SignupForm from "./components/Auth/SignupForm";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />

        

        <Route path="/" index element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
