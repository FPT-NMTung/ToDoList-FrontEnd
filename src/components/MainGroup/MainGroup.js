import { useEffect, useState } from 'react'
import FetchApi from '../../apis/FetchApi'
import classes from './MainGroup.module.css'
import loadingGif from '../../images/Spinner.gif'
import { GroupApi, TaskApi } from '../../apis/ListApis'
import { Link, useHistory } from 'react-router-dom'
import io from 'socket.io-client'
import Button from '../layout/Button/Button'
import Tasks from './Tasks/Tasks'
import CreateTask from './CreateTask/CreateTask'
import { LeftCircleOutlined, SettingOutlined } from '@ant-design/icons'

const MainGroup = props => {
  const [isLoading, setIsLoading] = useState(true)
  const [numberTask, setNumberTask] = useState(0)
  const [isShowAddTask, setIsShowAddTask] = useState(false)
  const [listTasks, setListTasks] = useState([])
  const history = useHistory()

  useEffect(() => {
    document.title = 'Group | To Do List'
  }, [])

  useEffect(() => {
    const socket = io('localhost:8080')

    console.log(socket)
  }, [])

  useEffect(() => {
    fetchListTasks()
    // eslint-disable-next-line
  }, [])

  const fetchListTasks = () => {
    const idGroups = props.match.params.idGroups

    FetchApi(GroupApi.getInfo + '/' + idGroups, 'GET', 'application/json', undefined, (status, data) => {
      if (status) {
        FetchApi(GroupApi.checkOwnerGroups + '/' + idGroups, 'GET', 'application/json', undefined, (status) => {
          if (status) {
            FetchApi(TaskApi.getAllTasksForAdmin + '/' + idGroups, 'GET', 'application/json', undefined, (status, data) => {
              if (status) {
                setListTasks(data.data)
                setIsLoading(false)

                setNumberTask(data.data.filter((e) => !e.isCompleted).length)
              } else {
                //show alert error
                alert('error get data tasks')
              }
            })
          } else {
            FetchApi(TaskApi.getAllTasks + '/' + idGroups, 'GET', 'application/json', undefined, (status, data) => {
              if (status) {
                setListTasks(data.data)
                setIsLoading(false)

                setNumberTask(data.data.filter((e) => !e.isCompleted).length)
              } else {
                //show alert error
                alert('error get data tasks')
              }
            })
          }
        })
      } else {
        history.push('/')
      }
    })
  }

  const handleClickAddNewTask = () => {
    setIsShowAddTask(true)
  }

  const handleExitAddNewTask = () => {
    setIsShowAddTask(false)
  }

  if (isLoading) {
    return (
      <div className={classes.loading}><img height={50} src={loadingGif} alt="loading"/></div>
    )
  } else {
    return (
      <div className={classes.main}>
        <div className={classes.tabMenu}>
          <div className={classes.tabMenuLeft}>
            <Link className={classes.tabMenuElement} to={'/'}>
              <LeftCircleOutlined style={{fontSize: 20}}/> <b className={classes.tabMenuContent}>Back to home</b>
            </Link>
          </div>
          <div className={classes.tabMenuRight}>
            <Link className={classes.tabMenuElement} to={`/group/${props.match.params.idGroups}/setting`}>
              <SettingOutlined style={{fontSize: 20}}/> <b className={classes.tabMenuContent}>Setting</b>
            </Link>
          </div>
        </div>
        <div className={classes.header}>
          <h1 className={classes.title}>You’ve got <span
            className={classes.highlightTitle}>{numberTask} task</span> today</h1>
          <Button text={'Add new task'} onButtonClick={handleClickAddNewTask}/>
          <CreateTask onCreateSuccess={fetchListTasks} idGroups={props.match.params.idGroups} isShowAddTask={isShowAddTask}
                      closeModel={handleExitAddNewTask}/>
        </div>
        <div className={classes.mainTableContain}>
          <h2 className={classes.titleTasks}>On Hold</h2>
          <table className={classes.listTasks}>
            <tbody className={classes.scrollBar}>
            {listTasks.filter((e) => !e.isCompleted).map((element, index, array) =>
              (
                <Tasks
                  key={element.idTasks}
                  indexList={index}
                  arrayLength={array.length}
                  data={element}
                />
              ),
            )}
            </tbody>
          </table>
        </div>
        <div className={classes.mainTableContain}>
          <h2 className={classes.titleTasks}>Completed</h2>
          <table className={`${classes.listTasks} ${classes.listTasksCompleted}`}>
            <tbody className={classes.scrollBar}>
            {listTasks.filter((e) => e.isCompleted).map((element, index, array) =>
              (
                <Tasks
                  key={element.idTasks}
                  indexList={index}
                  arrayLength={array.length}
                  data={element}
                />
              ),
            )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default MainGroup