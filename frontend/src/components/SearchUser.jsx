import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from './api';

const SearchUser = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults] = useState([]);
  const [searchType, setSearchType] = useState('username');

  const handleSearch = async () => {
    try {
      const response = await api.get(`/admin/search/results`, {
        params: { query: searchTerm }
      });
      // eslint-disable-next-line no-undef
      setUsers(response.data);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-800 to-indigo-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Search Users
          </h2>

          <div className="flex space-x-4 mb-6">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="username">Username</option>
              <option value="email">Email</option>
              <option value="name">Name</option>
              <option value="role">Role</option>
            </select>

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter search term..."
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />

            <button
              onClick={handleSearch}
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Search
            </button>
          </div>

          {searchResults.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Username
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {searchResults.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.username}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {`${user.firstName} ${user.lastName}`}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          to={`/admin/users/edit/${user.id}`}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          Edit
                        </Link>
                        <Link
                          to={`/admin/users/view/${user.id}`}
                          className="text-green-600 hover:text-green-900"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-4">
              No results found
            </div>
          )}

          <div className="mt-6 text-center">
            <Link
              to="/admin"
              className="text-indigo-600 hover:text-indigo-800"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchUser;
