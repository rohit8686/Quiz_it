import { ToastContainer } from "react-toastify";
import { Categories } from "../../Components/Categories/Categories";
import "./home.css";

export const Home = () => {
  return (
    <>
      <Categories />
      <ToastContainer />
    </>
  );
};
