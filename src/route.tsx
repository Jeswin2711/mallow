import Layout from "@/components/layout/Layout";
import UserList from "@/pages/user-list/UserList";
import Login from '@/pages/login/Login'
import { Navigate } from "react-router-dom";
import NotFound from "./components/not-found/NotFound";

export default [
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/users-list",
        element: <UserList />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />
  }
];
