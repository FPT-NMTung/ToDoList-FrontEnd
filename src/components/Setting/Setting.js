import classes from './Setting.module.css'
import { Alert, Collapse, Popover } from 'antd'
import { CheckCircleTwoTone } from '@ant-design/icons'
import Button from '../layout/Button/Button'
import { useEffect, useState } from 'react'
import FetchApi from '../../apis/FetchApi'
import { UserApi } from '../../apis/ListApis'
import ChangeAvatar from '../ChangeAvatar/ChangeAvatar'

const {Panel} = Collapse

const Setting = props => {
  const [oddPass, setOddPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [renewPass, setRenewPass] = useState('')

  const [isNoti, setIsNoti] = useState(false)
  const [notiMess, setNotiMess] = useState('')
  const [statusNoti, setStatusNoti] = useState('')

  const oddPassVaild = oddPass.trim().length >= 8
  const newPassVaild = newPass.trim().length >= 8 && newPass.trim() !== oddPass.trim()
  const renewPassVaild = renewPass.trim().length >= 8 && newPass.trim() === renewPass.trim()

  useEffect(() => {
    document.title = 'Setting | To Do List'
  })

  const handleOddPassChange = (event) => {
    setOddPass(event.target.value)
  }
  const handleNewPassChange = (event) => {
    setNewPass(event.target.value)
  }
  const handleRenewPassChange = (event) => {
    setRenewPass(event.target.value)
  }

  const oddContent = (
    <ul>
      <li>Password from 8 to 50 characters.</li>
    </ul>
  )

  const newContent = (
    <ul>
      <li>Password from 8 to 50 characters.</li>
      <li>Does not match the old password.</li>
    </ul>
  )

  const renewContent = (
    <ul>
      <li>Password from 8 to 50 characters.</li>
      <li>Match the new password.</li>
    </ul>
  )

  const onCloseNoti = () => {
    setIsNoti(false)
    setNotiMess('')
    setStatusNoti('')
  }

  const handleChangePassword = (event) => {
    event.preventDefault()

    const body = {
      oddPassword: oddPass,
      newPassword: newPass,
    }

    FetchApi(UserApi.changePassword, 'PUT', 'application/json', body, (status, data) => {
      console.log(status, data)

      if (status) {
        setStatusNoti('success')
        setIsNoti(true)
        setNotiMess('Change password success.')
      } else {
        if (data.code === 8840008) {
          setStatusNoti('warning')
          setIsNoti(true)
          setNotiMess('Old password or new password does not exist or is not valid')
        } else if (data.code === 8840009) {
          setStatusNoti('warning')
          setIsNoti(true)
          setNotiMess('Old password and new password are the same')
        } else if (data.code === 8840010) {
          setStatusNoti('warning')
          setIsNoti(true)
          setNotiMess('User does not exist')
        } else if (data.code === 8840011) {
          setStatusNoti('warning')
          setIsNoti(true)
          setNotiMess('Old password is incorrect')
        }
      }
    })
  }

  return (
    <div className={classes.main}>
      <Collapse defaultActiveKey={['1']}>
        <Panel header="Information" key="1">
          <p>
            <span className={classes.titleInput}>Name:</span>
            <span>{localStorage.getItem('name')}</span>
          </p>
          <p>
            <span className={classes.titleInput}>Email:</span>
            <span>{localStorage.getItem('email')}</span>
          </p>
        </Panel>
        <Panel header="Avatar" key="2">
          <ChangeAvatar urlAvatar={props.avatar} onAvatarChange={props.onAvatarChange}/>
        </Panel>
        <Panel header="Change password" key="3">
          <form onSubmit={handleChangePassword}>
            <p>
              <span className={classes.titleInput}>Odd password:</span>
              <span><input className={classes.input} type="password" onChange={handleOddPassChange}/></span>
              <Popover placement="right" content={oddContent} title="Require">
                <CheckCircleTwoTone twoToneColor={oddPassVaild ? '#52c41a' : '#e82e20'}/>
              </Popover>
            </p>
            <p>
              <span className={classes.titleInput}>New password:</span>
              <span><input className={classes.input} type="password" onChange={handleNewPassChange}/></span>
              <Popover placement="right" content={newContent} title="Require">
                <CheckCircleTwoTone twoToneColor={newPassVaild ? '#52c41a' : '#e82e20'}/>
              </Popover>
            </p>
            <p>
              <span className={classes.titleInput}>Renew password:</span>
              <span><input className={classes.input} type="password" onChange={handleRenewPassChange}/></span>
              <Popover placement="right" content={renewContent} title="Require">
                <CheckCircleTwoTone twoToneColor={renewPassVaild ? '#52c41a' : '#e82e20'}/>
              </Popover>
            </p>
            <Button text={'Change password'}/>
            {isNoti &&
              <Alert
                className={classes.alert}
                message={statusNoti}
                description={notiMess}
                type={statusNoti}
                showIcon
                closable
                afterClose={onCloseNoti}
              />}
          </form>
        </Panel>
      </Collapse>
    </div>
  )
}

export default Setting