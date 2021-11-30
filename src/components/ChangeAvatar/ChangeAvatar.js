import AvatarEditor from 'react-avatar-editor'
import classes from './ChangeAvatar.module.css'
import Button from '../layout/Button/Button'
import { Fragment, useRef, useState } from 'react'
import { Slider } from 'antd'
import FetchApi from '../../apis/FetchApi'
import { UserApi } from '../../apis/ListApis'

const ChangeAvatar = props => {
  const [isEdit, setIsEdit] = useState(false)
  const [file, setFile] = useState('')
  const [imageBase64, setImageBase64] = useState('')
  const [scaleImage, setScaleImage] = useState(0)
  const [isPreview, setIsPreview] = useState(false)
  const [waiting, setWaiting] = useState(false)

  const refAvatar = useRef()
  const isHaveFile = Boolean(file !== '')

  const handleChooseFile = (event) => {
    const selected = event.target.files[0]

    if (selected.type.endsWith('jpg') || selected.type.endsWith('png')) {
      event.target.value = null
    }

    setFile(selected)
  }

  const handleClickChangeAvatar = () => {
    setIsEdit(true)
  }

  const handleChangeScale = (value) => {
    setScaleImage(value)
  }

  const handleSaveImage = () => {
    setWaiting(true)

    FetchApi(UserApi.changeAvatar, 'PUT', 'application/json', {image: imageBase64}, (status, data) => {
      if (status) {
        props.onAvatarChange(data.image)

        setIsEdit(false)
        setFile('')
        setImageBase64('')
        setScaleImage(0)
        setIsPreview(false)
        setWaiting(false)
      }
    })
  }

  const handleCancerClick = () => {
    setIsEdit(false)
  }

  const handlePreviewImage = () => {
    setImageBase64(refAvatar.current.getImageScaledToCanvas().toDataURL())
    setIsPreview(true)
  }

  return (
    <div className={classes.main}>
      {!isEdit &&
      <Fragment>
        <div></div>
        <div className={classes.image}>
          <img src={props.urlAvatar} alt="avatar"/><br/>
          <Button text={'Change avatar'} onButtonClick={handleClickChangeAvatar}/>
        </div>
      </Fragment>}
      {isEdit &&
      <Fragment>
        <div>
          <AvatarEditor
            ref={refAvatar}
            borderRadius={220}
            image={file}
            width={220}
            height={220}
            border={10}
            color={[0, 0, 0, 0.3]} // RGBA
            scale={(scaleImage + 100) / 100}
            rotate={0}
            className={classes.avatar}
          />
          <Slider defaultValue={scaleImage} onChange={handleChangeScale} disabled={!isHaveFile}/>
        </div>
        <div className={classes.rightBar}>
          <input onChange={handleChooseFile} type="file" id="avatar" name="avatar" accept="image/png, image/jpeg"/>
          <div className={classes.buttonGroup}>
            <Button text={'Cancer'} disabled={false} onButtonClick={handleCancerClick}/>
            {isHaveFile && <Button text={'Preview >'} onButtonClick={handlePreviewImage}/>}
          </div>
        </div>
        {isPreview &&
        <div className={classes.preview}>
          <img src={imageBase64} alt="preview"/>
          {!waiting && <Button text={'Apply image'} onButtonClick={handleSaveImage}/>}
          {waiting && <p>Waiting ...</p>}
        </div>}
      </Fragment>}
    </div>
  )
}

export default ChangeAvatar