import { RouterProvider, createBrowserRouter } from "react-router-dom";
import route from "./route";
import { Toaster } from "sonner";

function App() {

  return (
    <>
      <Toaster/>
      <RouterProvider router={createBrowserRouter(route)}/>
    </>
  );
}

export default App;
