import classes from './ResetPasswordForm.module.css'
import Box from '../layout/Box/Box'
import { useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import FetchApi from '../../apis/FetchApi'
import { UserApi } from '../../apis/ListApis'
import Button from '../layout/Button/Button'
import { Alert } from 'antd'

const ResetPasswordForm = props => {
  const [pass, setPass] = useState('')
  const [repass, setRepass] = useState('')

  const [passTouch, setPassTouch] = useState(false)
  const [repassTouch, setRepassTouch] = useState(false)

  const [isNoti, setIsNoti] = useState(false)
  const [notiMess, setNotiMess] = useState('')
  const [statusNoti, setStatusNoti] = useState('')

  const passIsVaild = (pass.trim().length >= 8 || !passTouch)
  const repassIsVaild = ((repass.trim().length >= 8 && pass.trim() === repass.trim()) || !repassTouch)

  const location = new URLSearchParams(useLocation().search)
  const history = useHistory()

  useEffect(() => {
    const temp = location.get('token')

    if (!temp || temp.length !== 64) {
      history.push('/reset-password')
      return
    }

    const body = {
      id: temp.slice(0, 32),
      token: temp.slice(32),
    }

    FetchApi(UserApi.checkTokenResetPassword, 'POST', 'application/json', body, (status, data) => {
      if (!status) {
        history.push('/reset-password')
      }
    })
  })

  const handleChangeEmail = (event) => {
    setPass(event.target.value.trim())
  }

  const handleBlurEmail = () => {
    setPassTouch(true)
  }

  const handleChangeReEmail = (event) => {
    setRepass(event.target.value.trim())
  }

  const handleBlurReEmail = () => {
    setRepassTouch(true)
  }

  const handleButtonClick = (event) => {
    event.preventDefault()

    const body = {
      token: location.get('token'),
      password: pass,
    }

    if (pass.trim().length >= 8 && (repass.trim().length >= 8 && pass.trim() === repass.trim())) {
      FetchApi(UserApi.changePasswordByReset, 'PUT', 'application/json', body, (status, data) => {
        if (status) {
          history.push('/login')
        } else if (data.code === 8840018) {
          setStatusNoti('warning')
          setNotiMess('Token and password does not exist or is not valid')
          setIsNoti(true)
        } else if (data.code === 8840019) {
          setStatusNoti('warning')
          setNotiMess('User does not exist')
          setIsNoti(true)
        }
      })
    }
  }

  const handleCloseNoti = () => {
    setIsNoti(false)
    setStatusNoti('')
    setNotiMess(``)
  }

  return (
    <Box>
      <div className={classes.main}>
        <h2>Change password</h2>
        <form onSubmit={handleButtonClick}>
          <input
            type="password"
            name="password"
            placeholder={'Enter new password'}
            onChange={handleChangeEmail}
            onBlur={handleBlurEmail}
            className={(!passIsVaild) ? `${classes.invalid} ${classes.input}` : `${classes.input}`}
          /><br/>
          {!passIsVaild && <p className={classes.invalidText}>Password from 8 to 50 characters.</p>}
          <input
            type="password"
            name="rePassword"
            placeholder={'Repeat new password'}
            onChange={handleChangeReEmail}
            onBlur={handleBlurReEmail}
            className={(!repassIsVaild) ? `${classes.invalid} ${classes.input}` : `${classes.input}`}
          /><br/>
          {!repassIsVaild && <p className={classes.invalidText}>Password from 8 to 50 characters.</p>}
          <Button text={'Change password'} onButtonClick={handleButtonClick}/>

          <hr className={classes.hr}/>

          <p>I already have a membership, please <Link className={classes.link} to={'/login'}>Login</Link></p>

          {isNoti &&
            <Alert
              className={classes.alert}
              message={statusNoti}
              description={notiMess}
              type={statusNoti}
              showIcon
              closable
              afterClose={handleCloseNoti}
            />}
        </form>
      </div>
    </Box>
  )
}

export default ResetPasswordForm