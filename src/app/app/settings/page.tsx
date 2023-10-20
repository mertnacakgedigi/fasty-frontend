'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import api from '@/utils/api';
import Snackbar from '@/components/snackbar';

const Settings = () => {
  // Initialize state for refreshRate
  const [refreshRate, setRefreshRate] = useState(0);
  const [snackbar, setSnackbar] = useState(false);

  // Function to handle input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setRefreshRate(+e.target.value);
  };

  useEffect(() => {
    // Fetch initial data when the component mounts
    const fetchInitialData = async () => {
      try {
        const response = await api.get('/user/me');
        setRefreshRate(response.data.refreshRate);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchInitialData();
  }, []);

  const handleSubmit = async () => {
    const requestData = {
      refreshRate,
    };

    try {
      const response = await api.patch('/user', requestData);
      setSnackbar(true);

      console.log('Successfully updated settings:', response.data);
    } catch (error) {
      alert('Something went wrong');
      console.error('Error updating settings:', error);
    }
  };

  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-lg font-semibold leading-6 text-gray-900'>
            Settings
          </h1>
          <p className='mt-2 text-sm text-gray-700'>
            Manage your account settings
          </p>
        </div>
      </div>
      <div className='mt-8 flow-root'>
        <div className='grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3'>
          <div>
            <h3 className='text-sm font-semibold leading-7 text-gray-900'>
              Refresh Rate (ms)
            </h3>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              Set the refresh rate for the loadboard in milliseconds.
            </p>
          </div>
          <div className='grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2'>
            {' '}
            <div className='sm:col-span-3'>
              {/*<label*/}
              {/*  htmlFor='refresh-rate'*/}
              {/*  className='block text-sm font-medium leading-6 text-gray-900'*/}
              {/*>*/}
              {/*  Refresh Rate (ms)*/}
              {/*</label>*/}
              <div className='mt-2'>
                <input
                  onChange={handleInputChange}
                  value={refreshRate}
                  type='number'
                  name='refresh-rate'
                  id='refresh-rate'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='mt-6 flex items-center justify-end gap-x-6'>
          <button
            type='button'
            className='text-sm font-semibold leading-6 text-gray-900'
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            type='submit'
            className='block rounded-md bg-red-900 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-grey-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-900'
          >
            Save
          </button>
        </div>
      </div>
      <Snackbar show={snackbar} setShow={setSnackbar} />
    </div>
  );
};

export default Settings;
