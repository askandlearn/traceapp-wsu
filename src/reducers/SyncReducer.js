const initialState = {
    unsynced: {
        user: '',
        files:[]
    }
  }
const SyncReducer = (state = initialState, action) => {
switch (action.type) {
    case 'ADD_SYNC':
    return {
        ...state,
        unsynced:{
            user: action.user,
            files: [...state.unsynced.files, action.file]
        }
    };
    case 'REMOVE_SYNC':
    return {
        ...state,
        unsynced: {
            user: state.unsynced.user,
            files: state.unsynced.files.filter(item => state.unsynced.files.indexOf(item) != (state.unsynced.files.length - 1))
        }
    }
    default:
        return state;
}
};

export default SyncReducer;