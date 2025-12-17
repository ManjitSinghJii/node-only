import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import MainLayout from './components/layout/MainLayout'
import SuperAdminAdminsList from './components/superadmin/SuperAdminAdminsList'
import AdminLaboursList from './components/admin/AdminLaboursList'

const App = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />

      {/* Super Admin Routes */}
      <Route
        path="/superadmin"
        element={
          <ProtectedRoute roles={['superadmin']}>
            <MainLayout role="superadmin" />
          </ProtectedRoute>
        }
      >
        <Route path="admins" element={<SuperAdminAdminsList />} />
      </Route>

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={['admin', 'superadmin']}>
            <MainLayout role="admin" />
          </ProtectedRoute>
        }
      >
        <Route path="labours" element={<AdminLaboursList />} />
      </Route>

      {/* Default Redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* 404 */}
      <Route
        path="*"
        element={
          <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
            <h1 className="text-2xl font-semibold">404 | Page Not Found</h1>
          </div>
        }
      />
    </Routes>
  )
}

export default App
