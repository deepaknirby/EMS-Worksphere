import React from 'react'
import { deleteEmployee, promoteEmployee } from '../api/employeeApi';
import { useAuth } from '../context/AuthContext'
import { useState } from 'react';

const EmployeeTable = ({employees,onEdit,onRefresh}) => {
    const { api,user } = useAuth();
    const [error,setError] = useState('');

    const handleDelete = async (id) => {
        if(!window.confirm("Are you sure want to delete the employee ?")) return;
        try {
            await deleteEmployee(api,id);
            onRefresh();
        }catch(error) {
            setError("Failed to delete Employee");
        }
    }

    const handlePromote = async(id) => {
        if(!window.confirm("Are your sure want to promote the employee to admin ?")) return;
        try{
            await promoteEmployee(api,id);
            onRefresh();
        }catch(error) {
            setError("Failed to promote employee");
        }
    }
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

            {error && (
                <div className="bg-red-100 text-red-600 px-4 py-3 text-sm">
                    {error}
                </div>
            )}

            <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                    <tr>
                        <th className="px-6 py-3">ID</th>
                        <th className="px-6 py-3">First Name</th>
                        <th className="px-6 py-3">Last Name</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Role</th>
                        {user?.role === 'ROLE_ADMIN' && (
                            <th className="px-6 py-3">Actions</th>
                        )}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {employees.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center py-6 text-gray-400">
                                No employees found
                            </td>
                        </tr>
                    ) : (
                        employees.map(employee => (
                            <tr key={employee.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">{employee.id}</td>
                                <td className="px-6 py-4">{employee.firstName}</td>
                                <td className="px-6 py-4">{employee.lastName}</td>
                                <td className="px-6 py-4">{employee.email}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                                        ${employee.role === 'ROLE_ADMIN'
                                            ? 'bg-purple-100 text-purple-700'
                                            : 'bg-green-100 text-green-700'
                                        }`}>
                                        {employee.role === 'ROLE_ADMIN' ? 'Admin' : 'Employee'}
                                    </span>
                                </td>
                                {user?.role === 'ROLE_ADMIN' && (
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">

                                            <button
                                                onClick={() => onEdit(employee)}
                                                className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-200 text-xs"
                                            >
                                                Edit
                                            </button>

                                            {employee.role !== 'ROLE_ADMIN' && (
                                                <button
                                                    onClick={() => handlePromote(employee.id)}
                                                    className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-lg hover:bg-yellow-200 text-xs"
                                                >
                                                    Promote
                                                </button>
                                            )}

                                            <button
                                                onClick={() => handleDelete(employee.id)}
                                                className="bg-red-100 text-red-600 px-3 py-1 rounded-lg hover:bg-red-200 text-xs"
                                            >
                                                Delete
                                            </button>

                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
  )
}

export default EmployeeTable