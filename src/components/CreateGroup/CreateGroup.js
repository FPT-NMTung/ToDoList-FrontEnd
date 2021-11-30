import { Link, useHistory } from 'react-router-dom'
import classes from './CreateGroup.module.css'
import Button from '../layout/Button/Button'
import { useState } from 'react'
import FetchApi from '../../apis/FetchApi'
import { GroupApi } from '../../apis/ListApis'

const CreateGroup = props => {
  const [name, setName] = useState('')

  const history = useHistory()

  const isValidName = name.trim().length > 0

  const handleInputChange = (event) => {
    setName(event.target.value)
  }

  const handleSubmitForm = (event) => {
    event.preventDefault()

    const body = {
      name: name.trim()
    }

    FetchApi(GroupApi.create, 'PUT', 'application/json', body, (status, data) => {
      if (status) {
        history.push(`/group/${data.idGroups}`)
      }
    })
  }

  return (
    <div className={classes.main}>
      <div>
        <Link className={classes.link} to={'/'}>
          &#x0003C; Back
        </Link>
      </div>
      <div className={classes.mainForm}>
        <form onSubmit={handleSubmitForm}>
          <label for="name">Name:</label>
          <input className={classes.input} type="text" id={'name'} onChange={handleInputChange}/><br/>
          {isValidName && <Button text={'Create'}/>}
        </form>
      </div>
    </div>
  )
}

export default CreateGroup