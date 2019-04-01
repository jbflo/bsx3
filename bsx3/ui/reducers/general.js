/* eslint-disable eol-last */
/* eslint-disable object-curly-newline */
/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
import { omit } from 'lodash/object';
import shortid from 'shortid';

const initialState = {
    loading: false,
    showErrorPanel: false,
    errorMessage: '',
    dialogData: '',
    dialogTitle: '',
    dialogType: '',
    showDialog: false,
    userMessages: [],
    showConnectionLostDialog: false,
    showConfirmClearQueueDialog: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            {
                return {...state,
                    loading: action.loading,
                    title: action.title,
                    message: action.message,
                    blocking: action.blocking,
                    abortFun: action.abortFun
                };
            }
        case 'SHOW_ERROR_PANEL':
            {
                return {...state, showErrorPanel: action.show, errorMessage: action.message };
            }
        case 'SHOW_DIALOG':
            {
                return {
                    ...state,
                    showDialog: action.show,
                    dialogType: action.t,
                    dialogTitle: action.title,
                    dialogData: action.data
                };
            }
        case 'ADD_USER_MESSAGE':
            {
                const userMessages = [];
                let id = shortid.generate();

                while (state.userMessages[id]) {
                    id = shortid.generate();
                }

                // eslint-disable-next-line no-restricted-syntax
                for (const message of state.userMessages) {
                    if (message.exp >= new Date().getTime()) {
                        userMessages.push(message);
                    }
                }

                userMessages.push({...action.message, id });
                return {...state, userMessages };
            }
        case 'REMOVE_USER_MESSAGE':
            {
                // eslint-disable-next-line prefer-destructuring
                let userMessages = state.userMessages;

                if (userMessages[action.messageID]) {
                    userMessages = omit(userMessages, action.messageID);
                }

                return {...state, userMessages };
            }
        case 'CLEAR_ALL_USER_MESSAGES':
            {
                return {...state, userMessages: {} };
            }
        case 'SHOW_CONNECTION_LOST_DIALOG':
            {
                return {...state, showConnectionLostDialog: action.show };
            }
        case 'SHOW_CONFIRM_CLEAR_QUEUE_DIALOG':
            {
                return {...state, showConfirmClearQueueDialog: action.show };
            }
        default:
            return state;
    }
};