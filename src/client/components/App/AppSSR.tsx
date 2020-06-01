import React, { FC } from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from "react-router-config";
import { ToastProvider } from 'react-toast-notifications';
import { withSSR as withI18nextSSR } from 'react-i18next';
import { routes } from './routes';

export interface IAppSSRProps {
  location?: string | object;
}

const AppSSR: FC<IAppSSRProps> = (props) => (
  <ToastProvider>
    <StaticRouter location={props.location}>
      {renderRoutes(routes)}
    </StaticRouter>
  </ToastProvider>
);

export default withI18nextSSR()(AppSSR);
