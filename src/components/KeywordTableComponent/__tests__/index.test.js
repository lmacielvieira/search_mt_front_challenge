import React from 'react'
import {shallow} from 'enzyme'
import {KeywordTableComponent} from '../index'

describe('<KeywordTableComponent />', () => {
  it('renders <KeywordTableComponent />', () => {
    const wrapper = shallow(<KeywordTableComponent />)
    expect(wrapper).toMatchSnapshot()
  })
})
