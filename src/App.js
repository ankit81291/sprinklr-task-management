import React, { Component } from 'react';

import Header from './components/Header.js';
import ProjectView from './components/ProjectView.js';
import MemberView from './components/MemberView.js';
import CreateProject from './components/CreateProject.js';
import CreateMember from './components/CreateMember.js';

import ComponentStore from './stores/ComponentStore.js';
import DataStore from './stores/DataStore.js';

import ActionConstants from './constants/ActionConstants.js';

import ComponentActions from './actions/ComponentActions.js';

import './styles/main.scss';

export default React.createClass({

  getInitialState() {
    return {
      headerText: "Task Management",
      showCloseHeader: false,
      showSingleProject: false,
      projects: [],
      project: {}
    };
  },

  setOverlay() {
    this.setState({
      overlay: true,
      overlayProps: ComponentStore.getData('overlayData')
    });
  },

  componentWillMount() {
    ComponentStore.addChangeListener(ActionConstants.SHOW_OVERLAY, this.setOverlay);
    ComponentStore.addChangeListener(ActionConstants.HIDE_OVERLAY, this.hideOverlay);
    ComponentStore.addChangeListener(ActionConstants.HEADER_CLOSE, this.returnHomePage);
    ComponentStore.addChangeListener(ActionConstants.OVERLAY_SAVE, this.saveOverlayData);
    DataStore.addChangeListener(ActionConstants.DATA_UPDATE, this.setProjectData);
  },

  setProjectData() {
    this.setState({
      projects: DataStore.getData('projects')
    });
  },

  componentDidMount() {
    this.setProjectData();
  },

  componentWillUnmount() {
    ComponentStore.removeChangeListener(ActionConstants.SHOW_OVERLAY, this.setOverlay);
    ComponentStore.removeChangeListener(ActionConstants.HIDE_OVERLAY, this.hideOverlay);
    ComponentStore.removeChangeListener(ActionConstants.HEADER_CLOSE, this.returnHomePage);
    ComponentStore.removeChangeListener(ActionConstants.OVERLAY_SAVE, this.saveOverlayData);
    DataStore.removeChangeListener(ActionConstants.DATA_UPDATE, this.setProjectData);
  },

  onDragStart: function(task) {
    return this.setState({
      currentDragTask: task
    });
  },
  onDragStop: function() {
    return this.setState({
      currentDragTask: null
    });
  },
  onDrop: function(target) {
    var dragTask = this.state.currentDragTask;
    if(dragTask) {
      ComponentActions.moveTask({
        projectId: dragTask.projectId,
        sourceMemberId: dragTask.memberId,
        taskId: dragTask.id,
        targetMemberId: target.id
      });
    }
  },

  createSpecificProjectDetails() {
    var members = this.state.project.members;
    var membersDiv = members.map(function(obj) {
      return (
        <div key={obj.id} className='screen-4 border-view'>
          <MemberView {...obj} projectId={this.state.project.id}
            onDragStart={this.onDragStart}
            onDragStop={this.onDragStop}
            onDrop={this.onDrop}
            currentDragTask={this.state.currentDragTask} />
        </div>);
    }.bind(this));

    return (
      <div>
        {membersDiv}
        <div className='screen-4 border-view'>
          <div className='member-view new-member'>
            <div className='header' onClick={this.showCreateMember}>
              Add new member
            </div>
          </div>
        </div>
      </div>
    );
  },

  showCreateMember(ev) {
    var pos = {
      top: ev.clientY + "px",
      left: ev.clientX + "px"
    };
    var projectId = this.state.project.id;
    ComponentActions.showOverlay({
      template: CreateMember,
      style: pos,
      onSave: function(data) {
        ComponentActions.createMember({
          projectId: projectId,
          member: data
        });
      }
    });
  },

  showProject(project) {
    this.setState({
      showSingleProject: true,
      project: project
    });
  },

  returnHomePage() {
    this.setState({
      showSingleProject: false,
      project: {}
    });
  },

  saveOverlayData() {
    if(this.state.overlayProps && this.state.overlayProps.onSave) {
      var overlaySaveData = ComponentStore.getData('overlaySaveData');
      this.state.overlayProps.onSave.call(this, overlaySaveData);
    }
    this.hideOverlay();
  },

  showCreateProject(ev) {
    var pos = {
      top: ev.clientY + "px",
      left: ev.clientX + "px"
    };
    ComponentActions.showOverlay({
      template: CreateProject,
      style: pos,
      onSave: function(data) {
        ComponentActions.createProject({
          project: data
        });
      }
    });
  },

  createProjectCards() {
    var projectCards = this.state.projects.map(function(obj) {
      return (
        <div key={obj.id} className='screen-3' onClick={this.showProject.bind(this, obj)}>
          <ProjectView projectTitle={obj.title} projectDesc={obj.desc} projectMembers={obj.members.length} />
        </div>);
    }.bind(this));
    return (
      <div>
        {projectCards}
        <div className='screen-3' onClick={this.showCreateProject}>
          <div className='project-body new-project'>
            <div className='new-icon'></div>
            <div className='project-title'>Create project</div>
          </div>
        </div>
      </div>
    );
  },

  createBody() {
    if(this.state.showSingleProject && this.state.project) {
      return this.createSpecificProjectDetails();
    } else {
      return this.createProjectCards();
    }
  },

  showOverlay() {
    if(this.state.overlay && this.state.overlayProps) {
      return (
        <div className='overlay' style={this.state.overlayProps.style}>
          <div className='overlay-backdrop' onClick={this.hideOverlay}></div>
          <div className='overlay-content'>
            <this.state.overlayProps.template />
          </div>
        </div>
      );
    }
  },

  hideOverlay() {
    this.setState({
      overlay: false,
      overlayProps: {}
    });
  },


  render() {
    var mainClass = 'main-container';
    if(this.state.overlay && this.state.overlayProps) {
      mainClass += ' overlay-show';
    }
    return (<div>
      <Header headerText={this.state.project.title || this.state.headerText} showClose={this.state.showSingleProject}></Header>
      <div className={mainClass}>
        {this.createBody()}
      </div>
      {this.showOverlay()}
    </div>);
  }
});
