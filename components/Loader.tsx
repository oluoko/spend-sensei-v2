'use client'

import React from 'react'

interface LoaderProps {
  text?: string
}

const Loader: React.FC<LoaderProps> = ({ text = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="relative w-full h-full">
        <p className="absolute inset-0 flex items-center justify-center text-white text-lg md:text-3xl font-semibold">
          {text}
        </p>
      </div>
    </div>
  )
}

export default Loader
