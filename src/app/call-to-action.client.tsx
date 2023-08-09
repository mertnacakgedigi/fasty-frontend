'use client';
import React, { useState } from 'react';
import { API_ENDPOINT } from '@/utils/constants';
import Snackbar from '@/components/snackbar';

const CallToActionClient = () => {
  const [email, setEmail] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const message = 'Thank you for your interest';
  const description = 'We will contact you soon';

  const onChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    console.log({ email });
    const res = await fetch(API_ENDPOINT + '/user/newbie', {
      method: 'POST',
      body: JSON.stringify({ email: email }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.ok) {
      setShowSnackbar(true);
      setEmail('');
      // close snackbar after 3 seconds
      setTimeout(() => {
        setShowSnackbar(false);
      }, 3000);
    }
  };
  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <input
          id='email'
          type='email'
          className='w-full border-2 rounded-md p-4'
          required
          placeholder='Enter your email'
          onChange={onChange}
        />
        <button
          className='cursor-pointer tracking-wider text-lg font-semibold
      inline-table
      w-full
      items-center
      p-4
      rounded-md
      text-center bg-[#712023] text-white
      max-h-16
      uppercase
    '
          onClick={handleSubmit}
        >
          Get Early Access
        </button>
      </div>
      <Snackbar
        show={showSnackbar}
        setShow={setShowSnackbar}
        message={message}
        description={description}
      />
    </>
  );
};

export default CallToActionClient;
