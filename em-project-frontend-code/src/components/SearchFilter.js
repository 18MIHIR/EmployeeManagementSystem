import React, { useState } from 'react'
import EmployeeService from '../service/EmployeeService';

const SearchFilter = ({ onSearchResults }) => {
    const [searchKeyword, setSearchKeyword] = useState('')
    const [filterType, setFilterType] = useState('all')
    const [filterValue, setFilterValue] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSearch = async (e) => {
        e.preventDefault()
        setLoading(true)
        
        try {
            let response;
            if (searchKeyword) {
                response = await EmployeeService.searchEmployees(searchKeyword)
            } else if (filterType !== 'all' && filterValue) {
                if (filterType === 'name') {
                    response = await EmployeeService.filterByName(filterValue)
                } else if (filterType === 'email') {
                    response = await EmployeeService.filterByEmail(filterValue)
                } else if (filterType === 'phone') {
                    response = await EmployeeService.filterByPhone(filterValue)
                }
            } else {
                // If no search criteria, fetch all employees
                response = await EmployeeService.getEmployees()
            }
            
            onSearchResults(response.data)
        } catch (error) {
            console.log(error)
            alert('Error searching employees')
        } finally {
            setLoading(false)
        }
    }

    const handleReset = async () => {
        setSearchKeyword('')
        setFilterType('all')
        setFilterValue('')
        setLoading(true)
        
        try {
            const response = await EmployeeService.getEmployees()
            onSearchResults(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Search & Filter</h2>
            
            <form onSubmit={handleSearch} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Search by keyword */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Search (Name, Email, Phone)
                        </label>
                        <input
                            type="text"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            placeholder="Enter search keyword"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Filter by type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Filter By
                        </label>
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">All Employees</option>
                            <option value="name">Name</option>
                            <option value="email">Email</option>
                            <option value="phone">Phone</option>
                        </select>
                    </div>
                </div>

                {/* Filter value input (shows based on filter type) */}
                {filterType !== 'all' && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {filterType === 'name' && 'Employee Name'}
                            {filterType === 'email' && 'Email Address'}
                            {filterType === 'phone' && 'Phone Number'}
                        </label>
                        <input
                            type="text"
                            value={filterValue}
                            onChange={(e) => setFilterValue(e.target.value)}
                            placeholder={`Enter ${filterType}`}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                )}

                {/* Buttons */}
                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50"
                    >
                        {loading ? 'Searching...' : 'Search'}
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        disabled={loading}
                        className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50"
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SearchFilter
