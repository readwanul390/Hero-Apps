import React from 'react';
import { createBrowserRouter } from "react-router";
import App from '../App';
import AppPage from '../pages/App/AppPage';
import AppDetails from '../pages/App/AppDetails';
import MyInstallation from '../pages/App/MyInstallation';
import ErrorPage from '../pages/App/ErrorPage';
import PlayStore from '../Components/PlayStore/PlayStore';
import AppStore from '../Components/PlayStore/AppStore';



export const router = createBrowserRouter([
  {
    path: "/",
    Component: App
  },
  {
    path: "/app",
    Component: AppPage,
  },
  {
    path: "/app/:id", 
    Component: AppDetails
  },
  {
    path: "/app/installed", 
    Component: MyInstallation
  },
  {
    path: "/playstore", 
    Component: PlayStore
  },
  {
    path: "/appstore", 
    Component: AppStore
  },
  {
    path: "*",
    Component: ErrorPage
  }
  
]);



