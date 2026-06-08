import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getAllEmployees } from '../api/employeeApi'
import EmployeeTable from '../components/EmployeeTable'
import EmployeeForm from '../components/EmployeeForm'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const { api, user, logout } = useAuth();
    const navigate = useNavigate();

    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [size] = useState(10);

    const [showForm, setShowForm] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const fetchEmployees = async () => {
        setLoading(true);

        try {
            const response = await getAllEmployees(api, page, size);
            setEmployees(response.data.content);
            setTotalPages(response.data.totalPages);
        }
        catch (error) {
            setError("Failed to fetch Employees");
        }
        finally {
            setLoading(false)
        }
    }

    const handleAdd = () => {
        setSelectedEmployee(null);
        setShowForm(true);
    }

    const handleEdit = (employee) => {
        setSelectedEmployee(employee);
        setShowForm(true);
    }

    const handleFormClose = () => {
        setSelectedEmployee(null);
        setShowForm(false);
        fetchEmployees()
    }

    const handleLogout = () => {
        logout();
        navigate('/signin');
    }

    useEffect(() => {
        if (!api) return
        fetchEmployees()
    }, [api, page])

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-blue-600">EMS WorkSphere</h1>
                <div className="flex items-center gap-4">
                    <span className="text-gray-600">
                        {user?.firstName} — {user?.role === "ROLE_ADMIN" ? "ADMIN" : "EMPLOYEE"}
                    </span>
                    <button
                        onClick={() => navigate('/about')}
                        className="text-blue-600 hover:underline text-sm"
                    >
                        About
                    </button>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 text-sm"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Employee Management
                    </h2>
                    {user?.role === 'ROLE_ADMIN' && (
                        <button
                            onClick={handleAdd}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                            + Add Employee
                        </button>
                    )}
                </div>
                {error && (
                    <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}
                {loading ? (
                    <div className="text-center py-10 text-gray-500">Loading...</div>
                ) : (
                    <EmployeeTable
                        employees={employees}
                        onEdit={handleEdit}
                        onRefresh={fetchEmployees}
                    />
                )}

                <div className="flex justify-center items-center gap-4 mt-6">
                    <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 0}
                        className="px-4 py-2 bg-white border rounded-lg disabled:opacity-50 hover:bg-gray-50"
                    >
                        ← Prev
                    </button>
                    <span className="text-gray-600">
                        Page {page + 1} of {totalPages}
                    </span>
                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={page + 1 >= totalPages}
                        className="px-4 py-2 bg-white border rounded-lg disabled:opacity-50 hover:bg-gray-50"
                    >
                        Next →
                    </button>
                </div>

            </div>
            {showForm && (
                <EmployeeForm
                    employee={selectedEmployee}
                    onClose={handleFormClose}
                />
            )}

        </div>
    )
}

export default Dashboard