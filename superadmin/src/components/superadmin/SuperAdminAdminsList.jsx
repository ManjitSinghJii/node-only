import { useEffect, useState } from 'react'
import { Table, Button, Modal, Form, Input, message } from 'antd'
import axios from 'axios'

const SuperAdminAdminsList = () => {
  const [admins, setAdmins] = useState([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const token = localStorage.getItem('token')

  const fetchAdmins = async () => {
    try {
      setLoading(true)
      const res = await axios.get('http://localhost:8080/api/admins', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setAdmins(res.data)
    } catch (err) {
      message.error('Failed to load admins')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAdmins()
  }, [])

  const onCreate = async (values) => {
    try {
      console.log("azazaz")
      await axios.post('http://localhost:8080/api/admins', values, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log("azazaz")
      message.success('Admin created')
      setOpen(false)
      fetchAdmins()
    } catch (err) {
      message.error('Failed to create admin')
    }
  }

  const columns = [
    { title: 'Email', dataIndex: 'email' },
    { title: 'Role', dataIndex: 'role' }
  ]

  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Admins</h2>
        <Button type="primary" onClick={() => setOpen(true)}>
          Create Admin
        </Button>
      </div>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={admins}
        loading={loading}
      />

      <Modal
        title="Create Admin"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={onCreate}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input placeholder="Enter admin name" />
          </Form.Item>

          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input placeholder="Enter admin email" />
          </Form.Item>

          <Form.Item name="password" label="Password" rules={[{ required: true }]}>
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Create
          </Button>
        </Form>

      </Modal>
    </div>
  )
}

export default SuperAdminAdminsList
