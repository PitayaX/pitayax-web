import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loadSettings, loadAvatarByToken, saveSettings, changePassword, isLoaded, isSaving, dispose, closeAlert, closeUploadAlert, switchTabIndex }  from 'redux/modules/settings'
import { Tab, Tabs, TabList, TabPanel } from 'pitayax-web-tabs'
import { Input, Button, Alert, Image }  from 'react-bootstrap'
import { isLogged } from '../../helpers/mixin'

class UserSettings extends Component {

  static propTypes = {
    params: PropTypes.object,
    settings: React.PropTypes.object.isRequired,
    loadSettings: PropTypes.func,
    loadAvatarByToken: PropTypes.func,
    saveSettings: PropTypes.func,
    changePassword: PropTypes.func,
    closeAlert: PropTypes.func,
    closeUploadAlert: PropTypes.func,
    switchTabIndex: PropTypes.func,
    isLoaded: PropTypes.func,
    isSaving: PropTypes.func,
    dispose: PropTypes.func
  }
  constructor (props) {
    super(props)
  }


  static defaultProps = {

  }

  componentDidMount () {


    // get data from server
    if (!this.props.isLoaded(this.props.settings)) {
      // const token=this.props.userToken
      const userId = this.props.params.id
      this.props.loadSettings({ userId })
      .then((result) => {

        const fileToken=result.avatarFileToken
        if (fileToken) this.props.loadAvatarByToken(fileToken)
      })
    }
    //  if (isLogged()) {
    // }
    // else {
    //   console.log('user have no login info.')
    // }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.settings.entries) {
      // this._initData(nextProps.settings.entries)
    }
  }

  componentWillUnmount () {

    this.props.dispose()
  }

  /* submit latest data to api service */
  _handleSaveBasicInfo () {

    const { tabIndex, isExist } = this.props.settings

    const nick = this.refs['user_nick'].getValue() // 昵称
    const email = this.refs['user_email'].getValue()  // 邮箱
    const phone = this.refs['user_phone'].getValue()  // 电话
    if (Object.is(nick.length, 0)) {
      // TODO: show message
      return
    }
    if (Object.is(email.length, 0)) {
      // TODO: show message
      return
    }
    if (Object.is(phone.length, 0)) {
      // TODO: show message
      return
    }
    const userId = this.props.params.id
    const entries ={ userId, isExist, nick, email, phone }
    if (!this.props.isSaving(this.props.settings)) {
      this.props.saveSettings(entries)
    }
  }

   // save user profile
  _handleSaveProfile () {

    const { tabIndex, isExist, entries } = this.props.settings

    const avatarFileToken = entries['avatarFileToken'] || '' // 头像
    const avatarFileUrl = entries['avatarFileUrl'] || ''
    const description = this.refs['user_description'].getValue() // 个人简介
    const homepage = this.refs['user_homepage'].getValue() // 个人主页

    if (Object.is(description.length, 0)) {
      // TODO: show message
      return
    }
    if (Object.is(homepage.length, 0)) {
      // TODO: show message
      return
    }

    const userId = this.props.params.id
    // const userId = this._getCustomUserToken()
    // 'tabIndex':当前选中的tab,'userToken':用户唯一标识, 'isExist':用户是否已经存在
    const dataBody ={ userId, isExist, avatarFileToken, avatarFileUrl, description, homepage }
    if (!this.props.isSaving(this.props.settings)) {
      this.props.saveSettings(dataBody)
    }
  }

  // chang password
  _handleChangePassword () {

    const { tabIndex, isExist } = this.props.settings
    const oldpassword = this.refs['user_oldpassword'].getValue() // 旧密码
    const newpassword = this.refs['user_newpassword'].getValue() // 新密码
    if (Object.is(oldpassword.length, 0)) {
      // TODO: show message
      return
    }
    if (Object.is(newpassword.length, 0)) {
      // TODO: show message
      return
    }
    const userId = this.props.params.id || sessionStorage.getItem("userId")
    // 'userToken':用户唯一标识, 'isExist':用户是否已经存在
    const entries ={ userId, isExist, oldpassword, newpassword }
    if (!this.props.isSaving(this.props.settings)) {
      this.props.changePassword(entries)
    }
  }
   /* occur when switch tab */
  _handleSelected (index, last) {

    this.props.switchTabIndex(index)

    // this._initData(this.props.settings.entries)

  }

  _handleAlertDismiss () {

    this.props.closeAlert()
  }

  _handleUploadAlertDismiss () {

    this.props.closeUploadAlert()

  }

  // generate user token with date
  _getCustomUserToken () {

    const now = new Date()
    const year=now.getFullYear()
    const month=now.getMonth()+1
    const day=now.getDate()
    const hour=now.getHours()
    const minute=now.getMinutes()
    const second=now.getSeconds()
    const millisecond=now.getMilliseconds()
    return `${year}${month}${day}${hour}${minute}${second}${millisecond}` // temp token
  }

  _handleChange (e) {

    const input = e.target || e.srcElement
    if (input) {
      if (Object.is(input.value.length, 0)) {
        input.focus()
      }
    }
  }

  _handleChangeFile () {
    const file = this.refs['user_upload_avatar']
    const label = this.refs['user_avatar_label']
    if ( file && label)
    {
      label.querySelector( 'span' ).innerHTML = file.value.split( '\\' ).pop()
    }
  }

  // do upload file to file server
  _uploadAvatar (evt) {

    evt.stopPropagation()
    evt.preventDefault()

    const file=this.refs['user_upload_avatar']
    const  { loadAvatarByToken } =  this.props
    const hidUserToken=this.refs['user_avatar_fileToken'] // 隐藏域，用来保存userToken
    if (!file ||  file.files.length === 0) { return }
    const data = new FormData()
    data.append('user_avatar', file.files[0])

    const xhr = new XMLHttpRequest()
    xhr.open('POST', 'http://10.10.73.208:8081/fs', true) // 异步处理
    xhr.onload = function (e) { // onload： 成功完成
      try {
        const resp = JSON.parse(xhr.response) //  const json = eval(xhr.response)
        loadAvatarByToken(resp['file-token'])

      }
      catch (ex) { throw ex  }
    }
      // xhr.upload.addEventListener('progress', function(e){
      // xhr.style.width = Math.ceil(e.loaded/e.total) * 100 + '%';
      // }, false);
    xhr.upload.onprogress = function (e) {
      if (e.lengthComputable) {
          // e.loaded
          // e.total
      }
    }
    xhr.onerror = function (e) {
      console.log('an error occur when upload file')
    }
    xhr.send(data)

  }

  render () {

    const styles = require('./UserSettings.scss')
    const { error, isSaved, isUploaded, alertVisible, tabIndex, entries }=this.props.settings
    const userAvatar = entries.avatarFileUrl || require('./default_avatar.png')

    return (
      <div className={styles['settings-main']}>
        <div className={styles['settings-alert']}>
          {error!=null && alertVisible &&<Alert bsStyle="danger" onDismiss={::this._handleAlertDismiss} dismissAfter={4000} >
            <p>You happen error.</p>
          </Alert>}
          {error===null && isSaved && alertVisible&&<Alert bsStyle="success" onDismiss={::this._handleAlertDismiss} dismissAfter={4000} >
            <p>You have saved data successfully.</p>
          </Alert>}
          {error===null && isUploaded&&<Alert bsStyle="success"  onDismiss={::this._handleUploadAlertDismiss} dismissAfter={4000} >
            <p>上传成功。</p>
          </Alert>}
        </div>
        <div className={styles['settings-title']}>
           <h2><i className="fa fa-cogs"></i>设置</h2>
        </div>
        <div className={styles['settings-body']}>
          <Tabs  onSelect={::this._handleSelected} selectedIndex={tabIndex}>
            <TabList>
              <Tab>基础设置</Tab>
              <Tab>个人资料</Tab>
              <Tab>修改密码</Tab>
            </TabList>
            <TabPanel>
              <div className={styles['user-container']}>
                <h2>昵称和电子邮件</h2>
                <label className="control-label">昵称</label>
                <Input value={entries.nick} onChange={::this._handleChange} ref="user_nick" placeholder="昵称"   className="input-xlarge" type="text" name="user_nick" id="user_nick"/>
                <label className="control-label">电子邮件</label>
                <Input value={entries.email} onChange={::this._handleChange} ref="user_email" placeholder="电子邮件"  className="input-xlarge" type="text" name="user_email" id="user_email"/>
                <label className="control-label">手机号码</label>
                <Input value={entries.phone} onChange={::this._handleChange} ref="user_phone" placeholder="手机号码"  className="input-xlarge" type="text" name="user_phone" id="user_phone"/>
                <Button bsClass={"btn "+styles['btn-save']} onClick={::this._handleSaveBasicInfo}>保存</Button>
              </div>
            </TabPanel>
            <TabPanel>
              <div className={styles['user-container']}>
                <div className={styles['user-avatar']} >
                  <div className={styles['avatar']}>
                    <Image src={userAvatar} className={styles['user-avatar-image']} circle />
                  </div>
                  <div className="btn-group change-avatar">
                    <input type="hidden" ref="user_avatar_fileToken"  name="user_avatar_fileToken" id="user_avatar_fileToken" value="" />
                    <form id="user_upload_frm"  encType="multipart/form-data" onSubmit={::this._uploadAvatar}>
                      <div className={styles['file-box']}>
					             <input ref="user_upload_avatar" type="file" help="上传头像" name="user_upload_avatar" id="user_upload_avatar" className={styles['file-input']}  multiple="" onChange={::this._handleChangeFile} />
					             <label ref="user_avatar_label" htmlFor="user_upload_avatar"><span>Choose a file…</span></label>
				              </div>
                      <div className={styles['btn-avatar-upload']}>
                        <Button type="submit" bsClass={"btn "+styles['btn-save']}>上传</Button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className={styles['user-avatar']}>
                  <label className="control-label">简介</label>
                  <Input type="textarea"  ref="user_description" onChange={::this._handleChange}  placeholder="填写您的个人简介可以帮助其他人更好的了解您" name="user_description" id="user_description" />
                  <label className="control-label">个人主页</label>
                  <Input type="text"   ref="user_homepage" onChange={::this._handleChange}  placeholder="您的个人主页 http://example.com" name="user_homepage" id="user_homepage" />
                </div>
                <Button bsClass={"btn "+styles['btn-save']} onClick={::this._handleSaveProfile}>保存</Button>
              </div>
            </TabPanel>
            <TabPanel>
              <div className={styles['user-container']}>
                <label className="control-label">旧密码</label>
                <Input type="text" ref="user_oldpassword" onChange={::this._handleChange}  placeholder="旧密码" name="user_oldpassword" id="user_oldpassword" />
                <label className="control-label">新密码</label>
                <Input type="text" ref="user_newpassword" onChange={::this._handleChange}  placeholder="新密码" name="user_newpassword" id="user_newpassword" />
                <Button bsClass={"btn "+styles['btn-save']} onClick={::this._handleChangePassword}>保存</Button>
              </div>
            </TabPanel>
         </Tabs>
        </div>
      </div>
    )
  }
}


function mapStateToProps (state) {
  return {
    settings: state.settings,
  }
}
function mapDispatchToProps (dispatch) {

  return bindActionCreators ({ loadSettings, loadAvatarByToken, saveSettings, changePassword, isLoaded, isSaving, dispose, closeAlert, closeUploadAlert, switchTabIndex }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(UserSettings)
