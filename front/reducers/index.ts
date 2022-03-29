import { HYDRATE } from "next-redux-wrapper";
import plan from "./plan";
import day from "./day";
import { AnyAction, combineReducers, Store } from "redux";
import { Task } from "redux-saga";

//(이전상태, 액션) => 다음상태
const rootReducer = (state: any, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combinedReducers = combineReducers({
        plan,
        day,
      });
      return combinedReducers(state, action);
    }
  }
};

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

export interface SagaStore extends Store {
  sagaTask: Task;
}
