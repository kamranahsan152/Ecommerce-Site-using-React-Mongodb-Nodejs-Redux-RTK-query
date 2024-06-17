import React, { useState } from "react";
import {
  useAllusersQuery,
  useDeleteUserMutation,
} from "../../../../redux/reducer";
import { IoMdAlert } from "react-icons/io";
import { User } from "../../../../types/user";
import toast from "react-hot-toast";

const Users: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data, isLoading, isSuccess, refetch } = useAllusersQuery("");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const filteredUsers: User[] =
    isSuccess &&
    data.filter((user: User) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const [deleteUser] = useDeleteUserMutation();
  const handleDeleteUser = async (id: any) => {
    try {
      const response = await deleteUser({ id }).unwrap();
      toast.success(response.msg);
      refetch();
    } catch (error: any) {
      toast.error(error.msg);
    }
  };

  return (
    <div className="overflow-x-auto m-2">
      <div className="flex mb-4 justify-between w-full">
        <input
          type="text"
          placeholder="Search users"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-200 font-sans">
          <tr>
            <th className="sticky left-0 bg-gray-200 z-10 w-2/12 px-4 py-2 text-left">
              Name
            </th>
            <th className="sticky left-24 bg-gray-200 z-10 w-2/12 px-4 py-2 text-left">
              Email
            </th>
            <th className="sticky left-48 bg-gray-200 z-10 w-2/12 px-4 py-2 text-left">
              Phone Number
            </th>
            <th className="w-2/12 px-4 py-2 text-left">Role</th>
            <th className="sticky right-0 bg-gray-200 z-10 w-1/12 px-4 py-2 text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition-colors`}
              >
                <td className="sticky left-0 z-10 w-2/12 px-4 py-2 whitespace-nowrap">
                  {user.name}
                </td>
                <td className="sticky left-24 z-10 w-2/12 px-4 py-2 whitespace-nowrap">
                  {user.email}
                </td>
                <td className="sticky left-48 z-10 w-2/12 px-4 py-2 whitespace-nowrap">
                  {user.phoneNumber}
                </td>
                <td className="w-2/12 px-4 py-2 whitespace-nowrap">
                  {user.role.toUpperCase()}
                </td>
                <td className="sticky right-0 z-10 w-1/12 px-4 py-2 whitespace-nowrap space-x-2">
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-sans py-1 px-4 rounded-xl"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="border px-4 py-4 text-center">
                <div className="flex justify-center items-center h-full">
                  <IoMdAlert size={30} className="text-blue-500 mr-2" /> No data
                  existed!
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
