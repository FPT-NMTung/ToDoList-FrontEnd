import Button from '../layout/Button/Button'
import { Link, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import FetchApi from '../../apis/FetchApi'
import { UserApi } from '../../apis/ListApis'
import { Alert } from 'antd'
import classes from './Register.module.css'
import classesLogin from './Login.module.css'
import Box from '../layout/Box/Box'

const Login = props => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isError, setIsError] = useState(false)
  const [errorMess, setErrorMess] = useState('')

  const [emailTouch, setEmailTouch] = useState(false)
  const [passwordTouch, setPasswordTouch] = useState(false)

  const isValidEmail = (email.trim().includes('@') || !emailTouch)
  const isValidPassword = (password.trim().length >= 8 || !passwordTouch)

  const history = useHistory()

  useEffect(() => {
    document.title = 'Login | To Do List'
  }, [])

  //<editor-fold desc="handle change input">
  const handleEmailInput = (event) => {
    setEmail(event.target.value)
  }

  const handlePassInput = (event) => {
    setPassword(event.target.value)
  }
  //</editor-fold>

  //<editor-fold desc="handle touch input">
  const touchEmailInput = () => {
    setEmailTouch(true)
  }

  const touchPasswordInput = () => {
    setPasswordTouch(true)
  }
  //</editor-fold>

  const handleButtonClick = (event) => {
    event.preventDefault()

    if (email.trim().includes('@') && password.trim().length >= 8) {

      const body = {
        email: email,
        password: password,
      }

      FetchApi(UserApi.login, 'POST', 'application/json', body, (status, data) => {
        if (!status) {
          if (data.code === 8840005) {
            setIsError(true)
            setErrorMess('Email or password does not exist or is not valid')
          } else if (data.code === 8840006) {
            setIsError(true)
            setErrorMess('Email or password is incorrect')
          } else if (data.code === 8840007) {
            setIsError(true)
            setErrorMess('Account is not active')
          }
        } else {
          localStorage.setItem('token', data.token)
          localStorage.setItem('name', data.name)
          localStorage.setItem('email', data.email)
          localStorage.setItem('idUsers', data.idUsers)

          history.push('/')
        }
      })
    }
  }

  const afterClose = () => {
    setIsError(false)
    setErrorMess('')
  }

  return (
    <Box>
      <div className={classesLogin.login}>
        <h2>Login Account</h2>
        <form className={classesLogin.form} onSubmit={handleButtonClick} method={'post'}>
          <input
            type="email"
            name="email"
            placeholder={'Enter your email'}
            onChange={handleEmailInput}
            onBlur={touchEmailInput}
            className={(!isValidEmail) ? `${classesLogin.invalid} ${classes.input}` : `${classes.input}`}
          /><br/>
          {!isValidEmail && <p className={classesLogin.invalidText}>Wrong email format.</p>}
          <input
            type="password"
            name="password"
            placeholder={'Enter your password'}
            onChange={handlePassInput}
            onBlur={touchPasswordInput}
            className={(!isValidPassword) ? `${classesLogin.invalid} ${classes.input}` : `${classes.input}`}
          /><br/>
          {!isValidPassword && <p className={classesLogin.invalidText}>Password from 8 to 50 characters.</p>}
          <div className={classesLogin.containButton}>
            <Button onButtonClick={handleButtonClick} text={'Login'}/>
          </div>
        </form>
        <hr/>
        <p>If you don't have an account, please <Link className={classes.link} to={'/register'}>register</Link></p>
        <p>You forgot password?, please <Link className={classes.link} to={'/reset-password'}>reset password</Link></p>
        {isError &&
        <Alert
          className={classes.alert}
          message="Warning"
          description={errorMess}
          type="warning"
          showIcon
          closable
          afterClose={afterClose}
        />}
      </div>
    </Box>
  )
}

export default Login