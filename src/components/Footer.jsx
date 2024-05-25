import React from 'react';

const Footer = () => {
    return (<>
    <div className='flex justify-between bg-purple-500 items-center'>
        <div >
            <img className='invert mx-6' width={25} src="/icons/heart.png" alt="Love" /> with love
        </div>
        <div>
            <span className="text-green-700">&lt;</span>
            Pass
            <span className="text-green-700 font-bold ">OP/&gt;</span>
        </div>
    </div>
        
    </>
    );
}

export default Footer;
