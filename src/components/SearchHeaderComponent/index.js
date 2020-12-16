import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {AutoComplete, Input} from 'antd'
import t from 'typy'
import './style.less'
import {Link} from 'react-router-dom'
import {IMAGES, SETTINGS} from '../../settings'
import {normalizeInput} from '../../utils'

export const SearchHeaderComponent = ({
  _componentName,
  icon,
  optionItems,
  placeholder,
  onSelectCb,
  hideSearch,
  homeUrl
}) => {
  // -------------------------------------------------------------------------//
  // Hooks
  // -------------------------------------------------------------------------//

  const searchResult = (query) => {
    // query with contains and ignores accents
    return t(optionItems).safeArray.filter((option) =>
      normalizeInput(t(option, 'value').safeString).includes(
        normalizeInput(t(query).safeString)
      )
    )
  }

  const [options, setOptions] = useState(optionItems)

  const handleSearchChange = (value) => {
    const searchResultItems = t(searchResult(value)).safeArray
    setOptions(value ? searchResultItems : optionItems)
    t(onSelectCb).safeFunction(searchResultItems.map((item) => item.label))
  }

  const onSelect = (value, option) => {
    t(onSelectCb).safeFunction([option.label])
  }
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

  // -------------------------------------------------------------------------//
  // Rendering
  // -------------------------------------------------------------------------//

  return (
    <div className={_componentName}>
      <Link to={homeUrl}>
        <img className={`${_componentName}-icon`} src={icon} alt="" />
      </Link>
      {!hideSearch && (
        <AutoComplete
          dropdownClassName={`${_componentName}-dropdown`}
          options={options}
          onSelect={onSelect}
          onSearch={handleSearchChange}>
          <Input.Search
            size="large"
            placeholder={placeholder}
            enterButton
            allowClear
            onSearch={handleSearchChange}
          />
        </AutoComplete>
      )}
    </div>
  )
}

// Component props and default prop values
SearchHeaderComponent.propTypes = {
  _componentName: PropTypes.string,
  icon: PropTypes.string,
  hideSearch: PropTypes.bool,
  placeholder: PropTypes.string,
  homeUrl: PropTypes.string,
  onSelectCb: PropTypes.func,
  optionItems: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string
    })
  )
}

SearchHeaderComponent.defaultProps = {
  _componentName: 'search-header-component',
  hideSearch: false,
  icon: IMAGES.icon.logo,
  placeholder: SETTINGS.SearchHeaderComponent.placeholder,
  optionItems: [],
  onSelectCb: () => {},
  homeUrl: '/'
}
