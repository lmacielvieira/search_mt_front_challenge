import React from 'react'
import {shallow} from 'enzyme'
import {SearchHeaderComponent} from '../index'

describe('<SearchHeaderComponent />', () => {
  it('renders <SearchHeaderComponent />', () => {
    const wrapper = shallow(<SearchHeaderComponent />)
    expect(wrapper).toMatchSnapshot()
  })
})
