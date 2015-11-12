import React, { Component, PropTypes as T } from 'react'
import RightPanel from './RightPanel'
import HeadBar from '../HeadBar/HeadBar'
import Tags from '../Tag/Tags'
import SortBar from '../SortBar/SortBar'
import Articales from '../Articale/Articales'

export default class Content extends Component {
  static propTypes = {
    tagHandler: T.func,
    tagsData: T.array.isRequired,
    selectedTags: T.array.isRequired,
    sortsData: T.array,
    sortHanlder: T.func,
    articalesData: T.array,
    children: T.node
  }

  render () {
    const { tagsData, selectedTags, articalesData, sortsData, tagHandler, sortHanlder, ...others } = this.props
    return (
      <RightPanel>
        <HeadBar/>
        <Tags tags={tagsData} selectedTags={selectedTags} onClick={tagHandler} />
        <SortBar data={sortsData} onClick={sortHanlder}/>
        <Articales data={articalesData} />
      </RightPanel>
    )
  }
}
