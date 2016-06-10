import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import LanguageSelector from '../../components/LanguageSelector'
import Header from '../../components/Header'
import MainSection from '../../components/MainSection'
import * as TodoActions from '../../actions/todos'
import * as LangActions from '../../actions/lang'
import style from './style.css'

class App extends Component {
  render(){
    const { todos, actions, children } = this.props;

    return (
      <div className={style.normal}>
        <LanguageSelector setLang={actions.setLang} />
        <Header addTodo={actions.addTodo} />
        <MainSection todos={todos} actions={actions} />
        {children}
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    todos: state.todos, lang: state.lang
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({...TodoActions, ...LangActions}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
