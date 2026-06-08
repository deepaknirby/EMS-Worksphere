import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const About = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/signin')
    }

    return (
        <div className="min-h-screen bg-gray-100">

            <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
                <h1
                    onClick={() => navigate('/dashboard')}
                    className="text-xl font-bold text-blue-600 cursor-pointer"
                >
                    EMS WorkSphere
                </h1>
                <div className="flex items-center gap-4">
                    <span className="text-gray-600">
                        {user?.firstName} — {user?.role === "ROLE_ADMIN" ? "ADMIN" : "EMPLOYEE"}
                    </span>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="text-blue-600 hover:underline text-sm"
                    >
                        Dashboard
                    </button>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 text-sm"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <div className="max-w-3xl mx-auto p-8">

                <div className="bg-white rounded-xl shadow p-8 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        EMS WorkSphere
                    </h2>
                    <p className="text-gray-500 mb-6">
                        Employee Management System built with Spring Boot & React
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 rounded-lg p-4">
                            <h3 className="font-semibold text-blue-700 mb-2">Backend</h3>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>⚡ Spring Boot 3</li>
                                <li>🔐 Spring Security</li>
                                <li>🗄️ Spring Data JPA</li>
                                <li>📄 Swagger / OpenAPI</li>
                                <li>🛡️ Role Based Access</li>
                                <li>📦 MySQL Database</li>
                            </ul>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-4">
                            <h3 className="font-semibold text-purple-700 mb-2">Frontend</h3>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>⚛️ React 18</li>
                                <li>🎨 Tailwind CSS</li>
                                <li>🔀 React Router</li>
                                <li>📡 Axios</li>
                                <li>🔒 Protected Routes</li>
                                <li>🌐 Context API</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="bg-white rounded-xl shadow p-8 mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Features</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            '✅ JWT Basic Authentication',
                            '✅ Role Based Access Control',
                            '✅ Pagination & Sorting',
                            '✅ Employee CRUD Operations',
                            '✅ Promote Employee to Admin',
                            '✅ Exception Handling',
                            '✅ REST API with Swagger',
                            '✅ Responsive UI'
                        ].map((feature, index) => (
                            <div key={index} className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                                {feature}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow p-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">API Documentation</h3>
                    <p className="text-gray-500 mb-4">
                        Explore all available REST API endpoints via Swagger UI
                    </p>
                    
                    <a  href="http://localhost:8090/swagger-ui/index.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                    >
                        Open Swagger UI →
                    </a>
                </div>

            </div>
        </div>
    )
}

export default About