import classes from '../GeneralSetting/GeneralSetting.module.css'
import { Button, Divider, Form, Input, List } from 'antd'

const MemberSetting = props => {
  const data = [
    <div>
      alo
    </div>,
  ]

  return (
    <div>
      <div>
        <Divider orientation="left">Add members</Divider>
        <Form name={'add-member-form'} layout={'inline'}>
          <Form.Item
            name="Email member"
            rules={[{required: true}]}

          >
            <Input
              placeholder="Email members"
              style={{borderRadius: '10em', paddingRight: 14, paddingLeft: 14}}
              type={'email'}
            />
          </Form.Item>
          <Form.Item>
            <Button form={'add-member-form'} key="submit" htmlType="submit" style={{
              backgroundColor: '#884CB2',
              outline: 'none',
              borderWidth: 0,
              borderRadius: 6,
              color: 'white',
              padding: '0 18px',
            }}>Add</Button>
          </Form.Item>
        </Form>
      </div>
      <div>
        <Divider orientation="left">List members</Divider>
        <List
          size="small"
          bordered
          dataSource={data}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
      </div>
    </div>
  )
}

export default MemberSetting