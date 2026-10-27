import { createBrowserRouter } from "react-router-dom";
import Layout from '../../Component/LayAout/Layout'
import NotFound from '../NotFouend/NotFound'
import ProtectedRoute from "../../Component/ProtectedRoute";
import Posts from "../../Component/posts/Posts";
import Home from "../../Component/Home/Home";
import Register from "../../Component/Rigester/Rigester";
import Login from "../../Component/Login/Login";



const router = createBrowserRouter([

    {path: "", element:<Layout />, children: [
       {path: "/home",element: <ProtectedRoute><Home /></ProtectedRoute> },
       {path: "/posts",element: <ProtectedRoute><Posts /></ProtectedRoute>},
       {path: "true",element: <Register />},
       { path: "/login",element: <Login /> },
       { path: "*",element: <NotFound /> }

      ]
      }
   
  ]);

  export default router;
