import React from 'react';

import ComponentActions from '../actions/ComponentActions.js';

export default React.createClass({

  cancelCreate() {
    ComponentActions.hideOverlay();
  },

  createProject() {
    var data = {
      title: this.refs.projectTitle.value,
      desc: this.refs.projectDesc.value,
    };
    ComponentActions.saveOverlay(data);
  },

  render() {
    return (
      <div className='create-dialog create-task'>
        <div className='dialog-header'>
          <div className='header-label'>Create project</div>
          <div className='close-icon' onClick={this.cancelCreate}></div>
        </div>
        <div className='dialog-content'>
          <div className='form-field'>
            <div className='field-label'>Title</div>
            <div className='input-group'>
              <input type='text' placeholder='Project title...' ref='projectTitle' />
            </div>
          </div>
          <div className='form-field'>
            <div className='field-label'>Description</div>
            <div className='input-group'>
              <textarea placeholder='Project description...' ref='projectDesc'></textarea>
            </div>
          </div>
        </div>
        <div className='dialog-actions'>
          <button className='secondary' onClick={this.cancelCreate}>Cancel</button>
          <button className='primary' onClick={this.createProject}>Create</button>
        </div>
      </div>
    );
  }
});
