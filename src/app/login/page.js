'use client';
import { useState } from 'react';
import { API_ENDPOINT } from '../../utils/constants';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post(API_ENDPOINT + '/auth/login', {
        email,
        password,
      });
      const token = await response.data.accessToken;
      if (!token) {
        alert('Invalid credentials');
        return;
      }
      await localStorage.setItem('token', token); // Storing token in localStorage
      router.push('/app');
    } catch (error) {
      alert('Invalid credentials');
      console.error('Error logging in:', error);
    }
  };

  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <div className='flex items-center flex-row justify-center'>
            <img
              src='./images/icon.svg'
              className='object-fill h-20 sm:h-20 scale-150'
              alt='Fasty Logo'
            />
            <span className='self-center text-xl font-semibold whitespace-nowrap'>
              Fasty
            </span>
          </div>
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Welcome back!
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <div className='space-y-6'>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Email address
              </label>
              <div className='mt-2'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Password
                </label>
                <div className='text-sm'>
                  <a
                    href='#'
                    className='font-semibold text-red-900 hover:text-indigo-500'
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className='mt-2'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <button
                onClick={handleLogin}
                className='flex w-full justify-center rounded-md bg-red-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-grey-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-900'
              >
                Login
              </button>
            </div>
          </div>

          {/*<p className='mt-10 text-center text-sm text-gray-500'>*/}
          {/*  Not a member?{' '}*/}
          {/*  <a*/}
          {/*    href='#'*/}
          {/*    className='font-semibold leading-6 text-red-900 hover:text-indigo-500'*/}
          {/*  >*/}
          {/*    Start a 14 day free trial*/}
          {/*  </a>*/}
          {/*</p>*/}
        </div>
      </div>
    </>
  );
}
