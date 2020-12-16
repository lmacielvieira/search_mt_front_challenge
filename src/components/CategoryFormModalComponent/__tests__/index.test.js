import React from 'react'
import {shallow, mount} from 'enzyme'
import {ContactFormModalComponent} from '../index'

describe('<ContactDeleteModalComponent />', () => {
  it('renders <ContactFormModalComponent /> closed', () => {
    const wrapper = shallow(<ContactFormModalComponent />)
    expect(wrapper).toMatchSnapshot()
  })

  it('renders <ContactFormModalComponent /> opened', () => {
    const wrapper = shallow(<ContactFormModalComponent visible />)
    expect(wrapper).toMatchSnapshot()
  })

  it('renders <ContactFormModalComponent /> and expect to call handleCancelCb', () => {
    const onClose = jest.fn()
    const wrapper = shallow(
      <ContactFormModalComponent visible handleCancelCb={onClose} />
    )
    wrapper.find({'data-testid': 'CFMcancelButton'}).simulate('click')
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('renders <ContactFormModalComponent /> and expect submit to be disabled', () => {
    const onClose = jest.fn()
    const wrapper = shallow(<ContactFormModalComponent visible />)
    const btn = wrapper.find({'data-testid': 'CFMsubmitButton'})
    btn.simulate('click')
    expect(btn.prop('disabled')).toBe(true)
    expect(onClose).not.toHaveBeenCalledTimes(1)
  })

  it('renders <ContactFormModalComponent /> and expect submit to be enabled after typing name', () => {
    const wrapper = mount(<ContactFormModalComponent visible />)
    wrapper
      .find({'data-testid': 'CFMnameButton'})
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
