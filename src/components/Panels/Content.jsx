import React, { Component, PropTypes as T } from 'react'
import RightPanel from './RightPanel'
import HeadBar from '../HeadBar/HeadBar'
import Tags from '../Tag/Tags'
import SortBar from '../SortBar/SortBar'
import Articales from '../Articale/Articales'

export default class Content extends Component {
  static propTypes = {
    tagHandler: T.func,
    tagsData: T.array.required,
    sortsData: T.array,
    sortHanlder: T.func,
    articalesData: T.array.required,
    children: T.node
  }

  render () {
    console.log(this.props)
    const { tagsData, articalesData, sortsData, tagHandler, sortHanlder, ...others } = this.props
    return (
      <RightPanel>
        <HeadBar/>
        <Tags data={tagsData} onClick={tagHandler} />
        <SortBar data={sortsData} onClick={sortHanlder}/>
        <Articales data={articalesData} />
      </RightPanel>
    )
  }
}
