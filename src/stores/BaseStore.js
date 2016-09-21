(function() {
  var data = {};
  module.exports = {

    setData(type, jsonData) {
        data[type] = jsonData;
    },

    getData(type) {
        return data[type];
    },

    emitChange(changeEvent) {
        this.emit(changeEvent);
    },

    addChangeListener (changeEvent, callback) {
        this.on(changeEvent, callback);
    },

    removeChangeListener (changeEvent, callback) {
        this.removeListener(changeEvent, callback);
    }
  };
})();
