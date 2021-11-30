import classes from './Search.module.css'
import icon from '../../images/icons8-search-24.png'

const Search = props => {
  return (
    <div className={classes.search}>
      <label className={classes.image} htmlFor={'search'}>
        <img src={icon} alt={'logo-Search'}/>
      </label>
      <input id={'search'} className={classes.input} type="text" placeholder={'Search for any training you want.'}/>
    </div>
  )
}

export default Search