import Box from '../layout/Box/Box'
import { useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import FetchApi from '../../apis/FetchApi'
import { UserApi } from '../../apis/ListApis'
import classes from './ActiveAccount.module.css'
import Button from '../layout/Button/Button'
import { CheckCircleTwoTone } from '@ant-design/icons'
import { Alert } from 'antd'

const ActiveAccount = props => {
  const location = new URLSearchParams(useLocation().search)
  const history = useHistory()

  const [isValid, setIsValid] = useState(false)
  const [isActive, setIsActive] = useState(false)

  const [isError, setIsError] = useState(false)
  const [errorMess, setErrorMess] = useState('')

  useEffect(() => {
    document.title = 'Active account | To Do List'

    const token = location.get('token')

    const body = {
      token: token,
    }

    FetchApi(UserApi.checkTokenActiveAccount, 'POST', 'application/json', body, (status, data) => {

      console.log(data)

      if (status) {
        setIsValid(true)
      } else {
        history.push('/')
      }

    })
  })

  const handleButtonClick = () => {
    const token = location.get('token')

    const body = {
      token: token,
    }

    FetchApi(UserApi.activeAccount, 'PUT', 'application/json', body, (status, data) => {
      if (status) {
        setIsActive(true)
      } else {
        setIsError(true)
        setErrorMess('Active account failed.')
      }
    })
  }

  const handleCloseError = () => {
    setIsError(false)
    setErrorMess('')
  }

  return (
    <Box>
      <div className={classes.main}>
        <h2>Active Account</h2>
        <p className={classes.content}>Please click click button below to active your account.</p>

        {!isActive && !isValid && <p>Checking ...</p>}
        {!isActive && isValid && <Button text={'Active'} onButtonClick={handleButtonClick}/>}
        {isActive && isValid &&
        <div>
          <h3 className={classes.title}><CheckCircleTwoTone/> Verify success</h3>
          <p>click this link for back to login page, <Link to={'/login'}>Click here</Link></p>
        </div>
        }
      </div>
      {isError &&
      <Alert
        className={classes.alert}
        message="Warning"
        description={errorMess}
        type="warning"
        showIcon
        closable
        afterClose={handleCloseError}
      />}
    </Box>
  )
}

export default ActiveAccount