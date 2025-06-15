import Layout from "@/components/layout/Layout";
import UserList from "@/pages/user-list/UserList";
import Login from '@/pages/login/Login'

export default [
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
];
