import { useNavigate } from 'react-router-dom'

const Unauthorized = () => {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow p-10 text-center max-w-md">
                <div className="text-6xl mb-4">🚫</div>
                <h1 className="text-3xl font-bold text-red-600 mb-2">403</h1>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Access Denied
                </h2>
                <p className="text-gray-500 mb-6">
                    You don't have permission to access this page.
                </p>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                    Go to Dashboard
                </button>
            </div>
        </div>
    )
}

export default Unauthorized