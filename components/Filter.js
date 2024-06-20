import React from 'react'

function Filter({filterButtons, sortButtons}) {
  return (
    <div className='flex items-center justify-between w-full border my-3 text-sm'>

        <div className='flex gap-3'>
    {filterButtons.map((item, idx) => (
     <button value={item}  key={idx} className='cursor-pointer rounded border p-2'>{item}</button>
    ))}
        
  
        </div>
        <div className='flex space-x-3'>
        {sortButtons.map((item, idx) => (
     <button key={idx} className='cursor-pointer rounded border p-2'>{item}</button>
    ))}
   
        </div>
    </div>
  )
}

export default Filter