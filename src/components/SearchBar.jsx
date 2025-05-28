import React from 'react'

const SearchBar = () => {
    return (
        <section className="mt-6 mb-5 lg:mb-10">
            <form className="mx-6 lg:mx-auto lg:max-w-[800px]">
                <div className="flex flex-col">
                    <select 
                        className="bg-mid-grey text-white text-sm font-light lg:text-lg ml-4 lg:ml-6 pt-1 pb-1.5 pl-3 pr-8 hover:cursor-pointer w-fit self-start rounded-t-lg appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-[right_0.5rem_center] bg-no-repeat"
                    >
                        <option value="songs">Songs</option>
                        <option value="artists">Artists</option>
                        <option value="genres">Genres</option>
                    </select>
                    <div className="lg:text-base bg-gray-100 py-4 px-4 lg:px-6 lg:py-6 flex gap-3 rounded-lg shadow">
                        <input 
                            type="text"
                            placeholder="Find songs" 
                            className="text-gray-600 font-light lg:text-lg flex-1 border border-gray-500 py-1.5 px-3 rounded-lg bg-white"
                        />
                        <button 
                            type="submit"
                            className="text-white font-bold lg:text-lg border bg-spoti-green border-spoti-green rounded-lg hover:cursor-pointer px-4"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </form>
        </section>
    )
}

export default SearchBar