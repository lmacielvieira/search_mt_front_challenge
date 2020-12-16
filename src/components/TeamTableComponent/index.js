import React from 'react'
import PropTypes from 'prop-types'
import t from 'typy'
import {Table, Button, Tooltip, Popconfirm} from 'antd'
import {
  PlusOutlined,
  DeleteOutlined,
  ShareAltOutlined,
  EditOutlined
} from '@ant-design/icons'
import './style.less'
import {normalizeInput} from '../../utils'
import {SETTINGS} from '../../settings'

export const TeamTableComponent = ({
  _componentName,
  title,
  nameLabel,
  descLabel,
  addCb,
  data,
  editCb,
  shareCb,
  deleteCb,
  editTooltip,
  deleteTooltip,
  shareTooltip,
  emptyText,
  loading
}) => {
  // -------------------------------------------------------------------------//
  // Hooks
  // -------------------------------------------------------------------------//

  // -------------------------------------------------------------------------//
  // Effects
  // -------------------------------------------------------------------------//

  // -------------------------------------------------------------------------//
  // Requests
  // -------------------------------------------------------------------------//

  // -------------------------------------------------------------------------//
  // Event Handlers
  // -------------------------------------------------------------------------//

  // -------------------------------------------------------------------------//
  // Other functions
  // -------------------------------------------------------------------------//

  const sort = (a, b, src) => {
    const aName = normalizeInput(t(a, src).safeString)
    const bName = normalizeInput(t(b, src).safeString)
    if (aName < bName) {
      return -1
    }
    if (aName > bName) {
      return 1
    }
    return 0
  }

  // -------------------------------------------------------------------------//
  // Rendering
  // -------------------------------------------------------------------------//

  const renderDesc = (text, record, index) => {
    return (
      <div className={`${_componentName}-desc-wrapper`}>
        <div className={`${_componentName}-desc defaultText`}>{text}</div>
        <div className={`${_componentName}-options-wrapper`}>
          <Tooltip title={deleteTooltip}>
            <Popconfirm
              title="Are you sure to delete this category?"
              onConfirm={() => {
                t(deleteCb).safeFunction(index)
              }}
              onCancel={() => {}}
              okText="Yes"
              cancelText="No">
              <DeleteOutlined className={`${_componentName}-icon`} />
            </Popconfirm>
          </Tooltip>
          <Tooltip title={shareTooltip}>
            <ShareAltOutlined
              className={`${_componentName}-icon`}
              onClick={() => {
                t(shareCb).safeFunction(record)
              }}
            />
          </Tooltip>
          <Tooltip title={editTooltip}>
            <EditOutlined
              className={`${_componentName}-icon`}
              onClick={() => {
                t(editCb).safeFunction(record)
              }}
            />
          </Tooltip>
        </div>
      </div>
    )
  }

  const columns = [
    {
      title: nameLabel,
      dataIndex: 'name',
      sorter: (a, b) => sort(a, b, 'name'),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: descLabel,
      dataIndex: 'desc',
      sorter: (a, b) => sort(a, b, 'desc'),
      render: renderDesc
    }
  ]

  const renderHeader = () => {
    return (
      <div className={`${_componentName}-header`}>
        <div className={`${_componentName}-title defaultText`}>
          {t(title).safeString}
        </div>
        <Button
          className={`${_componentName}-btn`}
          onClick={t(addCb).safeFunction}>
          <PlusOutlined />
        </Button>
      </div>
    )
  }

  const renderTable = () => {
    return (
      <Table
        rowKey="id"
        loading={loading}
        className={`${_componentName}-table-wrapper`}
        columns={columns}
        dataSource={data}
        locale={{emptyText}}
      />
    )
  }

  return (
    <div className={_componentName}>
      {renderHeader()}
      {renderTable()}
    </div>
  )
}

// Component props and default prop values
TeamTableComponent.propTypes = {
  _componentName: PropTypes.string,
  title: PropTypes.string,
  nameLabel: PropTypes.string,
  descLabel: PropTypes.string,
  editTooltip: PropTypes.string,
  deleteTooltip: PropTypes.string,
  shareTooltip: PropTypes.string,
  emptyText: PropTypes.string,
  loading: PropTypes.bool,
  addCb: PropTypes.func,
  editCb: PropTypes.func,
  shareCb: PropTypes.func,
  deleteCb: PropTypes.func,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string
    })
  )
}

TeamTableComponent.defaultProps = {
  _componentName: 'keyword-table-component',
  title: SETTINGS.TeamTableComponent.title,
  nameLabel: SETTINGS.TeamTableComponent.nameLabel,
  descLabel: SETTINGS.TeamTableComponent.descLabel,
  editTooltip: SETTINGS.TeamTableComponent.editTooltip,
  emptyText: SETTINGS.TeamTableComponent.emptyText,
  deleteTooltip: SETTINGS.TeamTableComponent.deleteTooltip,
  shareTooltip: SETTINGS.TeamTableComponent.shareTooltip,
  loading: false,
  addCb: () => {},
  editCb: () => {},
  shareCb: () => {},
  deleteCb: () => {},
  data: []
}
