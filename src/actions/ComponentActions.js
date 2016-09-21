import AppDispatcher from "../dispatcher/AppDispatcher";
import ActionConstants from "../constants/ActionConstants";

function dispatch(type, data) {
  setTimeout(function() {
    AppDispatcher.dispatch({
        actionType: type,
        data: data
      });
    }, 100);

    //just to break the flow of any other dispatch triggered previously
}

var ComponentActions = {

  showOverlay(overlayData) {
    dispatch(ActionConstants.SHOW_OVERLAY, overlayData);
  },

  hideOverlay() {
    dispatch(ActionConstants.HIDE_OVERLAY);
  },

  headerCloseClicked() {
    dispatch(ActionConstants.HEADER_CLOSE);
  },

  saveOverlay(data) {
    dispatch(ActionConstants.OVERLAY_SAVE, data);
  },

  updateTaskStatus(data) {
    dispatch(ActionConstants.UPDATE_TASK, data);
  },

  createTask(data) {
    dispatch(ActionConstants.CREATE_TASK, data);
  },

  createProject(data) {
    dispatch(ActionConstants.CREATE_PROJECT, data);
  },

  createMember(data) {
    dispatch(ActionConstants.CREATE_MEMBER, data);
  },

  moveTask(data) {
    dispatch(ActionConstants.MOVE_TASK, data);
  }
};

export default ComponentActions;
