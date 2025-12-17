import { Layout, Menu } from 'antd'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Users, UserCog, LogOut } from 'lucide-react'

const { Sider, Header, Content } = Layout

const MainLayout = ({ role }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const logout = () => {
    localStorage.clear()
    navigate('/login')
  }

  const menuItems = {
    superadmin: [
      {
        key: '/superadmin/admins',
        icon: <UserCog size={18} />,
        label: 'Admins',
        onClick: () => navigate('/superadmin/admins')
      }
    ],
    admin: [
      {
        key: '/admin/labours',
        icon: <Users size={18} />,
        label: 'Labours',
        onClick: () => navigate('/admin/labours')
      }
    ]
  }

  return (
    <Layout className="min-h-screen">
      <Sider width={240} className="bg-slate-900 text-white">
        <div className="h-16 flex items-center justify-center text-xl font-bold text-white border-b border-slate-700">
          Labour System
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems[role]}
          className="bg-slate-900"
        />
      </Sider>

      <Layout>
        <Header className="bg-white flex justify-between items-center px-6 shadow">
          <div className="capitalize font-semibold">{role} dashboard</div>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-red-600 font-medium"
          >
            <LogOut size={18} /> Logout
          </button>
        </Header>

        <Content className="p-6 bg-slate-100 min-h-[calc(100vh-64px)]">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
