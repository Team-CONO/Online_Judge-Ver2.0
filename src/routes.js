import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout, nonDefaultLayout } from "./layouts";

// Route Views
import UserProfileLite from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";
import BlogPosts from "./views/BlogPosts";
// import TestLab from "./views/TestLab";
import Login from "./views/Login";
import Main from './views/Main';
import SignUp from "./views/SignUp";
import Admin_Upload from "./views/Admin_Upload";
import Admin_view from './views/Admin_view';

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
    path: "/Admin_Upload",
    layout: DefaultLayout,
    component: Admin_Upload
  },
  { 
    path: "/Admin_view",
    layout: DefaultLayout,
    component: Admin_view
  },
  // {
  //   path: "/user-profile-lite",
  //   layout: DefaultLayout,
  //   component: UserProfileLite
  // },
  // {
  //   path: "/add-new-post",
  //   layout: DefaultLayout,
  //   component: AddNewPost
  // },
  {
    path: "/errors",
    layout: nonDefaultLayout,
    component: Errors
  },
  // {
  //   path: "/components-overview",
  //   layout: DefaultLayout,
  //   component: ComponentsOverview
  // },
  // {
  //   path: "/tables",
  //   layout: DefaultLayout,
  //   component: Tables
  // },
  // {
  //   path: "/blog-posts",
  //   layout: DefaultLayout,
  //   component: BlogPosts
  // }
];
