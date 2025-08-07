import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import App from './App.jsx'
import Home from './Pages/Home.jsx';
import Presentations from './Pages/Presentations.jsx';
import PresentationRoom from './Pages/PresentationRoom.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children : [
      {
        path: "/",
       element: <Home />
      },
      {
        path: "presentations", element: <Presentations />
      },
      {path : "presentation/:id", element: < PresentationRoom/>}
    ]
  },
 
]);
ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)