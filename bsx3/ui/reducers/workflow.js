/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
/* eslint-disable eol-last */
const initialState = {
    workflows: [],
    current: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_WORKFLOWS':
            {
                return Object.assign({}, state, { workflows: {...action.workflows } });
            }
        case 'SET_CURRENT_WORKFLOW':
            {
                return Object.assign({}, state, { current: action.current });
            }
        case 'SHOW_WORKFLOW_PARAMETERS_DIALOG':
            {
                return {...state, formData: action.formData, showParametersDialog: action.show };
            }
        case 'SET_INITIAL_STATE':
            {
                const wf = action.data.workflow ? action.data.workflow.workflows : {};
                return {...state, workflows: wf };
            }
        default:
            return state;
    }
};