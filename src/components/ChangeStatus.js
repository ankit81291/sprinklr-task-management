import React from 'react';

import ComponentActions from '../actions/ComponentActions.js';

export default React.createClass({

  getInitialState() {
    return {};
  },

  statuses: ["DONE", "ONHOLD", "INPROCESS", "SENT", "SCHEDULE"],

  setStatus(status) {
      ComponentActions.saveOverlay(status);
  },

  renderStatusList() {
    return this.statuses.map(function(obj) {
      return (<div key={obj} className='status' onClick={this.setStatus.bind(this, obj)}>{obj}</div>);
    }.bind(this));
  },

  render() {
    return (
      <div className='change-status'>
        {this.renderStatusList()}
      </div>
    );
  }
});
