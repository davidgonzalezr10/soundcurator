import React from 'react'

const Nav = () => (
    <nav className="bg-gray-100 shadow mb-12 lg:mb-20">
       <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between lg:justify-center lg:space-x-18 items-center h-16 lg:h-24">
          <div className="flex items-start">
            <img 
              src="/SoundCurator-Logo.svg"
              alt="SoundCurator Logo"
              className="h-8 lg:h-15 w-auto" 
            />
          </div>
          
          <div className="flex space-x-8 lg:space-x-16 justify-center">
            <a href="#" className="text-gray-700 lg:text-lg hover:text-blue-600 max-md:hidden">Home</a>
            <a href="#" className="text-gray-700 lg:text-lg hover:text-blue-600 max-md:hidden">About</a>
            <button className="text-gray-700 lg:text-lg hover:text-blue-600">Light Mode</button>
          </div>
        </div>
      </div>
    </nav>
)

export default Nav