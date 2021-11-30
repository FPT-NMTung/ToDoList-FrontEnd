import { Avatar, Button, Modal } from 'antd'
import { Fragment, useState } from 'react'
import classes from './CreateTask.module.css'
import { Input, Form, Select } from 'antd'
import minorImg from '../../images/circle-green.png'
import normalImg from '../../images/circle-yellow.png'
import criticalImg from '../../images/circle-red.png'
import { UserOutlined } from '@ant-design/icons'
import FetchApi from '../../apis/FetchApi'
import { TaskApi } from '../../apis/ListApis'

const layout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
}

const dummyDataMember = [
  {
    email: 'nmtung.temp@gmail.com',
    name: 'Nguyen Manh Tung 1',
  },
  {
    email: 'nmtung.temp1@gmail.com',
    name: 'Nguyen Manh Tung 2',
  },
  {
    email: 'nmtung.temp2@gmail.com',
    name: 'Nguyen Manh Tung 3',
  },
]

const CreateTask = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('')
  const [severity, setSeverity] = useState(0)

  const handleOk = () => {
    setIsLoading(true)

    FetchApi(TaskApi.create, 'PUT', 'application/json', {
      name: name,
      severity: severity,
      member: [],
      idGroups: props.idGroups,
    }, (status, data) => {
      if (status) {
        setIsLoading(false)
        props.closeModel()
        props.onCreateSuccess()
      } else {
        console.log(data.code)
      }
    })
  }

  const handleCancel = () => {
    if (!isLoading) {
      props.closeModel()
    }
  }

  const handleAddMember = (e) => {
    e.preventDefault()
  }

  const handleChangeName = (e) => {
    setName(e.target.value)
  }

  const handleChangeSeverity = (e) => {
    setSeverity(e)
  }

  return (
    <Fragment>
      {!props.isShowAddTask && <Fragment/>}
      {props.isShowAddTask && <Modal
        title={'Create new task'}
        visible={props.isShowAddTask}
        centered
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button form={'add-new-task'} key="submit" htmlType="submit" style={{
            backgroundColor: '#884CB2',
            outline: 'none',
            borderWidth: 0,
            borderRadius: 6,
            color: 'white',
            padding: '0 18px',
          }} loading={isLoading}>Create</Button>,
        ]}
      >
        <Form onFinish={handleOk} id={'add-new-task'} name="control-hooks" {...layout}>
          <Form.Item
            name="Title"
            label={'Title'}
            rules={[{required: true}]}
          >
            <Input onChange={handleChangeName} style={{borderRadius: '10em', paddingRight: 14, paddingLeft: 14}}/>
          </Form.Item>
          <Form.Item
            label={'severity'}
            rules={[{required: true}]}
          >
            <Select onChange={handleChangeSeverity} defaultValue={0} style={{width: 120}}>
              <Select.Option value={0}>
                <div className={classes.select}><img className={classes.imageSelect} src={minorImg} alt=""/>Minor</div>
              </Select.Option>
              <Select.Option value={1}>
                <div className={classes.select}><img className={classes.imageSelect} src={normalImg} alt=""/>Normal
                </div>
              </Select.Option>
              <Select.Option value={2}>
                <div className={classes.select}><img className={classes.imageSelect} src={criticalImg} alt=""/>Critical
                </div>
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label={'Member'}
            rules={[{required: true}]}
          >
            <div className={classes.addUser}>
              <Input placeholder="Input email member"
                     style={{width: 300, marginRight: 10, borderRadius: '10em', paddingRight: 14, paddingLeft: 14}}/>
              <button onClick={handleAddMember} className={classes.buttonOk}>
                Add
              </button>
            </div>
            <ul className={classes.listMember}>
              {dummyDataMember.map((e, index) =>
                <li key={index}>
                  <Avatar size={30} icon={<UserOutlined/>}/>
                  <div>{e.name}</div>
                </li>
              )}
            </ul>
          </Form.Item>
        </Form>
      </Modal>}
    </Fragment>
  )
}

export default CreateTask