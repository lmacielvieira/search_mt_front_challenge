import React from 'react'
import {connect} from 'react-redux'
import {message} from 'antd'
import t from 'typy'
import {SETTINGS, IMAGES} from '../../settings'
import {SearchHeaderComponent} from '../../components/SearchHeaderComponent'
import './style.less'
import {getTopWords} from '../../services'
import {KeywordTableComponent} from '../../components/KeywordTableComponent'
import {
  addKeyword,
  deleteKeyword,
  editKeyword
} from '../../redux/actions/keywords'
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
      categoryToBeEdited: undefined,
      filteredItems: []
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
    try {
      this.setState({loading: true, showModal: false})

      const {dispatch} = this.props
      await dispatch(editKeyword(id, values.name, values.desc))

      this.setState({loading: false, categoryToBeEdited: undefined})
    } catch (e) {
      this.setState({loading: false, categoryToBeEdited: undefined})
      message.error(e.message)
    }
  }

  handleFilter = async (values) => {
    this.setState({filteredItems: values})
  }

  handleDeleteCategory = async (item) => {
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
    const {loading, showModal, filteredItems} = this.state
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
          editCb={(item) => {
            this.setState({
              showModal: !showModal,
              categoryToBeEdited: {
                ...item,
                _id: item.name,
                desc: t(item, 'desc').safeString.split(',')
              }
            })
          }}
          data={t(Object.keys(keywords))
            .safeArray.map((key) => {
              if (
                t(filteredItems).safeArray.length > 0 &&
                !t(filteredItems).safeArray.includes(key)
              ) {
                return null
              }
              return {
                id: key,
                name: key,
                desc: t(keywords[key]).safeArray.join(', ')
              }
            })
            .filter((el) => el != null)}
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
