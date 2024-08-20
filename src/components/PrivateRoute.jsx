import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';

const PrivateRoute = ({ element }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {//A Firebase method that listens for changes in the user's sign-in state. When the state changes, it provides a user object if the user is signed in or null if not.
      setLoading(false);
      setAuthenticated(!!user);
    });

   
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!authenticated) {
    return <Navigate to="/signin" />;
  }

  return element;
};

export default PrivateRoute;
