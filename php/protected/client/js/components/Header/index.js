import React, { Component } from 'react'
import TodoTextInput from '../TodoTextInput'
import Translater from '../../helper/translater'

@Translater
class Header extends Component {
  handleSave(text) {
    if (text.length) {
      this.props.addTodo(text)
    }
  }

  render() {
    return (
      <header>
        <h1>{this.props.t('Todos')}</h1>
        <TodoTextInput
          newTodo
          onSave={::this.handleSave}
          placeholder={this.props.t('What needs to be done?')} />
      </header>
    )
  }
}

export default Header
