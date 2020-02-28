import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout, nonDefaultLayout } from "./layouts";

// Route Views
import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
import Tables from "./views/Tables";
import Login from "./views/Login";
import Main from './views/Main';
import SignUp from "./views/SignUp";
import Admin_view from './views/Admin_view';
import Admin_Upload from "./views/Admin_Upload";
import Password_reset from './views/Password_reset';

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/Login" />
  },
  {
    path: '/Main',
    layout: DefaultLayout,
    component: Main
  },
  {
    path:"/Login",
    layout: nonDefaultLayout,
    component: Login
  },
  {
    path: "/SignUp",
    layout: nonDefaultLayout,
    component: SignUp
  },
  {
    path: "/E",
    layout: DefaultLayout,
    component: Tables
  },
  {
    path: "/M",
    layout: DefaultLayout,
    component: Tables
  },
  {
    path: "/H",
    layout: DefaultLayout,
    component: Tables
  },
  {
    path: "/Other",
    layout: DefaultLayout,
    component: Tables
  },
  {
    path: "/Admin_view",
    layout: DefaultLayout,
    component: Admin_view
  },
  {
    path: "/Admin_Upload",
    layout: DefaultLayout,
    component: Admin_Upload
  },
  {
    path: "/Password_reset",
    layout: nonDefaultLayout,
    component: Password_reset
  },
  {
    path: "/errors",
    layout: nonDefaultLayout,
    component: Errors
  },
];
