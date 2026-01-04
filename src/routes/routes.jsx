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
import RouteTitle from "../components/RouteTitle/RouteTitle";
import Auth from "../pages/Auth/Auth";
import Contact from "../pages/Contact/Contact";
import About from "../pages/About/About";
import TermsConditions from "../pages/Legal/TermsConditions";
import PrivacyPolicy from "../pages/Legal/PrivacyPolicy";
import HelpCenter from "../pages/Help/HelpCenter";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import MyBills from "../pages/Dashboard/MyBills";
import AddBill from "../pages/Dashboard/AddBill";
import EditBill from "../pages/Dashboard/EditBill";
import Profile from "../pages/Dashboard/Profile";

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
        element: (
          <RouteTitle title="Home">
            <Home />
          </RouteTitle>
        ),
      },
      {
        path: "bills",
        element: (
          <RouteTitle title="All Bills">
            <Bills />
          </RouteTitle>
        ),
      },
      {
        path: "bills/:id",
        element: (
          <RouteTitle title="Bill Details">
            <BillDetails />
          </RouteTitle>
        ),
      },
      {
        path: "auth",
        element: (
          <RouteTitle title="Auth">
            <Auth />
          </RouteTitle>
        ),
      },
      {
        path: "register",
        element: (
          <RouteTitle title="Register">
            <Register />
          </RouteTitle>
        ),
      },
      {
        path: "login",
        element: (
          <RouteTitle title="Login">
            <Login />
          </RouteTitle>
        ),
      },
      {
        path: "my-bills",
        element: (
          <PrivateRoute>
            <RouteTitle title="My Bills">
              <MyPayBills />
            </RouteTitle>
          </PrivateRoute>
        ),
      },
      {
        path: "contact",
        element: (
          <RouteTitle title="Contact Us">
            <Contact />
          </RouteTitle>
        ),
      },
      {
        path: "about",
        element: (
          <RouteTitle title="About Us">
            <About />
          </RouteTitle>
        ),
      },
      {
        path: "terms-conditions",
        element: (
          <RouteTitle title="Terms & Conditions">
            <TermsConditions />
          </RouteTitle>
        ),
      },
      {
        path: "privacy-policy",
        element: (
          <RouteTitle title="Privacy Policy">
            <PrivacyPolicy />
          </RouteTitle>
        ),
      },
      {
        path: "help-center",
        element: (
          <RouteTitle title="Help Center">
            <HelpCenter />
          </RouteTitle>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: (
          <RouteTitle title="Dashboard">
            <DashboardHome />
          </RouteTitle>
        ),
      },
      {
        path: "my-bills",
        element: (
          <RouteTitle title="My Bills">
            <MyBills />
          </RouteTitle>
        ),
      },
      {
        path: "add-bill",
        element: (
          <RouteTitle title="Add Bill">
            <AddBill />
          </RouteTitle>
        ),
      },
      {
        path: "edit-bill/:id",
        element: (
          <RouteTitle title="Edit Bill">
            <EditBill />
          </RouteTitle>
        ),
      },
      {
        path: "profile",
        element: (
          <RouteTitle title="Profile">
            <Profile />
          </RouteTitle>
        ),
      },
    ],
  },
]);

export default router;
