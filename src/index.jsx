import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

/**
 * This file can be ignored, please work in ./components/App.jsx
 */

// Include mock API.
import './mock';

// Include styles.
import './styles/index.css';
import './styles/Components/loader.css';
import './styles/Components/pagination.css';
import './styles/Components/table.css';
import './styles/Components/buttons.css';

// Include application component.
import App from './components/App';
import Details from './components/Details';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/details/:infoId',
    element: <Details />,
  },
]);
ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
);
