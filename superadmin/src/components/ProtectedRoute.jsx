import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, roles }) => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))

  if (!token || !user) {
    return <Navigate to="/login" replace />
  }

  if (roles && !roles.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <h1 className="text-2xl font-semibold">Access Denied</h1>
      </div>
    )
  }

  return children
}

export default ProtectedRoute
