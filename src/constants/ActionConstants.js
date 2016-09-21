import keyMirror from 'keymirror';

var ActionConstants = keyMirror({
  SHOW_OVERLAY: null,
  HIDE_OVERLAY: null,
  HEADER_CLOSE: null,
  OVERLAY_SAVE: null,
  DATA_UPDATE: null,
  CREATE_TASK: null,
  CREATE_PROJECT: null,
  CREATE_MEMBER: null,
  MOVE_TASK: null
});

export default ActionConstants;
