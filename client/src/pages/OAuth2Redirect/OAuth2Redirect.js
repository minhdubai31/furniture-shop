import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function OAuth2Redirect() {

   const navigate = useNavigate();

   useEffect(() => {
      const params = new URLSearchParams(window.location.search);

      Promise.all([
         localStorage.setItem('essayAccessToken', params.get('token')),
         localStorage.setItem('essayRefreshToken', params.get('refresh'))
      ]).then(() => {
         navigate('/');
      });
   }, [])
}

export default OAuth2Redirect;
