import React from 'react';

import ComponentActions from '../actions/ComponentActions.js';

export default React.createClass({

  cancelCreate() {
    ComponentActions.hideOverlay();
  },

  createMember() {
    var data = {
      name: this.refs.memberName.value
    };
    ComponentActions.saveOverlay(data);
  },

  render() {
    return (
      <div className='create-dialog create-task'>
        <div className='dialog-header'>
          <div className='header-label'>Add member</div>
          <div className='close-icon' onClick={this.cancelCreate}></div>
        </div>
        <div className='dialog-content'>
          <div className='form-field'>
            <div className='field-label'>Member name</div>
            <div className='input-group'>
              <input type='text' placeholder='Member name...' ref='memberName' />
            </div>
          </div>
        </div>
        <div className='dialog-actions'>
          <button className='secondary' onClick={this.cancelCreate}>Cancel</button>
          <button className='primary' onClick={this.createMember}>Create</button>
        </div>
      </div>
    );
  }
});
