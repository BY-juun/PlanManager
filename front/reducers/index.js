
import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import user from './user';
import plan from './plan';

// (이전상태, 액션) => 다음상태
const rootReducer = (state,action) => {
  switch(action.type){
    case HYDRATE :
      console.log('HYDRATE',action);
      return action.payload;
    default : {
      const combinedReducers = combineReducers({
        user,
        plan,
      });
      return combinedReducers(state,action);
    }
  }
};

export default rootReducer;