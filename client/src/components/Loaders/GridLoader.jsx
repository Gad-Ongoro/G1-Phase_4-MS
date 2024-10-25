import React from 'react';
import { grid } from 'ldrs'

grid.register()

const GridLoader = () => {
  return (
    <div className='grid text-center justify-center items-center'>
      <l-grid
        size="200"
        speed="1.5" 
        color="blue" 
      ></l-grid>
    </div>
  )
}

export default GridLoader;
