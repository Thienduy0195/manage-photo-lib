import React, { lazy, Suspense } from 'react';
import {
  Route,
  Redirect,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import ErrorBoundary from './ErrorBoundary';
import { PUBLIC_ROUTE } from './route.constants';
import Loader from '@iso/components/utility/loader';

const Dashboard = lazy(() => import('./containers/Dashboard/Dashboard'));

const AdminSignIn = lazy(() => import('@iso/containers/Pages/SignIn/SignIn'));

const publicRoutes = [
  {
    path: PUBLIC_ROUTE.LANDING,
    component: lazy(() => import('@iso/customers/Home/Home')),
    exact: true
  },
  {
    path: PUBLIC_ROUTE.POSTS,
    component: lazy(() => import('@iso/customers/Posts/Posts')),
    exact: true
  },
  {
    path: PUBLIC_ROUTE.POST_DETAIL,
    component: lazy(() => import('@iso/customers/PostDetail/PostDetail'))
  },
  {
    path: PUBLIC_ROUTE.GALLERIES,
    component: lazy(() => import('@iso/customers/Galleries/Galleries')),
    exact: true
  },
  {
    path: PUBLIC_ROUTE.GALLERYDETAIL,
    component: lazy(() => import('@iso/customers/Galleries/GalleryDetail')),
  },
  {
    path: PUBLIC_ROUTE.ABOUT,
    component: lazy(() => import('@iso/customers/About/About')),
  },
  {
    path: PUBLIC_ROUTE.CONTACTS,
    component: lazy(() => import('@iso/customers/Contact/Contact')),
  },
  {
    path: PUBLIC_ROUTE.DONATE,
    component: lazy(() => import('@iso/customers/Donate/Donate')),
  },
  {
    path: PUBLIC_ROUTE.CART,
    component: lazy(() => import('@iso/customers/ViewCart/ViewCart')),
  },
  {
    path: PUBLIC_ROUTE.CHECKOUT,
    component: lazy(() => import('@iso/customers/Checkout/Checkout')),
  },
  {
    path: PUBLIC_ROUTE.PAGE_404,
    component: lazy(() => import('@iso/containers/Pages/404/404')),
  },
  {
    path: PUBLIC_ROUTE.PAGE_500,
    component: lazy(() => import('@iso/containers/Pages/500/500')),
  },
  {
    path: PUBLIC_ROUTE.SIGN_IN,
    component: lazy(() => import('@iso/containers/Pages/SignIn/SignIn')),
  },
  {
    path: PUBLIC_ROUTE.SIGN_UP,
    component: lazy(() => import('@iso/containers/Pages/SignUp/SignUp')),
  },
  {
    path: PUBLIC_ROUTE.FORGET_PASSWORD,
    component: lazy(() =>
      import('@iso/containers/Pages/ForgotPassword/ForgotPassword')
    ),
  },
  {
    path: PUBLIC_ROUTE.RESET_PASSWORD,
    component: lazy(() =>
      import('@iso/containers/Pages/ResetPassword/ResetPassword')
    ),
  },
  {
    path: PUBLIC_ROUTE.AUTH0_CALLBACK,
    component: lazy(() =>
      import('@iso/containers/Authentication/Auth0/Auth0Callback')
    ),
  },
];

function PrivateRoute({ children, ...rest }) {
  const isLoggedIn = useSelector((state) => state.Auth.idToken);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/admin/signin',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default function Routes() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <Router>
          <Switch>
            {publicRoutes.map((route, index) => (
              <Route key={index} path={route.path} exact={route.exact}>
                <route.component />
              </Route>
            ))}
            {/* <Route path="/admin/signin" exact={true}>
              <AdminSignIn />
            </Route> */}
            <Route key='adminLogin' path='/admin/signin'>
                <AdminSignIn />
              </Route>
            <PrivateRoute path="/admin">
              <Dashboard />
            </PrivateRoute>

          </Switch>
        </Router>
      </Suspense>
    </ErrorBoundary>
  );
}
