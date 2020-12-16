import React from 'react'
import {shallow, mount} from 'enzyme'
import {CategoryFormModalComponent} from '../index'

describe('<CategoryFormModalComponent />', () => {
  it('renders <CategoryFormModalComponent /> closed', () => {
    const wrapper = shallow(<CategoryFormModalComponent />)
    expect(wrapper).toMatchSnapshot()
  })

  it('renders <CategoryFormModalComponent /> opened', () => {
    const wrapper = shallow(<CategoryFormModalComponent visible />)
    expect(wrapper).toMatchSnapshot()
  })

  it('renders <CategoryFormModalComponent /> and expect to call handleCancelCb', () => {
    const onClose = jest.fn()
    const wrapper = shallow(
      <CategoryFormModalComponent visible handleCancelCb={onClose} />
    )
    wrapper.find({'data-testid': 'CFMcancelButton'}).simulate('click')
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('renders <CategoryFormModalComponent /> and expect submit to be disabled', () => {
    const wrapper = shallow(<CategoryFormModalComponent visible />)
    const btn = wrapper.find({'data-testid': 'CFMsubmitButton'})
    btn.simulate('click')
    expect(btn.prop('disabled')).toBe(true)
  })

  it('renders <CategoryFormModalComponent /> and expect submit to be enabled after typing name', () => {
    const wrapper = mount(<CategoryFormModalComponent visible />)
    wrapper
      .find({'data-testid': 'CFMnameInput'})
      .at(0)
      .simulate('change', {target: {value: 'Hello world'}})

    jest.useFakeTimers()
    setTimeout(() => {
      const btn = wrapper.find({'data-testid': 'CFMsubmitButton'}).at(0)
      expect(btn.prop('disabled')).toBe(false)
    }, 500)
    jest.runAllTimers()
  })
})
