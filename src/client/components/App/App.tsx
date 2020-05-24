import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from "react-router-config";
import { ToastProvider } from 'react-toast-notifications';
import { routes } from './routes';

const App: FC = () => (
  <ToastProvider>
    <BrowserRouter>
      {renderRoutes(routes)}
    </BrowserRouter>
  </ToastProvider>
);

export default App;
