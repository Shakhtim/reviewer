import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './assets/styles/base/bootstrap.min.css';
import './assets/styles/fontawesome.min.css';
import Home from './pages/Home/index.tsx';
import Autosalons from './pages/Autosalons/index.tsx';
import AutosalonView from './pages/Autosalons/AutosalonView.tsx';
import Layout from './pages/Layout/index.tsx';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import store from './store.ts';
import Auth from './admin/Auth/index.tsx';
import AdminMain from './admin/View/index.tsx';
import PrivateRoute from './components/PrivateRoute/index.tsx';
import AdminAutosalonsView from './admin/Autosalons/View/index.tsx';
import AdminAutosalonCreate from './admin/Autosalons/Create/index.tsx';
import AdminAutosalonEdit from './admin/Autosalons/Edit/index.tsx';

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/autosalons',
        element: <Autosalons />,
      },
      {
        path: '/autosalons/:id',
        element: <AutosalonView />,
      },
      {
          path: '/auth',
          element: <Auth />,
      },
      
    ]
  },
  {
    path: '/admin',
    element: <PrivateRoute element={<AdminMain />} />,
    children: [
      {
        path: 'autosalons',
        element: <AdminAutosalonsView />,
      },
      {
        path: 'autosalons/create',
        element: <AdminAutosalonCreate />,
      },
      {
        path: 'autosalon/edit/:id',
        element: <AdminAutosalonEdit />, 
      }
      ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<Provider store={store}><RouterProvider router={routes}/></Provider>);

