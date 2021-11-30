import { Route, Switch } from 'react-router-dom'
import NonTokenRouter from './router/NonTokenRoute'
import TokenRoute from './router/TokenRoute'
import NotFound from './components/NotFound/NotFound'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import HomePage from './components/HomePage/HomePage'
import ResetPassword from './components/ResetPassword/ResetPassword'
import ResetPasswordForm from './components/ResetPassword/ResetPasswordForm'
import ActiveAccount from './components/ActiveAccount/ActiveAccount'
import 'antd/dist/antd.css'
import './App.css'

function App() {
  return (
    <div className="app">
      <Switch>

        <NonTokenRouter exact path={'/login'} component={Login}/>
        <NonTokenRouter exact path={'/register'} component={Register}/>
        <NonTokenRouter exact path={'/reset-password'} component={ResetPassword}/>
        <NonTokenRouter exact path={'/reset-password/reset'} component={ResetPasswordForm}/>
        <NonTokenRouter exact path={'/active-account'} component={ActiveAccount}/>

        <Route exact path={'/404'} component={NotFound}/>

        <TokenRoute path={'/'} component={HomePage}/>

        <Route path={'*'} component={NotFound}/>

      </Switch>
    </div>
  )
}

export default App
