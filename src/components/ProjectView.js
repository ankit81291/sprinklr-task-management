import React from 'react';

export default React.createClass({

  render() {
    return (
      <div className='project-body'>
        <div className='project-title'>{this.props.projectTitle}</div>
        <div className='project-desc'>{this.props.projectDesc}</div>
        <div className='project-highlight'>Total members: {this.props.projectMembers}</div>
      </div>
    );
  }
});
