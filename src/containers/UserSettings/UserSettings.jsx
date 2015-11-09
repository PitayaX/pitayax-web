import React, { Component, PropTypes } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

export default class UserSettings extends Component {
  render () {
    const styles = require('./UserSettings.scss')
    return (
      <div className={styles['settings-main']}>
        <div className={styles['settings-title']}>
           <h2><i className="fa fa-cogs"></i>设置</h2>
        </div>
        <div className={styles['settings-body']}>
          <Tabs  onSelect={this.handleSelected} selectedIndex={2}>
            <TabList>
              <Tab>基础设置</Tab>
              <Tab>个人资料</Tab>
              <Tab>修改密码</Tab>
              <Tab>帐号管理</Tab>
            </TabList>
            <TabPanel>
              <h2>昵称和电子邮件</h2>
            </TabPanel>
            <TabPanel>

              <input type="hidden" name="_method" value="patch" />
              <div className="control-group"></div>
              <label className="control-label">头像</label>
                <div className="avatar">
                  <img src="http://cdn0.jianshu.io/assets/default_avatar-096ab0985b6e5ddd65660c1b30a8fe30.png" alt="Default avatar" />
                </div>
                <div className="btn-group change-avatar">
                  <a className="btn dropdown-toggle" data-toggle="dropdown" href="#">更换头像 <span className="caret"></span></a>
                  <ul className="dropdown-menu arrow-top">
                    <li className="upload-button">
                    <a href="javascript:void(0)" className="upload-avatar"><i className="fa fa-pencil"></i>
                      <input className="btn-link btn-large hidden-field" type="file" name="user[upload_avatar]" id="user_upload_avatar" />
                      上传头像</a>
                    </li>
                  </ul>
                  <img id="upload-loader" className="hide loader-tiny" src="http://baijii-common.b0.upaiyun.com/loaders/tiny.gif" alt="Tiny" />
                </div>
                <label className="control-label">简介</label>
                <textarea placeholder="填写您的个人简介可以帮助其他人更好的了解您。" rows="5"
                  className="input-xxlarge" name="user[intro]" id="user_intro">
                </textarea>
                <label className="control-label">个人主页</label>
                <input placeholder="您的个人主页 http://example.com"  className="input-xlarge" type="text" name="user[homepage]" id="user_homepage"/>
            </TabPanel>
            <TabPanel>
              <h2>Hello from Baz</h2>
            </TabPanel>
            <TabPanel>
              <h2>帐号设置</h2>
            </TabPanel>
         </Tabs>
        </div>
      </div>
    )
  }
}
