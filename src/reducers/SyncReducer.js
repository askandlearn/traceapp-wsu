const initialState = {
    unsynced: {
        user: '',
        files:[],
        info:[]
    }
  }
const SyncReducer = (state = initialState, action) => {
switch (action.type) {
    case 'ADD_SYNC':
    return {
        ...state,
        unsynced:{
            user: action.user,
            files: [...state.unsynced.files, action.file],
            info: [...state.unsynced.info, action.info]
        }
    };
    case 'REMOVE_SYNC':
    return {
        ...state,
        unsynced: {
            user: state.unsynced.user,
            files: state.unsynced.files.filter(item => state.unsynced.files.indexOf(item) != (state.unsynced.files.length - 1)),
            info: state.unsynced.info.filter(item => state.unsynced.info.indexOf(item) != (state.unsynced.info.length - 1))
        }
    }
    default:
        return state;
}
};

export default SyncReducer;