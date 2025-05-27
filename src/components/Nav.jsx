import React from 'react'

const Nav = () => (
    <nav className="bg-gray-100 shadow mb-12 lg:mb-20">
       <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold">Logo</span>
          </div>
          
          <div className="flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600">Light Mode</a>
          </div>
        </div>
      </div>
    </nav>
)

export default Nav