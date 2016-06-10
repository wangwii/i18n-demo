import React from 'react';
import { connect } from 'react-redux'

const inject = connect(state => { return { lang: state.lang }});

export default ComposedComponent =>{
  return inject(class extends React.Component {
    t(message_key, params = {}){
      return this.props.lang.t(message_key, params);
    }

    render() {
      return <ComposedComponent {...this.props} t={this.t.bind(this)} />;
    }
  });
};
