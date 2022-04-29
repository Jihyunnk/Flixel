import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 2000);
  }, [navigate]);

  return (
    <div className="notfound--container">
      <div>(^-^*) Whoops! This page doesn't exist. Redirecting you.</div>
    </div>
  );
}

export default NotFound;
