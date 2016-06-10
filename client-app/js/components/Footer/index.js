import React, { Component } from 'react'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../../constants/filters'
import classnames from 'classnames'
import style from './style.css'
import Translater from '../../helper/translater'

const FILTER_TITLES = {
  [SHOW_ALL]: 'todos.filter_bar_title_all',
  [SHOW_ACTIVE]: 'todos.filter_bar_title_active',
  [SHOW_COMPLETED]: 'todos.filter_bar_title_completed'
}

@Translater
class Footer extends Component {
  renderTodoCount() {
    const { activeCount } = this.props;

    let msg = 'todos.filter_bar_title_left_items';
    if(activeCount == 0){
      msg = 'todos.filter_bar_title_left_item0';
    }else if(activeCount == 1){
      msg = 'todos.filter_bar_title_left_item1';
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
      const btnText = this.props.t('todos.filter_bar_title_clear_completed');
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
