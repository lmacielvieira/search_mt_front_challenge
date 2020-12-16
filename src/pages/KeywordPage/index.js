import React from 'react'
import {connect} from 'react-redux'
import {message} from 'antd'
import t from 'typy'
import {SETTINGS, IMAGES} from '../../settings'
import {SearchHeaderComponent} from '../../components/SearchHeaderComponent'
import './style.less'
import {getTopWords} from '../../services'
import {KeywordTableComponent} from '../../components/KeywordTableComponent'
import {addKeyword, deleteKeyword} from '../../redux/actions/keywords'
import {CategoryFormModalComponent} from '../../components/CategoryFormModalComponent'

class KeywordPage extends React.Component {
  _pageName = 'keyword-page'

  // -------------------------------------------------------------------------//
  // Component Lifecycle
  // -------------------------------------------------------------------------//

  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      showModal: false,
      categoryToBeEdited: undefined
    }
  }

  // -------------------------------------------------------------------------//
  // Requests
  // -------------------------------------------------------------------------//

  // -------------------------------------------------------------------------//
  // Event Handlers
  // -------------------------------------------------------------------------//

  handleCreateContact = async ({name}) => {
    try {
      this.setState({loading: true, showModal: false})
      const response = await getTopWords(name)
      const keywords = t(response.data.ml)
        .safeArray.slice()
        .sort((a, b) => b.score - a.score)
        .slice(0, 10)

      const {dispatch} = this.props
      await dispatch(
        addKeyword(
          name,
          t(keywords).safeArray.map((item) => item.word)
        )
      )

      this.setState({loading: false})
    } catch (e) {
      this.setState({loading: false})
      message.error(e.message)
    }
  }

  handleEditContact = async (id, values) => {
    console.log('EDIT', id, values)
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
    const {loading, showModal} = this.state
    const {state} = this.props
    const keywords = t(state, 'keywordsReducer.keywords').safeObjectOrEmpty

    return (
      <div className={`${this._pageName}-table-wrapper`}>
        <KeywordTableComponent
          loading={loading}
          deleteCb={this.handleDeleteCategory}
          addCb={() => {
            this.setState({showModal: !showModal})
          }}
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

  renderCategoryModal = () => {
    const {showModal, categoryToBeEdited} = this.state

    return (
      <CategoryFormModalComponent
        visible={showModal}
        item={categoryToBeEdited}
        handleSaveCb={this.handleCreateContact}
        handleEditCb={this.handleEditContact}
        handleCancelCb={() => {
          this.setState({showModal: false, categoryToBeEdited: undefined})
        }}
      />
    )
  }

  render() {
    const {loading, showModal} = this.state
    const {state} = this.props
    const keywords = t(state, 'keywordsReducer.keywords').safeObjectOrEmpty

    return (
      <div className={`${this._pageName}`}>
        <SearchHeaderComponent
          optionItems={t(Object.keys(keywords)).safeArray.map((item) => {
            return {label: item, value: item}
          })}
          onSelectCb={this.handleFilter}
          showAddBtn={t(Object.keys(keywords)).safeArray.length > 0}
        />
        {!loading &&
          t(keywords).safeArray.length === 0 &&
          this.renderEmptyKeywords()}
        {t(keywords).safeArray.length > 0 && this.renderTable()}
        {showModal && this.renderCategoryModal()}
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
