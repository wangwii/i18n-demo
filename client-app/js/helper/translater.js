import React from 'react';
import { connect } from 'react-redux'

const inject = connect(state => { return { lang: state.lang }});

export default ComposedComponent =>{
  return inject(class extends React.Component {
    t(text, params = {}, category = 'todos'){
      return this.props.lang.t(text, params, category);
    }

    render() {
      return <ComposedComponent {...this.props} t={this.t.bind(this)} />;
    }
  });
};