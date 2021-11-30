import './Login.scss'
import Button from '../layout/Button/Button'
import { Link, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import FetchApi from '../../apis/FetchApi'
import { UserApi } from '../../apis/ListApis'
import { Alert } from 'antd'
import classes from './Register.module.css'
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
          if (data.code === 8840003) {
            setIsError(true)
            setErrorMess('The email address or password is incorrect.')
          } else if (data.code === 8840010) {
            setIsError(true)
            setErrorMess('You need active your account first.')
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
      <div className={'login'}>
        <h2>Login Account</h2>
        <form className={'form'} onSubmit={handleButtonClick} method={'post'}>
          <input
            type="email"
            name="email"
            placeholder={'Enter your email'}
            onChange={handleEmailInput}
            onBlur={touchEmailInput}
            className={(!isValidEmail) ? 'invalid' : ''}
          /><br/>
          {!isValidEmail && <p className={'invalidText'}>Wrong email format.</p>}
          <input
            type="password"
            name="password"
            placeholder={'Enter your password'}
            onChange={handlePassInput}
            onBlur={touchPasswordInput}
            className={(!isValidPassword) ? 'invalid' : ''}
          /><br/>
          {!isValidPassword && <p className={'invalidText'}>Password from 8 to 50 characters.</p>}
          <div className={'contain-button'}>
            <Button onButtonClick={handleButtonClick} text={'Login'}/>
          </div>
        </form>
        <hr/>
        <p>If you don't have an account, please <Link to={'/register'}>register</Link></p>
        <p>You forgot password?, please <Link to={'/reset-password'}>reset password</Link></p>
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