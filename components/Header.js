import React from 'react'
import { HiMenu } from "react-icons/hi";

function Header({searchValue, setSearchValue}) {
  return (
    <div className='grid grid-cols-3 sticky top-0 px-2 md:px-8 py-3 bg-rose-500 text-white '>
       <div className='flex  items-center'>Logo</div>
       <div className='flex  justify-center items-center'>
        <input 
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        type='text'
        className='text-sm rounded pl-3 w-60 text-gray-800 outline-none py-2'
        placeholder="Search Countries"
        />
       </div>
       <div className='flex  justify-end items-center'><HiMenu className='h-8 w-8'/></div>
    </div>
  )
}

export default Header