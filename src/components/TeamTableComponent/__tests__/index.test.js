import React from 'react'
import {shallow} from 'enzyme'
import {TeamTableComponent} from '../index'

describe('<TeamTableComponent />', () => {
  it('renders <TeamTableComponent />', () => {
    const wrapper = shallow(<TeamTableComponent />)
    expect(wrapper).toMatchSnapshot()
  })
})
