import React from 'react'

function Comment(props) {
    const {com, indexCom, comments} = props
  return (
    <div className='w-[90%] bg-gray-500/55 flex flex-col justify-center items-center rounded-xl'>
        <div className='w-full px-3 text-center text-md font-semibold'>
            <p>{com.name}</p>
        </div>
        <div className='w-full px-3 text-start text-sm'>
            <p>{com.comment}</p>
        </div>
        <div className='w-full px-3 text-[10px] text-end'>
            <p>{com.created}</p>
        </div>
    </div>
  )
}

export default Comment