import React, { Component } from 'react'
import { Link } from 'react-router'
import { CounterButton, GithubButton, LeftPanel, Content } from 'components'
import { tagsData, articalesData, sortData } from 'data'

export default class Home extends Component {
  render () {
    const styles = require('./Home.scss')
    // require the logo image both from client and server
    // const logoImage = require('./logo.png')
    return (
      <div className={styles.home}>
        <LeftPanel><h3>Left Panel</h3></LeftPanel>
        <Content tagsData={tagsData} sortsData={sortData} articalesData={articalesData}/>
      </div>
    )
  }
}
