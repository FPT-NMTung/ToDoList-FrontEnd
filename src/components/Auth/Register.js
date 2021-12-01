import classes from './Register.module.css'
import Button from '../layout/Button/Button'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import FetchApi from '../../apis/FetchApi'
import { UserApi } from '../../apis/ListApis'
import { Alert } from 'antd'
import Box from '../layout/Box/Box'

const Register = props => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isNoti, setIsNoti] = useState(false)
  const [notiMess, setNotiMess] = useState('')
  const [statusNoti, setNotiStatus] = useState('')

  const [nameTouch, setNameTouch] = useState(false)
  const [emailTouch, setEmailTouch] = useState(false)
  const [passwordTouch, setPasswordTouch] = useState(false)

  const isValidName = (name.trim().length > 0 || !nameTouch)
  const isValidEmail = (email.trim().includes('@') || !emailTouch)
  const isValidPassword = (password.trim().length >= 8 || !passwordTouch)

  useEffect(() => {
    document.title = 'Register | To Do List'
  }, [])

  //<editor-fold desc="handle change input">
  const handleChangeName = (event) => {
    setName(event.target.value)
  }

  const handleChangeEmail = (event) => {
    setEmail(event.target.value)
  }

  const handleChangePassword = (event) => {
    setPassword(event.target.value)
  }
  //</editor-fold>

  //<editor-fold desc="handle blur input">
  const handleBlurName = () => {
    setNameTouch(true)
  }

  const handleBlurEmail = () => {
    setEmailTouch(true)
  }

  const handleBlurPassword = () => {
    setPasswordTouch(true)
  }
  //</editor-fold>

  const handleButtonClick = () => {

    const body = {
      name: name,
      email: email,
      password: password,
    }

    if (email.trim().includes('@') && password.trim().length >= 8 && name.trim().length > 0) {
      FetchApi(UserApi.create, 'PUT', 'application/json', body, (status, data) => {
        if (status) {
          if (data.code === 8820001) {
            setNotiStatus('success')
            setNotiMess('please check your email to active account')
            setIsNoti(true)
          }
        } else {
          if (data.code === 8840001) {
            setNotiStatus('warning')
            setNotiMess('Email is exist.')
            setIsNoti(true)
          } else if (data.code === 8840002) {
            setNotiStatus('warning')
            setNotiMess('Data is invalid.')
            setIsNoti(true)
          }
        }
      })
    }
  }

  const afterClose = () => {
    setIsNoti(false)
    setNotiMess('')
    setNotiStatus('')
  }

  return (
    <Box>
      <div className={classes.register}>
        <h2>Register Account</h2>
        <div>
          <input
            type="text"
            name="name"
            placeholder={'Enter your name'}
            onChange={handleChangeName}
            onBlur={handleBlurName}
            className={(!isValidName) ? `${classes.invalid} ${classes.input}` : `${classes.input}`}
          /><br/>
          {!isValidName && <p className={classes.invalidText}>Name must not empty.</p>}
          <input
            type="email"
            name="email"
            placeholder={'Enter your email'}
            onChange={handleChangeEmail}
            onBlur={handleBlurEmail}
            className={(!isValidEmail) ? `${classes.invalid} ${classes.input}` : `${classes.input}`}
          /><br/>
          {!isValidEmail && <p className={classes.invalidText}>Wrong email format.</p>}
          <input
            type="password"
            name="password"
            placeholder={'Enter your password'}
            onChange={handleChangePassword}
            onBlur={handleBlurPassword}
            className={(!isValidPassword) ? `${classes.invalid} ${classes.input}` : `${classes.input}`}
          />
          {!isValidPassword && <p className={classes.invalidText}>Password from 8 to 50 characters.</p>}
        </div>
        <Button text={'Register'} onButtonClick={handleButtonClick}/>

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
          afterClose={afterClose}
        />}
      </div>
    </Box>
  )
}
export default Register