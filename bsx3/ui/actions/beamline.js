/* eslint-disable eol-last */
/* eslint-disable indent */
// import fetch from 'isomorphic-fetch';
// The different states a beamline attribute can assume.
export const STATE = {
    IDLE: 'READY',
    BUSY: 'MOVING',
    ABORT: 'UNUSABLE'
};


// Action types
export const BL_ATTR_SET = 'BL_ATTR_SET';
export const BL_ATTR_GET_ALL = 'BL_ATTR_GET_ALL';
export const BL_ATTR_SET_STATE = 'BL_ATTR_SET_STATE';
export const BL_ATTR_MOV_SET_STATE = 'BL_ATTR_MOV_SET_STATE';
export const BL_ATTR_ACT_SET_STATE = 'BL_ATTR_ACT_SET_STATE';
export const BL_MACH_INFO = 'BL_MACH_INFO';
export const BL_ATTR_MOV_SET = 'BL_ATTR_MOV_SET';
export const BL_ATTR_ACT_SET = 'BL_ATTR_ACT_SET';

export function setBeamlineAttrAction(data) {
    return { type: BL_ATTR_SET, data };
}

export function getBeamlineAttrsAction(data) {
    return { type: BL_ATTR_GET_ALL, data };
}

export function setMachInfo(info) {
    return { type: BL_MACH_INFO, info };
}

export function busyStateAction(name) {
    return {
        type: BL_ATTR_SET_STATE,
        data: { name, state: STATE.BUSY }
    };
}

export function sendGetAllAttributes() {

}


// eslint-disable-next-line no-unused-vars
export function sendSetAttribute(name, value) {
}
