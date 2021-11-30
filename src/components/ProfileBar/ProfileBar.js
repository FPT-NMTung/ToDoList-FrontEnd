import classes from './ProfileBar.module.css'
import { Dropdown, Menu } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import { HomeOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'

const ProfileBar = props => {

  const history = useHistory()

  const handleLogout = () => {
    localStorage.clear()
    history.push('/login')
  }

  const menu = (
    <Menu className={classes.menu}>
      <Menu.Item key="0">
        <Link to={'/profile'}>
        <div className={classes.information}>
          <h3>{props.dataUser.name}</h3>
          <span>{props.dataUser.email}</span>
        </div>
        </Link>
      </Menu.Item>
      <Menu.Divider/>
      <Menu.Item key="1">
        <Link to={'/'}>
          <span className={classes.icon}><HomeOutlined/></span>
          <span>Home</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to={'/profile'}>
          <span className={classes.icon}><UserOutlined/></span>
          <span>Profile</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to={'/setting'}>
          <span className={classes.icon}><SettingOutlined/></span>
          <span>Setting</span>
        </Link>
      </Menu.Item>
      <Menu.Divider/>
      <Menu.Item key="4">
        <span onClick={handleLogout}>
          <span className={classes.icon}><LogoutOutlined/></span>
          <span>Logout</span>
        </span>
      </Menu.Item>
    </Menu>
  )

  return (
    <div className={classes.profile}>
      <Dropdown overlay={menu} placement="bottomRight" trigger={['click']} arrow>
        <div className={classes.image}>
          <img src={props.dataUser.avatar} alt={''}/>
        </div>
      </Dropdown>
    </div>
  )
}

export default ProfileBar