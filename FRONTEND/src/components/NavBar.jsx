import React from 'react'

const NavBar = () => {
    return (
        <div className='flex justify-around py-2 px-5 bg-black text-white'>
            <div className='text-2xl'>
                <span className='text-green-500 font-bold'>&lt;</span>
                <span className='font-bold'>Pass</span>
                <span className='text-green-500 font-bold'>Op/&gt;</span>
            </div>
            <div>
                <button className='rounded-lg bg-green-500 text-black font-bold flex items-center py-1 px-4 gap-3 cursor-pointer'>
                    <img src="/github.svg" alt="" />
                    <span>GitHub</span>
                </button>
            </div>
        </div>
    )
}

export default NavBar
