import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

// laoyuts
import MainLayout from "./layouts/MainLayout";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoutes from "./components/ProtectedRoutes";

// actions
import { action as loginAction } from "./pages/Login";
import { action as registerAction } from "./pages/Register";

function App() {
  const user = false;
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: loginAction,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
      action: registerAction,
    },
  ]);
  return <RouterProvider router={routes} />;
}

export default App;
