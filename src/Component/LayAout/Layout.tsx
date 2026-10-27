import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { Toaster } from "react-hot-toast";


export default function Layout() {
  return (
    <div>
     <Navbar />
     <Toaster position="top-center" />
     <Outlet />
     <Footer />
    </div>
  )
}
