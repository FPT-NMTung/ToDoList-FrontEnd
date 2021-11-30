import { Fragment, useEffect, useState } from 'react'
import classes from './Home.module.css'
import spinner from '../../images/Spinner.gif'
import { Link } from 'react-router-dom'
import FetchApi from '../../apis/FetchApi'
import { GroupApi } from '../../apis/ListApis'

const Home = props => {

  const [groups, setGroups] = useState([])
  const [isLoad, setIsLoad] = useState(true)

  useEffect(() => {
    FetchApi(GroupApi.getAllGroups, 'GET', 'application/json', undefined, (status, data) => {
      if (status) {
        setGroups(data.arrayResult)
        setIsLoad(false)
      }
    })

    document.title = 'Home | To Do List'
  }, [])

  return (
    <div className={classes.main}>
      <h2>
        List your group
      </h2>
      <div className={classes.list}>
        {!isLoad && groups.map((element, index) => (
          <Link key={index} to={`/group/${element.idGroups}`}>
            <div className={`${classes.element}`}>
              <div className={classes.name}>
                {/*eslint-disable-next-line*/}
                {localStorage.getItem('idUsers') == element.idUsersAdmin && <img src="https://img.icons8.com/fluency/18/000000/star.png"/>}
                <h3>{element.name}</h3>
              </div>
              <div className={classes.itemInformation}>
                <span className={classes.doneTask}>Done</span> <b>{element.done}</b>
              </div>
              <div className={classes.itemInformation}>
                <span className={classes.inProcessTask}>In process</span> <b>{element.inProcess}</b>
              </div>
              <div className={classes.itemInformation}>
                <span className={classes.pendingTask}>Pending</span> <b>{element.pending}</b>
              </div>
              <div className={classes.author}>
                <img src="https://img.icons8.com/windows/18/000000/landlord.png" alt={''}/> {element.nameAdmin}
              </div>
            </div>
          </Link>
        ))}
        {isLoad &&
        <div className={`${classes.element} ${classes.add}`}>
          <img height={40} src={spinner} alt="spinner"/>
        </div>
        }
        {!isLoad &&
        <Link to={'group/create'}>
          <div className={`${classes.element} ${classes.add}`}>
            <Fragment>&#x0002B;</Fragment>
          </div>
        </Link>
        }
      </div>
    </div>
  )
}

export default Home