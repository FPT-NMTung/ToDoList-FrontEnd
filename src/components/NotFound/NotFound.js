import React, { useEffect, useState } from 'react'

import classes from './NotFound.module.css'
import Box from '../layout/Box/Box'
import { Link, useHistory } from 'react-router-dom'

const NotFound = props => {
  const [tick, setTick] = useState(15)
  const history = useHistory()

  useEffect(() => {
    document.title = '404 Not Found | To Do List'
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      const newTick = tick - 1;
      if (newTick < 0) {
        history.push('/')
      }

      setTick(tick - 1)
    }, 1000)

    return (() => {
      clearInterval(id)
    })
  }, [tick, history])

  return (
    <Box>
      <div className={classes.notFound}>
        <div className={classes.text}>
          <h1>404</h1>
        </div>
        <h2>Oops! Page Not Be Found</h2>
        <p>Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily
          unavailable</p>
        <br/>
        <p>Automation back home page after: <span style={{fontWeight: 'bold'}}>{tick}s</span></p>
        <div>
          <Link className={classes.link} to="/">Back to homepage</Link>
        </div>
      </div>
    </Box>
  )
}

export default NotFound
