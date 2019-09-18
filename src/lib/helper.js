export default {
  getTypes: function(instants) {
    return Object.prototype.toString.call(instants).slice(8, -1);
  }
};
