'use client'
import React, {useState} from 'react';

const CallToActionClient = () => {
  const [email, setEmail] = useState('')

  const onChange = (e : any) => {
    setEmail(e.target.value)
  }

  const handleSubmit = async () => {
    const res = await fetch("http://ec2-3-226-122-223.compute-1.amazonaws.com:3000/new-user",{method: 'POST', body: JSON.stringify({email: email})})
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        id="email"
        type="email"
        className="w-full border-2 rounded-md p-4"
        required
        placeholder="Enter your email"
        onChange={onChange}
      />
      <button
        className="cursor-pointer tracking-wider text-lg font-semibold
      inline-table
      w-full
      items-center
      p-4
      rounded-md
      text-center bg-[#712023] text-white
      max-h-16
      uppercase
    "
      onClick={handleSubmit}
      >
        Get Early Access
      </button>
    </div>

  );
};

export default CallToActionClient;