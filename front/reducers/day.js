import produce from '../util/produce';
export const initialState = {

    addDayLoading: false, // 로그인 시도중
    addDayDone: false,
    addDayError: null,
}


export const ADD_DAY_REQUEST = 'ADD_DAY_REQUEST';
export const ADD_DAY_SUCCESS = 'ADD_DAY_SUCCESS';
export const ADD_DAY_FAILURE = 'ADD_DAY_FAILURE';

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
            default:
                break;
        }
    });

export default reducer;