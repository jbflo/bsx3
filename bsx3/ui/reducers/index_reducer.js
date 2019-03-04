/* eslint-disable eol-last */
/* eslint-disable indent */
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import login from './login_reducer';
// import queue from './queue';
// import queueGUI from './queueGUI';
// import sampleGrid from './sampleGrid';
// import sampleChanger from './sampleChanger';
// import sampleChangerMaintenance from './sampleChangerMaintenance';
// import taskForm from './taskForm';
import sampleview from './sampleview_reducer';
// import general from './general';
// import beamline from './beamline';
// import logger from './logger';
// import contextMenu from './contextMenu';
// import remoteAccess from './remoteAccess';
// import shapes from './shapes';
// import workflow from './workflow';
// import taskResult from './taskResult';


const bsxcubeReducer = combineReducers({
    login,
    // queue,
    // sampleGrid,
    // sampleChanger,
    // sampleChangerMaintenance,
    // taskForm,
    sampleview,
    // logger,
    // general,
    // beamline,
    // remoteAccess,
    // contextMenu,
    // shapes,
    // queueGUI,
    // workflow,
    // taskResult,
    form: formReducer
});

const rootReducer = (state, action) => {
    if (action.type === 'SIGNOUT') {
        state = undefined; // eslint-disable-line no-param-reassign
    }

    return bsxcubeReducer(state, action);
};

export default rootReducer;