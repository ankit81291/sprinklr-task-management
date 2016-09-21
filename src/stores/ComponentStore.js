import { EventEmitter } from "events";

import BaseStore from "./BaseStore";

import AppDispatcher from "../dispatcher/AppDispatcher";
import ActionConstants from "../constants/ActionConstants";

let ComponentStore = Object.assign({}, BaseStore, EventEmitter.prototype);

let dispatcherListener = function dispatcherListener(action) {

    var options = action.options;
    switch (action.actionType) {
        case ActionConstants.SHOW_OVERLAY:
            ComponentStore.setData("overlayData", action.data);
            ComponentStore.emitChange(ActionConstants.SHOW_OVERLAY);
            break;
        case ActionConstants.HIDE_OVERLAY:
            ComponentStore.emitChange(ActionConstants.HIDE_OVERLAY);
            break;
        case ActionConstants.HEADER_CLOSE:
            ComponentStore.emitChange(ActionConstants.HEADER_CLOSE);
            break;
        case ActionConstants.OVERLAY_SAVE:
            ComponentStore.setData("overlaySaveData", action.data);
            ComponentStore.emitChange(ActionConstants.OVERLAY_SAVE);
            break;
        default:
            break;
    }
};

ComponentStore.dispatchToken = AppDispatcher.register(dispatcherListener);

export default ComponentStore;
