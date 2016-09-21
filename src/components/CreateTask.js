import React from 'react';

import ComponentActions from '../actions/ComponentActions.js';

export default React.createClass({

  getInitialState() {
    return {};
  },

  statuses: ["DONE", "ONHOLD", "INPROCESS", "SENT", "SCHEDULE"],

  getStatusOptions() {
    return this.statuses.map(function(obj) {
      return (<option key={obj} value={obj}>{obj}</option>);
    });
  },

  cancelCreate() {
    ComponentActions.hideOverlay();
  },

  createTask() {
    var data = {
      title: this.refs.taskTitle.value,
      desc: this.refs.taskDesc.value,
      status: this.refs.taskStatus.value
    };
    ComponentActions.saveOverlay(data);
  },

  render() {
    return (
      <div className='create-dialog create-task'>
        <div className='dialog-header'>
          <div className='header-label'>Create task</div>
          <div className='close-icon' onClick={this.cancelCreate}></div>
        </div>
        <div className='dialog-content'>
          <div className='form-field'>
            <div className='field-label'>Title</div>
            <div className='input-group'>
              <input type='text' placeholder='Task title...' ref='taskTitle' />
            </div>
          </div>
          <div className='form-field'>
            <div className='field-label'>Description</div>
            <div className='input-group'>
              <textarea placeholder='Task description...' ref='taskDesc'></textarea>
            </div>
          </div>
          <div className='form-field'>
            <div className='field-label'>Status</div>
            <div className='input-group'>
              <select ref='taskStatus'>
                {this.getStatusOptions()}
              </select>
            </div>
          </div>
        </div>
        <div className='dialog-actions'>
          <button className='secondary' onClick={this.cancelCreate}>Cancel</button>
          <button className='primary' onClick={this.createTask}>Create</button>
        </div>
      </div>
    );
  }
});
