import classes from './Button.module.css'

const Button = props => {

  return (
    <button className={`${classes.button}`} onClick={props.onButtonClick}>
      {props.text}
    </button>
  )
}

export default Button