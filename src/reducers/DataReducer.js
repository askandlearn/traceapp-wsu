const initialState = {
    pnn50: 0,
    hrv: 0
}

const DataReducer = (state = initialState, action) => {
    switch(action.type){
        case 'UPDATE_PNN50':
            return{
                ...state,
                pnn50: action.pnn50
            };
        case 'UPDATE_HRV':
            return{
                ...state,
                hrv: action.hrv
            }
        default:
            return state
    }
};

export default DataReducer;