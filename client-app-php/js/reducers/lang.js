import lodash from 'lodash';
import { handleActions } from 'redux-actions';

const generateT = (obj)=>{
  return (message, params, category)=>{
    var msg = _.get(obj, `messages.${obj.target}.${category}['${message}']`, message);
    if(!_.isEmpty(params)){
      msg = msg.format(params);
    }
    return msg;
  }
};

const initialState = INIT_DATA['lang'];
initialState.t = generateT(initialState);

export default handleActions({
  'set lang' (state, action){
    const newState = {...state, target: action.payload};
    newState.t = generateT(newState);
    return newState;
  }
}, initialState);
