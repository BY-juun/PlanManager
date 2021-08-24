import produce from '../util/produce';
export const initialState = {
    todayPlan : null,
    addDayLoading: false,
    addDayDone: false,
    addDayError: null,
    loadTodayLoading: false, // 로그인 시도중
    loadTodayDone: false,
    loadTodayError: null,
}


export const ADD_DAY_REQUEST = 'ADD_DAY_REQUEST';
export const ADD_DAY_SUCCESS = 'ADD_DAY_SUCCESS';
export const ADD_DAY_FAILURE = 'ADD_DAY_FAILURE';

export const LOAD_TODAY_REQUEST = 'LOAD_TODAY_REQUEST';
export const LOAD_TODAY_SUCCESS = 'LOAD_TODAY_SUCCESS';
export const LOAD_TODAY_FAILURE = 'LOAD_TODAY_FAILURE';

export const SUBMIT_TODAY_PLAN_SUCCESS = 'SUBMIT_TODAY_PLAN_SUCCESS';

const reducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case ADD_DAY_REQUEST:
                draft.addDayLoading = true;
                draft.addDayError = null;
                draft.addDayDone = false;
                break;
            case ADD_DAY_SUCCESS:
                draft.addDayLoading = false;
                draft.addDayDone = true;
                break;
            case ADD_DAY_FAILURE:
                draft.addDayLoading = false;
                draft.addDayError = action.error;
                break;

            case LOAD_TODAY_REQUEST:
                draft.loadTodayLoading = true;
                draft.loadTodayError = null;
                draft.loadTodayDone = false;
                break;
            case LOAD_TODAY_SUCCESS:
                draft.loadTodayLoading = false;
                draft.loadTodayDone = true;
                draft.todayPlan = action.data;
                break;
            case LOAD_TODAY_FAILURE:
                draft.loadTodayLoading = false;
                draft.loadTodayError = action.error;
                break;
            case SUBMIT_TODAY_PLAN_SUCCESS:{
                const submitplan = draft.todayPlan.Plans.find((v)=>v.id === action.data.id);
                submitplan.starttime = action.data.starttime;
                submitplan.endtime = action.data.endtime;
                submitplan.totaltime = action.data.totaltime;
                break;
                }
            default:
                break;
        }
    });

export default reducer;