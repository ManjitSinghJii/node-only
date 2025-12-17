import { useEffect, useState } from 'react'
import { Table, Button, Modal, Form, Input, message } from 'antd'
import axios from 'axios'

const AdminLaboursList = () => {
  const [labours, setLabours] = useState([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const token = localStorage.getItem('token')

  const fetchLabours = async () => {
    try {
      setLoading(true)
      const res = await axios.get('http://localhost:8080/api/labours', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setLabours(res.data)
    } catch (err) {
      message.error('Failed to load labours')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLabours()
  }, [])

  const onCreate = async (values) => {
    try {
      await axios.post('http://localhost:8080/api/labours', values, {
        headers: { Authorization: `Bearer ${token}` }
      })
      message.success('Labour created')
      setOpen(false)
      fetchLabours()
    } catch (err) {
      message.error('Failed to create labour')
    }
  }

  const columns = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Role', dataIndex: 'role' }
  ]

  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Labours</h2>
        <Button type="primary" onClick={() => setOpen(true)}>
          Create Labour
        </Button>
      </div>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={labours}
        loading={loading}
      />

      <Modal
        title="Create Labour"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={onCreate}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="password" label="Password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Create
          </Button>
        </Form>
      </Modal>
    </div>
  )
}

export default AdminLaboursList
