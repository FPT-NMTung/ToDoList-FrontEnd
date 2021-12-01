import classes from './HomePage.module.css'
import Search from '../Search/Search'
import ProfileBar from '../ProfileBar/ProfileBar'
import { Redirect, Route, Switch } from 'react-router-dom'
import Setting from '../Setting/Setting'
import { useEffect, useState } from 'react'
import Box from '../layout/Box/Box'
import Home from '../Home/Home'
import FetchApi from '../../apis/FetchApi'
import { UserApi } from '../../apis/ListApis'
import Message from '../Message/Message'
import CreateGroup from '../CreateGroup/CreateGroup'
import MainGroup from '../MainGroup/MainGroup'
import SettingGroup from '../MainGroup/SettingGroup/SettingGroup'

const HomePage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [avatar, setAvatar] = useState('')

  useEffect(() => {
    const url = UserApi.getInformation + '/' + localStorage.getItem('idUsers')
    FetchApi(url, 'GET', 'application/json', undefined, (status, data) => {
      setName(data.name)
      setEmail(data.email)
      if (!data.avatar) {
        setAvatar('https://img.icons8.com/color/300/000000/circled-user-male-skin-type-3--v1.png')
      } else {
        setAvatar(data.avatar)
      }
    })
  })

  const handleAvatarChange = (data) => {
    setAvatar(data)
  }

  return (
    <Box>
      <div className={classes.main}>
        <div className={classes.header}>
          <Search/>
          <ProfileBar dataUser={{name: name, email: email, avatar: avatar}}/>
        </div>
        <div className={classes.body}>
          <div className={classes.mainContent}>
            <Switch>
              <Route exact path={'/group/create'} render={() => (<CreateGroup/>)}/>
              <Route exact path={'/group/:idGroups/setting'} component={SettingGroup}/>
              <Route exact path={'/group/:idGroups'} component={MainGroup}/>
              <Route exact path={'/setting'} render={() => (<Setting {...{name: name, email: email, avatar: avatar, onAvatarChange: handleAvatarChange}}/>)}/>
              <Route exact path={'/'} render={() => (<Home {...{name: name, email: email, avatar: avatar}}/>)}/>

              <Route path={'*'}>
                <Redirect to={'/404'}/>
              </Route>
            </Switch>
          </div>
          <div className={classes.message}>
            <Message/>
          </div>
        </div>
      </div>
    </Box>
  )
}

export default HomePage