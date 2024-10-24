import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

import { jwtDecode } from "jwt-decode";
function GoogleLogins() {
  const navigate = useNavigate();
  return (
    <div className="">
      <p className='text-white text-center mt-4'>---- OR ----</p>
    <div className="flex justify-center mt-4">
    <GoogleLogin
  onSuccess={credentialResponse => {
    const res=jwtDecode(credentialResponse.credential)
    navigate('/leaks')
    console.log(res);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>
</div>
</div>
  )
}

export default GoogleLogins