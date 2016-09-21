import React from 'react';
import ReactDOM from 'react-dom';

import ComponentActions from '../actions/ComponentActions.js';

import ChangeStatus from './ChangeStatus.js';

var LEFT_BUTTON = 0;

export default React.createClass({

  getInitialState() {
    return {
      dragging: false
    };
  },

  style: function() {
    if (this.state.dragging) {
      return {
        position: 'absolute',
        left: this.state.left,
        top: this.state.top,
        zIndex: -1,
        width: 250
      };
    } else {
      return {};
    }
  },
  onMouseDown: function(event) {
    var pageOffset;
    if (event.button === LEFT_BUTTON) {
      event.stopPropagation();
      this.addEvents();
      pageOffset = ReactDOM.findDOMNode(this).getBoundingClientRect();
      return this.setState({
        mouseDown: true,
        originX: event.pageX,
        originY: event.pageY,
        elementX: pageOffset.left,
        elementY: pageOffset.top
      });
    }
  },
  onMouseMove: function(event) {
    var deltaX, deltaY, task = this.props;
    deltaX = event.pageX - this.state.originX;
    deltaY = event.pageY - this.state.originY;
    if (!this.state.dragging) {
      this.setState({
        dragging: true
      });
      if (task.onDragStart) {
        task.onDragStart(task);
      }
    }
    if (this.state.dragging) {
      return this.setState({
        left: this.state.elementX + deltaX + document.body.scrollLeft,
        top: this.state.elementY + deltaY + document.body.scrollTop
      });
    }
  },
  onMouseUp: function() {
    this.removeEvents();
    if (this.state.dragging) {
      this.props.onDragStop();
      return this.setState({
        dragging: false
      });
    }
  },
  addEvents: function() {
    document.addEventListener('mousemove', this.onMouseMove);
    return document.addEventListener('mouseup', this.onMouseUp);
  },
  removeEvents: function() {
    document.removeEventListener('mousemove', this.onMouseMove);
    return document.removeEventListener('mouseup', this.onMouseUp);
  },

  openChangeStatus(ev) {
    var pos = {
      top: ev.clientY + "px",
      left: ev.clientX + "px"
    };
    var task = this.props;
    ComponentActions.showOverlay({
      template: ChangeStatus,
      style: pos,
      onSave: function(data) {
        ComponentActions.updateTaskStatus({
          projectId: task.projectId,
          memberId: task.memberId,
          taskId: task.id,
          taskStatus: data
        });
      }
    });
  },

  statusToClassMapping: {
    'DONE': 'green',
    'ONHOLD': 'red',
    'INPROCESS': 'blue',
    'SENT': 'yellow',
    'SCHEDULE': 'orange'
  },

  render() {
    var taskClass = this.statusToClassMapping[this.props.status];
    return (
      <div className={'task-view ' + taskClass}
        style={this.style()}
        onMouseDown={this.onMouseDown}
        >
        <div className='task-title'>{this.props.title}</div>
        <div className='task-status'>
          <div className='status-label'>{this.props.status}</div>
          <div className='down-icon' onClick={this.openChangeStatus}></div>
        </div>
        <div className='task-desc'>{this.props.desc}</div>
      </div>
    );
  }
});
