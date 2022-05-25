import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { contextUser } from '../../App';

const PrivateRoute = ({children,...rest}) => {
  console.log(children);
  const [user,,,]=useContext(contextUser);
  console.log(user);
    return (
        <Route
      {...rest}
      render={({ location }) =>
      (user.email || sessionStorage.getItem('user') ) ? (
           children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
    );
};

export default PrivateRoute;