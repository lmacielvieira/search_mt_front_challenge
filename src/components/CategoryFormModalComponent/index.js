import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Form, Modal, Input, Button, Select} from 'antd'
import t from 'typy'
import debounce from 'lodash/debounce'
import 'moment/locale/pt-br'
import './style.less'
import {SETTINGS} from '../../settings'

export const CategoryFormModalComponent = ({
  _componentName,
  visible,
  title,
  handleSaveCb,
  handleEditCb,
  handleCancelCb,
  nameLabel,
  descLabel,
  cancelBtnLabel,
  saveBtnLabel,
  requiredLabel,
  item
}) => {
  // -------------------------------------------------------------------------//
  // Hooks
  // -------------------------------------------------------------------------//
  const [form] = Form.useForm()
  const [disabled, setDisabled] = useState(true)

  // -------------------------------------------------------------------------//
  // Effects
  // -------------------------------------------------------------------------//

  // -------------------------------------------------------------------------//
  // Requests
  // -------------------------------------------------------------------------//

  // -------------------------------------------------------------------------//
  // Event Handlers
  // -------------------------------------------------------------------------//

  const handleSubmitError = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const handleSubmit = (values) => {
    // if passing to the back, remove the phone mask with .replace(/\D/g, '') to save only the numbers
    if (item && item._id) {
      // edit
      t(handleEditCb).safeFunction(item._id, values)
    } else {
      // create
      t(handleSaveCb).safeFunction(values)
    }
  }

  const handleFieldChange = () => {
    setDisabled(!form.getFieldValue('name') && !form.getFieldValue('desc'))
  }

  // -------------------------------------------------------------------------//
  // Rendering
  // -------------------------------------------------------------------------//

  const renderLabel = (text) => {
    return <span className={`${_componentName}-label defaultText`}>{text}</span>
  }

  return (
    <Modal
      wrapClassName={_componentName}
      title={title}
      visible={visible}
      closable={false}
      footer={null}
      onCancel={handleCancelCb}>
      <Form
        form={form}
        data-testid="CFMform"
        onFinish={debounce(handleSubmit, 500)}
        hideRequiredMark
        initialValues={{
          name: item ? item.name : undefined,
          desc: item ? item.desc : undefined
        }}
        onFinishFailed={handleSubmitError}>
        <div className={`${_componentName}-wrapper`}>
          <Form.Item
            label={renderLabel(nameLabel)}
            colon={false}
            name="name"
            labelCol={{offset: 0, span: 24}}
            validateTrigger={['onSubmit']}
            rules={[
              {
                required: true,
                message: requiredLabel
              }
            ]}>
            <Input
              data-testid="CFMnameInput"
              className={`${_componentName}-input`}
              placeholder={' '}
              onChange={handleFieldChange}
            />
          </Form.Item>
          {item && (
            <Form.Item
              label={renderLabel(descLabel)}
              colon={false}
              name="desc"
              labelCol={{offset: 0, span: 24}}
              validateTrigger={['onSubmit']}
              rules={[
                {
                  required: true,
                  message: requiredLabel
                }
              ]}>
              <Select
                data-testid="CFMtagsInput"
                mode="tags"
                onChange={handleFieldChange}
              />
            </Form.Item>
          )}
        </div>
        <div className={`${_componentName}-footer`}>
          <Button
            data-testid="CFMcancelButton"
            className="cancelBtn"
            type="ghost"
            onClick={handleCancelCb}>
            {cancelBtnLabel}
          </Button>
          <Button
            data-testid="CFMsubmitButton"
            className="okBtn"
            type="primary"
            disabled={disabled}
            htmlType="submit">
            {saveBtnLabel}
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

// Component props and default prop values
CategoryFormModalComponent.propTypes = {
  _componentName: PropTypes.string,
  title: PropTypes.string,
  handleSaveCb: PropTypes.func,
  handleEditCb: PropTypes.func,
  handleCancelCb: PropTypes.func,
  visible: PropTypes.bool,
  nameLabel: PropTypes.string,
  descLabel: PropTypes.string,
  saveBtnLabel: PropTypes.string,
  cancelBtnLabel: PropTypes.string
}

CategoryFormModalComponent.defaultProps = {
  _componentName: 'category-form-modal-component',
  visible: false,
  title: SETTINGS.CategoryFormModalComponent.title,
  handleSaveCb: () => {},
  handleEditCb: () => {},
  handleCancelCb: () => {},
  nameLabel: SETTINGS.CategoryFormModalComponent.nameLabel,
  descLabel: SETTINGS.CategoryFormModalComponent.descLabel,
  cancelBtnLabel: SETTINGS.CategoryFormModalComponent.cancelBtnLabel,
  saveBtnLabel: SETTINGS.CategoryFormModalComponent.saveBtnLabel
}
