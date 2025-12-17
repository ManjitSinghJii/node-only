import { useState } from 'react'
import { Form, Input, Button, message } from 'antd'
import { Lock, Mail } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onFinish = async (values) => {
    try {
      setLoading(true)
      const res = await axios.post('http://localhost:8080/api/auth/login', values)

      const { token, user } = res.data

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))

      message.success('Login successful')

      // 🔁 Role based redirect
      if (user.role === 'superadmin') {
        navigate('/superadmin/admins')
      } else if (user.role === 'admin') {
        navigate('/admin/labours')
      } else {
        message.error('Unauthorized role')
      }
    } catch (err) {
      message.error(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-black">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Email is required' }]}
          >
            <Input prefix={<Mail size={16} />} placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Password is required' }]}
          >
            <Input.Password prefix={<Lock size={16} />} placeholder="Enter password" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            size="large"
            className="mt-4"
          >
            Login
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default Login
