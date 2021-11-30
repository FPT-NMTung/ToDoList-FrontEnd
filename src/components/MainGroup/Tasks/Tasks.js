import classes from './Tasks.module.css'
import minorImg from '../../../images/circle-green.png'
import normalImg from '../../../images/circle-yellow.png'
import criticalImg from '../../../images/circle-red.png'
import optionImg from '../../../images/dot-option.png'
import { Avatar, Tooltip } from 'antd'

const statusData = [
  {
    name: 'Pending',
    classesColor: classes.statusOrange,
  },
  {
    name: 'In Progress',
    classesColor: classes.statusBlue,
  },
  {
    name: 'Completed',
    classesColor: classes.statusGreen,
  },
  {
    name: 'Canceled',
    classesColor: classes.statusRed,
  },
]

const severityData = [
  {
    name: 'Minor',
    image: minorImg,
  },
  {
    name: 'Normal',
    image: normalImg,
  },
  {
    name: 'Critical',
    image: criticalImg,
  },
]

const Tasks = props => {

  return (
    <tr className={`${(props.indexList !== props.arrayLength - 1) && classes.list} ${classes.element}`}>
      <td>
        <div className={classes.name}>
          <img className={classes.dotList}
               src="https://img.icons8.com/material-rounded/6/F3477A/filled-circle.png"
               alt={'circle'}
          />{props.data.name}
        </div>
      </td>
      <td className={classes.status}>
        <div className={statusData[props.data.status].classesColor}>{statusData[props.data.status].name}</div>
      </td>
      <td className={classes.severity}>
        <div>
          <img width={10} height={10} src={severityData[props.data.type].image} alt="severity"/>
          <div>{severityData[props.data.type].name}</div>
        </div>
      </td>
      <td className={classes.people}>
        <div>
          <Avatar.Group maxCount={4}>
            {props.data.members.map((element) => (
              <Tooltip key={element.idUsers} title={element.name} placement="top">
                <Avatar src={element.avatar}>K</Avatar>
              </Tooltip>
            ))}
          </Avatar.Group>
        </div>
      </td>
      <td className={classes.option}>
        <img width={18} height={18} src={optionImg} alt="option"/>
      </td>
    </tr>
  )
}

export default Tasks