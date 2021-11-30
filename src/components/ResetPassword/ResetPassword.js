import Box from '../layout/Box/Box'
import classes from './ResetPassword.module.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Button from '../layout/Button/Button'
import FetchApi from '../../apis/FetchApi'
import { UserApi } from '../../apis/ListApis'
import { Alert } from 'antd'

const ResetPassword = props => {
  const [email, setEmail] = useState('')
  const [emailTouch, setEmailTouch] = useState(false)

  const [isNoti, setIsNoti] = useState()
  const [notiMess, setNotiMess] = useState()
  const [statusNoti, setStatusNoti] = useState()

  const isValidEmail = (email.trim().includes('@') || !emailTouch)
  console.log(isValidEmail)

  useEffect(() => {
    document.title = 'Reset password | To Do List'
  }, [])

  const handleChangeEmail = (event) => {
    setEmail(event.target.value)
  }

  const handleBlurEmail = () => {
    setEmailTouch(true)
  }

  const handleButtonClick = (event) => {
    event.preventDefault()

    const body = {
      email: email,
    }

    if (email.trim().includes('@')) {
      FetchApi(UserApi.resetPassword, 'POST', 'application/json', body, (status, data) => {
        if (status) {
          if (data.code === 8820003) {
            setStatusNoti('success')
            setNotiMess('Check your email to reset your password.')
            setIsNoti(true)
          }
        } else {
          if (data.code === 8840006) {
            setStatusNoti('warning')
            setNotiMess(`Can't find this email.`)
            setIsNoti(true)
          } else if (data.code === 8840007) {
            setStatusNoti('warning')
            setNotiMess(`There was an error sending the email.`)
            setIsNoti(true)
          }
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
        <h2>Forgot password</h2>
        <form onSubmit={handleButtonClick}>
          <input
            type="email"
            name="email"
            placeholder={'Enter your email'}
            onChange={handleChangeEmail}
            onBlur={handleBlurEmail}
            className={(!isValidEmail) ? `${classes.invalid} ${classes.input}` : `${classes.input}`}
          /><br/>
          {!isValidEmail && <p className={classes.invalidText}>Wrong email format.</p>}
          <p>We'll send you an email with a link to reset<br/> your account password.</p>
          <Button text={'Send email'} onButtonClick={handleButtonClick}/>

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

export default ResetPassword