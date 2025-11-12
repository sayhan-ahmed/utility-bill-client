import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../pages/Home/Home";
import Bills from "../pages/Bills/Bills";
import Loader from "../components/Loader/Loader";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import MyPayBills from "../pages/MyPayBills/MyPayBills";
import PrivateRoute from "../provider/PrivateRoute";
import BillDetails from "../pages/BillDetails/BillDetails";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage></ErrorPage>,
    hydrateFallbackElement: <Loader></Loader>,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
      },
      {
        path: "bills",
        Component: Bills,
      },
      {
        path: "bills/:id",
        element: (
          <PrivateRoute>
            <BillDetails></BillDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "my-bills",
        element: (
          <PrivateRoute>
            <MyPayBills></MyPayBills>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
