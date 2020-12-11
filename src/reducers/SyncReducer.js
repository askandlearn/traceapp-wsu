const initialState = {
    unsynced: {
        'mohammad':{
            'files':['Test.txt', 'Test2.txt'],
            'info':['Info','Info1']
        }
    }
}

const SyncReducer = (state = initialState, action) => {
switch (action.type) {
    case 'ADD_SYNC':
    return {
        ...state,
        unsynced:{
            ...state.unsynced,
            [action.user]: {
                ...state.unsynced[action.user],
                files: [action.file],
                info: [action.info]
            }
        }
    }
    case 'APPEND_SYNC':
    return {
        ...state,
        unsynced:{
            ...state.unsynced,
            [action.user]: {
                ...state.unsynced[action.user],
                files: [...state.unsynced[action.user].files, action.file],
                info: [...state.unsynced[action.user].info, action.info]
            }
        }
    }
    case 'REMOVE_SYNC':
        return {
            ...state,
            unsynced:{
                ...state.unsynced,
                [action.user]: {
                    ...state.unsynced[action.user],
                    files: state.unsynced[action.user].files.filter((item, index) => {return index != (state.unsynced[action.user].files.length - 1)}),
                    info: state.unsynced[action.user].info.filter((item, index) => {return index != (state.unsynced[action.user].info.length - 1)})
                }
            }
        }
    default:
        return state;
}
};

export default SyncReducer;