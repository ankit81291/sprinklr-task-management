import { EventEmitter } from "events";

import BaseStore from "./BaseStore";

import AppDispatcher from "../dispatcher/AppDispatcher";
import ActionConstants from "../constants/ActionConstants";

let DataStore = Object.assign({}, BaseStore, EventEmitter.prototype);

DataStore.setData('projects', [{
  id: 1,
  title: "Publishing",
  desc: "ABCSJHJ",
  members: [{
    id: 1,
    name: "Abhinav Sanghi",
    tasks: [{
      id: 1,
      title: "Publishing view",
      status: "DONE",
      desc: "Addffdffd"
    }, {
      id: 2,
      title: "Icon creation",
      status: "ONHOLD",
      desc: "Need a new icon set."
    }, {
      id: 3,
      title: "New view",
      status: "SENT",
      desc: "Create a new view"
    }]
  }, {
    id: 2,
    name: "Surbhi",
    tasks: [{
      id: 1,
      title: "Icon creation",
      status: "ONHOLD",
      desc: "Need a new icon set."
    }]
  }, {
    id: 3,
    name: "Pratibha Joshi",
    tasks: [{
      id: 1,
      title: "New API",
      status: "SENT",
      desc: "Create a new Api"
    }]
  }]
}, {
  id: 2,
  title: "Coding",
  desc: "ABCSJHJ",
  members: [{
    id: 1,
    name: "Abhinav Sanghi",
    tasks: [{
      id: 1,
      title: "Publishing view",
      status: "DONE",
      desc: "Addffdffd"
    }, {
      id: 2,
      title: "Icon creation",
      status: "ONHOLD",
      desc: "Need a new icon set."
    }, {
      id: 3,
      title: "New view",
      status: "SENT",
      desc: "Create a new view"
    }]
  }, {
    id: 2,
    name: "Surbhi",
    tasks: [{
      id: 1,
      title: "Icon creation",
      status: "ONHOLD",
      desc: "Need a new icon set."
    }]
  }, {
    id: 3,
    name: "Pratibha Joshi",
    tasks: [{
      id: 1,
      title: "New API",
      status: "SENT",
      desc: "Create a new Api"
    }]
  }]
}, {
  id: 3,
  title: "Printing",
  desc: "ABCSJHJ",
  members: [{
    id: 1,
    name: "Abhinav Sanghi",
    tasks: [{
      id: 1,
      title: "Publishing view",
      status: "DONE",
      desc: "Addffdffd"
    }, {
      id: 2,
      title: "Icon creation",
      status: "ONHOLD",
      desc: "Need a new icon set."
    }, {
      id: 3,
      title: "New view",
      status: "SENT",
      desc: "Create a new view"
    }]
  }, {
    id: 2,
    name: "Surbhi",
    tasks: [{
      id: 1,
      title: "Icon creation",
      status: "ONHOLD",
      desc: "Need a new icon set."
    }]
  }, {
    id: 3,
    name: "Pratibha Joshi",
    tasks: [{
      id: 1,
      title: "New API",
      status: "SENT",
      desc: "Create a new Api"
    }]
  }]
}]);

function getProjectById(projectId) {
  var projects = DataStore.getData('projects');
  var project = projects.filter(function(obj) {
    return obj.id === projectId;
  });
  return project ? project[0] : null;
}

function getMemberById(projectId, memberId) {
  var project = getProjectById(projectId), member;
  if(project) {
    member = project.members.filter(function(obj) {
      return obj.id === memberId;
    });
  }
  return member ? member[0] : null;
}

function getTaskById(projectId, memberId, taskId) {
  var member = getMemberById(projectId, memberId), task;
  if(member) {
    task = member.tasks.filter(function(obj) {
      return obj.id === taskId;
    });
  }
  return task ? task[0] : null;
}

function findIndex(arr, findObject, prop) {
  var index = -1;
  arr.some(function(obj, i) {
    if(obj[prop] === findObject[prop]) {
      index = i;
      return true;
    }
  });
  return index;
}

let dispatcherListener = function dispatcherListener(action) {

    var options = action.options, actionData = action.data;
    switch (action.actionType) {
        case ActionConstants.UPDATE_TASK:
            var task = getTaskById(actionData.projectId, actionData.memberId, actionData.taskId);
            task.status = actionData.taskStatus;
            DataStore.emitChange(ActionConstants.DATA_UPDATE);
            break;

        case ActionConstants.CREATE_TASK:
            var member = getMemberById(actionData.projectId, actionData.memberId);
            if(!member.tasks) {
              member.tasks = [];
            }
            var newTaskIndex = member.tasks.length;
            if(newTaskIndex !== 0) {
              actionData.task.id = member.tasks[newTaskIndex-1].id + 1;
            } else {
              actionData.task.id = 1;
            }
            member.tasks.push(actionData.task);
            DataStore.emitChange(ActionConstants.DATA_UPDATE);
            break;

        case ActionConstants.CREATE_PROJECT:
            var projects = DataStore.getData('projects');
            var newProjectIndex = projects.length;
            if(newProjectIndex !== 0) {
              actionData.project.id = projects[newProjectIndex-1].id + 1;
            } else {
              actionData.project.id = 1;
            }
            actionData.project.members = [];
            projects.push(actionData.project);
            DataStore.emitChange(ActionConstants.DATA_UPDATE);
            break;

        case ActionConstants.CREATE_MEMBER:
            var project = getProjectById(actionData.projectId);
            if(!project.members) {
              project.members = [];
            }
            var newMemberIndex = project.members.length;
            if(newMemberIndex !== 0) {
              actionData.member.id = project.members[newMemberIndex-1].id + 1;
            } else {
              actionData.member.id = 1;
            }
            actionData.member.tasks = [];
            project.members.push(actionData.member);
            DataStore.emitChange(ActionConstants.DATA_UPDATE);
            break;

        case ActionConstants.MOVE_TASK:
          var sourceMember = getMemberById(actionData.projectId, actionData.sourceMemberId);
          var targetMember = getMemberById(actionData.projectId, actionData.targetMemberId);
          var taskToMove = getTaskById(actionData.projectId, actionData.sourceMemberId, actionData.taskId);
          var taskIndex = findIndex(sourceMember.tasks, taskToMove, 'id');
          sourceMember.tasks.splice(taskIndex, 1);
          if(!targetMember.tasks) {
            targetMember.tasks = [];
          }
          var newTaskId = targetMember.tasks.length;
          if(newTaskId !== 0) {
            taskToMove.id = targetMember.tasks[newTaskId-1].id + 1;
          } else {
            taskToMove.id = 1;
          }
          targetMember.tasks.push(taskToMove);
          DataStore.emitChange(ActionConstants.DATA_UPDATE);
          break;
        default:
            break;
    }
};

DataStore.dispatchToken = AppDispatcher.register(dispatcherListener);

export default DataStore;
