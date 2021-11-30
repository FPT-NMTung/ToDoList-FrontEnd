import classes from './Message.module.css'

const Message = props => {
  return (
    <div className={classes.main}>
        <div className={classes.noGroup}>
            <p><i>Join group to show messages </i>😉</p>
        </div>
    </div>
  )
}

export default Message