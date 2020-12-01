const initialState = {
    pnn50: 0,
    hrv: 0,
    metrics: new Array(11).fill(0)
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
            };
        case 'UPDATE_METRIC':
            return{
                ...state,
                metrics: action.metrics
            }
        default:
            return state
    }
};

export default DataReducer;