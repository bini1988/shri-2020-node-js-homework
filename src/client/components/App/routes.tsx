import React from 'react';
import { Redirect } from 'react-router-dom';
import { RouteConfig } from "react-router-config";
import IndexPage from '../IndexPage';
import SettingsPage from '../SettingsPage';
import BuildDetailsPage from '../BuildDetailsPage';

export const routes: RouteConfig[] = [{
  path: "/",
  exact: true,
  component: IndexPage,
}, {
  path: "/settings",
  component: SettingsPage,
}, {
  path: "/build/:id",
  component: BuildDetailsPage,
}, {
  render: () => <Redirect to="/" />
}];
