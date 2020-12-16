import React from 'react'
import {connect} from 'react-redux'
import {Spin, message} from 'antd'
import t from 'typy'
import {SETTINGS, IMAGES} from '../../settings'
import {SearchHeaderComponent} from '../../components/SearchHeaderComponent'
import './style.less'
import {getTopWords} from '../../services'
import {KeywordTableComponent} from '../../components/KeywordTableComponent'
import {deleteKeyword} from '../../redux/actions/keywords'

class KeywordPage extends React.Component {
  _pageName = 'keyword-page'

  // -------------------------------------------------------------------------//
  // Component Lifecycle
  // -------------------------------------------------------------------------//

  constructor(props) {
    super(props)

    this.state = {
      loading: false
    }
  }

  // -------------------------------------------------------------------------//
  // Requests
  // -------------------------------------------------------------------------//

  componentDidMount() {
    this.requestWords()
  }

  requestWords = async () => {
    try {
      const response = await getTopWords('car')
      const answers = t(response.data.ml)
        .safeArray.slice()
        .sort((a, b) => b.score - a.score)
        .slice(0, 10)
      console.log('ans', answers)
    } catch (e) {
      console.log('ERR', e)
    }
  }

  // -------------------------------------------------------------------------//
  // Event Handlers
  // -------------------------------------------------------------------------//

  handleCreateBtnClick = async (values) => {
    console.log('CREATE', values)
  }

  handleFilter = async (values) => {
    console.log('Filter', values)
  }

  handleDeleteCategory = async (item) => {
    console.log('Delete', item)
    try {
      const {dispatch} = this.props
      await dispatch(deleteKeyword(item.id))
    } catch (e) {
      console.log('ERROR DELETING', e)
      message.error(e.message)
    }
  }

  // -------------------------------------------------------------------------//
  // Other Functions
  // -------------------------------------------------------------------------//

  // -------------------------------------------------------------------------//
  // Render
  // -------------------------------------------------------------------------//

  renderEmptyKeywords = () => {
    return (
      <div className={`${this._pageName}-empty-wrapper`}>
        <img
          className={`${this._pageName}-empty-icon`}
          src={IMAGES.icon.book}
          alt=""
        />
        <p className={`${this._pageName}-empty-text defaultText`}>
          {SETTINGS.KeywordPage.noKeywordLabel}
        </p>
      </div>
    )
  }

  renderTable = () => {
    const {loading} = this.state
    const {state} = this.props
    const keywords = t(state, 'keywordsReducer.keywords').safeObjectOrEmpty

    return (
      <div className={`${this._pageName}-table-wrapper`}>
        <KeywordTableComponent
          loading={loading}
          deleteCb={this.handleDeleteCategory}
          data={t(Object.keys(keywords)).safeArray.map((key) => {
            return {
              id: key,
              name: key,
              desc: t(keywords[key]).safeArray.join(', ')
            }
          })}
        />
      </div>
    )
  }

  render() {
    const {loading} = this.state
    const {state} = this.props
    const keywords = t(state, 'keywordsReducer.keywords').safeObjectOrEmpty

    return (
      <div className={`${this._pageName}`}>
        <SearchHeaderComponent
          optionItems={t(Object.keys(keywords)).safeArray.map((item) => {
            return {label: item, value: item}
          })}
          handleAddBtnCb={this.handleCreateBtnClick}
          onSelectCb={this.handleFilter}
          showAddBtn={t(Object.keys(keywords)).safeArray.length > 0}
        />
        {!loading &&
          t(keywords).safeArray.length === 0 &&
          this.renderEmptyKeywords()}
        {t(keywords).safeArray.length > 0 && this.renderTable()}
        {loading && <Spin />}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  state
})

function mapDispatchToProps(dispatch) {
  return {dispatch}
}

export default connect(mapStateToProps, mapDispatchToProps)(KeywordPage)
