import React, { Component } from 'react'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../../constants/filters'
import classnames from 'classnames'
import style from './style.css'
import Translater from '../../helper/translater'

const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Completed'
}

@Translater
class Footer extends Component {
  renderTodoCount() {
    const { activeCount } = this.props;

    let msg = '<strong>{number}</strong> items left';
    if(activeCount == 0){
      msg = '<strong>No</strong> items left';
    }else if(activeCount == 1){
      msg = '<strong>{number}</strong> item left';
    }

    return (
      <span className={style.count} dangerouslySetInnerHTML={{__html: this.props.t(msg, {number: activeCount})}}/>
    )
  }

  renderFilterLink(filter) {
    const title = FILTER_TITLES[filter]
    const { filter: selectedFilter, onShow } = this.props

    return (
      <a className={classnames({ [style.selected]: filter === selectedFilter })}
         style={{ cursor: 'pointer' }}
         onClick={() => onShow(filter)}>
        {this.props.t(title)}
      </a>
    )
  }

  renderClearButton() {
    const { completedCount, onClearCompleted } = this.props;
    if (completedCount > 0) {
      const btnText = this.props.t('Clear completed');
      return (
        <button className={style.clearCompleted} onClick={onClearCompleted}>{ btnText }</button>
      )
    }
  }

  render() {
    return (
      <footer className={style.normal}>
        {this.renderTodoCount()}
        <ul className={style.filters}>
          {[SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED].map(filter =>
            <li key={filter}>
              {this.renderFilterLink(filter)}
            </li>
          )}
        </ul>
        {this.renderClearButton()}
      </footer>
    )
  }
}

export default Footer
