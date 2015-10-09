import React, { Component, PropTypes as T } from 'react'
import RightPanel from './RightPanel'
import HeadBar from '../HeadBar/HeadBar'
import Tags from '../Tag/Tags'
import SortBar from '../SortBar/SortBar'
import Articales from '../Articale/Articales'

export default class Content extends Component {
  static propTypes = {
    onTagClick: T.func,
    tagsData: T.array.required,
    sortsData: T.array,
    articalesData: T.array.required,
    children: T.node
  }

  render () {
    const { tagsData, articalesData, sortsData, onTagClick, ...others } = this.props
    return (
      <RightPanel>
        <HeadBar/>
        <Tags data={tagsData} onClick={onTagClick} />
        <SortBar data={sortsData} />
        <Articales data={articalesData} />
      </RightPanel>
    )
  }
}
