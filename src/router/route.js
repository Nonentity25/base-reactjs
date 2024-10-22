import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { rootLoader } from "./rootLoader.js";
import Home from 'modules/home/index.js';
import Login from 'modules/auth/pages/login/index.js';
import ResetPassword from 'modules/auth/pages/reset-password/index.js';
import UserManagement from 'modules/user-management/index.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
    loader: ({ request, params }) => rootLoader(
      { request, params }, true ,'', 
    )
  },
  {
    path: '/login',
    element: <Login/>,
    loader: ({request, params}) => rootLoader(
      {request, params}, false, 'LOAD_AUTH_PAGE',
    )
  },
  {
    path: '/forgot-password',
    element: <ResetPassword/>,
    loader: ({request, params}) => rootLoader(
      {request, params}, false, '',
    )
  },
  {
    path: '/403',
    element: <></>,
    loader: ({request, params}) => rootLoader(
      {request, params}, true, '',
    )
  },
  {
    path: '/user-management',
    element: <UserManagement/>,
    loader: ({request, params}) => rootLoader(
      {request, params}, true, '',
    )
  },
]);

export default router;
