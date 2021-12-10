import { Avatar, Button, Divider, Dropdown, Form, Input, List, Menu } from 'antd'
import FetchApi from '../../../../apis/FetchApi'
import { GroupApi, UserApi } from '../../../../apis/ListApis'
import { useEffect, useState } from 'react'
import classes from './MemberSetting.module.css'
import optionImg from '../../../../images/dot-option.png'

const MemberSetting = props => {
  const idGroups = props.match.params.idGroups
  const [listMember, setListMember] = useState([])
  const [isOwner, setIsOwner] = useState(false)

  const handleDeleteMember = (idUsers) => {
    FetchApi(GroupApi.deleteMember, 'DELETE', 'application/json', {
      idGroups: idGroups,
      idUsersMember: idUsers
    }, (status) => {
      if (status) {
        FetchApi(GroupApi.getAllMember + '/' + idGroups, 'GET', 'application/json', undefined, (status, data) => {
          if (status) {
            setListMember(data.data)
          }
        })
      }
    })
  }

  const overlay = (data) => (
    <Menu>
      <Menu.Item key="0">
        <div onClick={() => handleDeleteMember(data.idUsers)}>Delete</div>
      </Menu.Item>
    </Menu>
  )

  const data = listMember.map((value) => {
    return (
      <div className={classes.itemList}>
        <div className={classes.member}>
          <Avatar src={value.avatar}>K</Avatar>
          <p className={classes.name}>{value.name}<i>{(value.isAdmin) ? ' (Admin)' : ''}</i></p>
        </div>

        {isOwner && value.isAdmin === 0 && <div className={classes.option}>
          <Dropdown overlay={overlay(value)} placement="bottomRight" trigger={['click']} arrow>
            <img width={18} height={18} src={optionImg} alt="option"/>
          </Dropdown>
        </div>}
      </div>
    )
  })

  useEffect(() => {
    FetchApi(GroupApi.checkOwnerGroups + '/' + idGroups, 'GET', 'application/json', undefined, (status, data) => {
      if (status) {
        setIsOwner(true)
      }
    })

    FetchApi(GroupApi.getAllMember + '/' + idGroups, 'GET', 'application/json', undefined, (status, data) => {
      if (status) {
        setListMember(data.data)
      }
    })
  }, [idGroups])

  const handleOk = (data) => {
    FetchApi(GroupApi.addMember, 'PUT', {
      email: data.emailMember,
    }, (status, data) => {
      if (status) {
        FetchApi(GroupApi.getAllMember + '/' + props.match.params.idGroups, 'GET', null, (status, data) => {
          if (status) {
            console.log(data.data)
          }
        })
      }
    })
  }

  return (
    <div>
      {isOwner && <div>
        <Divider orientation="left">Add members</Divider>
        <Form onFinish={handleOk} name={'add-member-form'} layout={'inline'}>
          <Form.Item
            name="emailMember"
            rules={[{required: true}]}
          >
            <Input
              placeholder="Email members"
              style={{borderRadius: '10em', paddingRight: 14, paddingLeft: 14}}
              type={'email'}
            />
          </Form.Item>
          <Form.Item>
            <Button form={'add-member-form'} key="submit" htmlType="submit" style={{
              backgroundColor: '#884CB2',
              outline: 'none',
              borderWidth: 0,
              borderRadius: 6,
              color: 'white',
              padding: '0 18px',
            }}>Add</Button>
          </Form.Item>
        </Form>
      </div>}
      <div>
        <Divider orientation="left">List members</Divider>
        <List
          size="small"
          bordered
          dataSource={data}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
      </div>
    </div>
  )
}

export default MemberSetting