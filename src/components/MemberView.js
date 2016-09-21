import React from 'react';
import TaskView from './TaskView.js';

import ComponentActions from '../actions/ComponentActions.js';

import CreateTask from './CreateTask.js';

var target;
export default React.createClass({

  // findNodeByClassName(node, className) {
  //   if(node.classList.contains(className)) {
  //     return node;
  //   } else {
  //     return this.findNodeByClassName(node.parentNode, className);
  //   }
  // },

  // dragStart: function(e) {
  //   this.dragged = this.findNodeByClassName(e.target, 'task-view');
  //   e.dataTransfer.effectAllowed = 'move';
  //
  //   // Firefox requires calling dataTransfer.setData
  //   // for the drag to properly work
  //   e.dataTransfer.setData("text/html", this.dragged);
  // },
  // dragEnd: function(data) {
  //   if(!this.over || !this.dragged) { return; }
  //   this.over.parentNode.removeChild(placeholder);
  //   this.dragged.style.display = "block";
  //   // Update state
  //   // var destinationTableNode = this.findNodeByClassName(this.over, "table"),
  //   //   sourceTableNode = this.findNodeByClassName(this.dragged, "table"),
  //   //   destinationArrName = destinationTableNode.dataset.table,
  //   //   sourceArrName = sourceTableNode.dataset.table,
  //   //   destinationTripId = this.state[destinationTableNode.dataset.tripid],
  //   //   sourceTripId = this.state[sourceTableNode.dataset.tripid];
  //   //
  //   // if(destinationTripId === sourceTripId) {
  //   //   return;
  //   // }
  //   // var sourceTableArr = this.state[sourceArrName],
  //   //     destinationTableArr = this.state[destinationArrName];
  //   // var sourceIndex = _.findIndex(sourceTableArr, function(o) { return o.cnote === data.cnote });
  //   // if(sourceIndex !== -1) {
  //   //   //remove from source table
  //   //   sourceTableArr.splice(sourceIndex, 1);
  //   //
  //   //   //add in destination table
  //   //   data.newTripId = destinationTripId;
  //   //   destinationTableArr.push(data);
  //   //   // this.state[sourceArrName] = sourceTableArr;
  //   //   // this.state[destinationArrName] = destinationTableArr;
  //   //   this.setState({});
  //   // }
  // },
  // dragOver: function(e) {
  //   e.preventDefault();
  //   if(!this.dragged) { return; }
  //   this.dragged.style.display = "none";
  //   if(target.className == "placeholder") return;
  //   this.over = target;
  //   target.parentNode.insertBefore(placeholder, target);
  // },

  getInitialState() {
    return {
      hoverTarget: false
    };
  },

  createTasks() {
    return this.props.tasks.map(function(obj) {
      return (<TaskView
        key={obj.id} {...obj}
        projectId={this.props.projectId}
        memberId={this.props.id}
        onDragStart = {this.props.onDragStart}
        onDragStop = {this.props.onDragStop}
        / >);
    }.bind(this));
  },

  showCreateTask(ev) {
    var pos = {
      top: ev.clientY + "px",
      left: ev.clientX + "px"
    };
    var member = this.props;
    ComponentActions.showOverlay({
      template: CreateTask,
      style: pos,
      onSave: function(data) {
        ComponentActions.createTask({
          projectId: member.projectId,
          memberId: member.id,
          task: data
        });
      }
    });
  },

  onMouseEnterTarget() {
    return this.setState({
      hoverTarget: true
    });
  },

  onMouseLeaveTarget() {
    return this.setState({
      hoverTarget: false
    });
  },

  active() {
    var item, ref1;
    item = this.props.currentDragTask;
    return item && item.memberId !== this.props.id;
  },

  onDrop() {
    if(this.active()) {
      return this.props.onDrop && this.props.onDrop(this.props);
    }
  },

  render() {
    var taskDropTargetClassname = (function(_this) {
      if(_this.state.hoverTarget && _this.props.currentDragTask) {
        return 'drop-target';
      } else return '';
    })(this);
    return (
      <div className='member-view'>
        <div className='header'>
          {this.props.name}
        </div>
        <div className='tasks'>
          {this.createTasks()}
        </div>
        <div className={'new-task task-view ' + taskDropTargetClassname}
          onClick={this.showCreateTask}
          onMouseEnter={this.onMouseEnterTarget}
          onMouseLeave={this.onMouseLeaveTarget}
          onMouseUp={this.onDrop} >
          <div className='new-icon'></div>
          <div className='task-title'>Create task</div>
        </div>
      </div>
    );
  }
});
