import { toast, TypeOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const toastContainer = (msg:string, type:TypeOptions) => {
  toast(msg, {
    position: "bottom-left",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    type: type,
    progress: undefined,
  });
};
