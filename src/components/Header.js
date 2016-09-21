import React from 'react';

import ComponentActions from '../actions/ComponentActions.js';

export default React.createClass({

  headerCloseClicked() {
    ComponentActions.headerCloseClicked();
  },

  showCloseButton() {
    if(this.props.showClose) {
      return (<div className='close-icon' onClick={this.headerCloseClicked}></div>);
    } else {
      return (null);
    }
  },

  render() {
      return (
        <div className="app-header">
          <div className="header-label header-text boldFont">
            {this.props.headerText}
          </div>
          {this.showCloseButton()}
        </div>
      );
    }
});
