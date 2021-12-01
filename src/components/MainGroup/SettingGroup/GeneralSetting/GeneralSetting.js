import { Divider, List } from 'antd'
import classes from './GeneralSetting.module.css'
import FetchApi from '../../../../apis/FetchApi'
import { GroupApi } from '../../../../apis/ListApis'
import { useHistory } from 'react-router-dom'

const GeneralSetting = props => {
  const history = useHistory()

  const handleDeleteGroup = () => {
    FetchApi(GroupApi.delete, 'DELETE', 'application/json', {
      idGroups: props.match.params.idGroups
    }, (status, data) => {
      if (status) {
        history.push('/')
      } else {
      //  delete failed
      }
    })
  }

  const data = [
    <div>
      <h4>Delete group</h4>
      <p>Once you delete a group, there is no going back. Please be certain.</p>
      <button onClick={handleDeleteGroup} className={classes.buttonDelete}>Delete</button>
    </div>,
  ]

  return (
    <div>
      <div>
        <Divider orientation="left">Danger Zone</Divider>
        <List
          size="large"
          bordered
          dataSource={data}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
      </div>
    </div>
  )
}

export default GeneralSetting