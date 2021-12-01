import { useEffect, useState } from 'react'
import FetchApi from '../../../apis/FetchApi'
import { GroupApi } from '../../../apis/ListApis'
import { Link, useHistory } from 'react-router-dom'
import classes from './SettingGroup.module.css'
import { HomeOutlined, LeftCircleOutlined, TeamOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import GeneralSetting from './GeneralSetting/GeneralSetting'
import MemberSetting from './MemberSetting/MemberSetting'

const SettingGroup = (props) => {
  const history = useHistory()
  const [activeKey, setActiveKey] = useState('1')

  useEffect(() => {
    const idGroups = props.match.params.idGroups

    FetchApi(GroupApi.getInfo + '/' + idGroups, 'GET', 'application/json', undefined, (status, data) => {
      if (!status) {
        history.push('/')
      }
    })
    // eslint-disable-next-line
  }, [])

  const handleClickMenu = ({ key }) => {
    setActiveKey(key)
  }

  const elementGroup = () => {
    switch (activeKey) {
      case '1':
        return <GeneralSetting {...props}/>
      case '2':
        return <MemberSetting {...props}/>
      default:
        return <GeneralSetting {...props}/>
    }
  }

  return (
    <div className={classes.body}>
      <div className={classes.tabMenu}>
        <div className={classes.tabMenuLeft}>
          <Link className={classes.tabMenuElement} to={`/group/${props.match.params.idGroups}`}>
            <LeftCircleOutlined style={{fontSize: 20}}/> <b className={classes.tabMenuContent}>Back to group</b>
          </Link>
        </div>
        <div className={classes.tabMenuRight}/>
      </div>
      <div className={classes.main}>
        <Menu
          mode={'vertical'}
          defaultSelectedKeys={['1']}
          style={{height: '100%'}}
          onClick={handleClickMenu}
        >
          <Menu.Item key="1" icon={<HomeOutlined/>}>
            General
          </Menu.Item>
          <Menu.Item key="2" icon={<TeamOutlined/>}>
            Member
          </Menu.Item>
        </Menu>
        <div className={classes.content}>
          {elementGroup()}
        </div>
      </div>
    </div>
  )
}

export default SettingGroup