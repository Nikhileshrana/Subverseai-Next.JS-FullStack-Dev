// src/components/Loader.tsx
import React, { useState } from 'react';

export default function loading()
{
  return (
    <div className="h-screen w-screen text-center fixed top-0 left-0 z-[9999999] bg-black">
            <div className="animate-spin rounded-full fixed z-[9999999] top-[40vh] sm:left-[45vw] left-[38vw]  h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )
}