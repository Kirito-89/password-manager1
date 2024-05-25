import React from 'react';

const Navbar = () => {
  return (
    <nav className=' bg-purple-300 flex justify-between h-16 items-center'>
        <div className="logo font-bold mx-3 text-2xl ">
            <span className="text-green-700">&lt;</span>
            Pass
            <span className="text-green-700">OP/&gt;</span>
            </div>
      <ul className='flex gap-2 mx-3'>
        <li>
            <a className='hover:font-bold' href="/">Home</a>
        </li>
        <li>
            <a className='hover:font-bold' href="/about">About</a>
        </li>
        <li>
            <a className='hover:font-bold' href="/contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
