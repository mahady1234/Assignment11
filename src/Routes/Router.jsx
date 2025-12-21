import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import AuthRoot from "../AuthRoot/AuthRoot";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Profile from "../Pages/MyProfile";
import PrivateRoute from "../Auth/PrivateRoute";
import Home from "../Component/Home";
import DashBoardLayout from "../dashBoardLayout/dashBoardLayout";
import CreateRequest from "../Component/CreateRequest";
import AllUser from "../Component/AllUser";
import AllDonationRequest from "../Component/AllDonationRequest";
import DonationDetail from "../Component/DonationDetail";
import MyRequest from "../Component/MyRequest";
import DashBoardHome from "../Component/DashBoardHome";
import AllDonationRequestAdmin from "../Component/AllDonationRequestAdmin";
import VolunteerAllRequest from "../Component/VolunteerAllRequest";
import Search from "../Component/Search";
import Funding from "../Component/Funding";
import PaymentCancel from "../Component/PaymentCancel";
import AdminFunding from "../Component/AdminFunding";
import DonationRequestView from "../Component/DonationRequestView";
import DonationRequestEdit from "../Component/DonationRequestEdit";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/allDonationRequest',
                element: <AllDonationRequest></AllDonationRequest>
            },
            {
                path: '/search',
                element: <Search></Search>
            },
            {
                path: '/donationDetail/:id',
                element: <PrivateRoute><DonationDetail></DonationDetail></PrivateRoute>
            },
            {
                path: '/funding',
                element: <PrivateRoute><Funding></Funding></PrivateRoute>
            }, {
                path: '/payment-success',
                element: <Funding></Funding>
            }
            , {
                path: '/payment-cancelled',
                element: <PaymentCancel></PaymentCancel>
            }

        ]


    },
    {
        path: '/dashBoard',
        element: <PrivateRoute><DashBoardLayout /></PrivateRoute>,
        children: [
            {
                index: true, 
                element: <PrivateRoute><DashBoardHome /></PrivateRoute>
            },
            {
                path: 'my-donation-requests', 
                element: <PrivateRoute><MyRequest /></PrivateRoute>
            },
            {
                path: 'volunteer-donation-requests', 
                element: <PrivateRoute><VolunteerAllRequest /></PrivateRoute>
            },
            {
                path: 'admin-donation-requests',
                element: <PrivateRoute><AllDonationRequestAdmin /></PrivateRoute>
            }
            ,
            {
                path: 'profile', 
                element: <PrivateRoute><Profile /></PrivateRoute>
            },
            {
                path: 'createRequest',
                element: <PrivateRoute><CreateRequest /></PrivateRoute>
            },
            {
                path: 'allUser',
                element: <AllUser />
            },
            {
                path: 'adminFunding',
                element: <PrivateRoute><AdminFunding></AdminFunding></PrivateRoute>
            },
            {
                path: "donation-request/:id",
                element: <PrivateRoute><DonationRequestView></DonationRequestView></PrivateRoute>
            },
            {
                path: "edit-donation-request/:id",
                element: <PrivateRoute><DonationRequestEdit></DonationRequestEdit></PrivateRoute>
            },
        ]
    }

    ,
    {
        path: 'authRoot',
        element: <AuthRoot />,
        children: [
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            },
        ]
    },


    {
        path: '*',
        element: (
            <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-gray-200">
                <img
                    src="https://media.istockphoto.com/id/2207745244/photo/modern-cybersecurity-visualization-depicting-a-digital-network-threat-alert.webp?a=1&b=1&s=612x612&w=0&k=20&c=3paiBm6FZL28WXjk5EpTCY4CQ-uKR_8Io6o5vwmjFI4="
                    alt="404 Error"
                    className="w-6/12 max-w-md mb-6 rounded-lg shadow-lg"
                />
                <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
                <p className="text-gray-400 mb-4">
                    Sorry, the page you are looking for does not exist.
                </p>
                <a
                    href="/"
                    className="px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-600 transition"
                >
                    Go to Home
                </a>
            </div>
        )
    }




]);

export default router;
