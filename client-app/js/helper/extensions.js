String.prototype.format = function(params){
  var formatted = this;
  var fn = function(key, value){
    var regexp = new RegExp('\\{' + key + '\\}', 'gi');
    formatted = formatted.replace(regexp, value);
  };

  if (typeof(params) == 'object') {
    for (var x in params) {
      fn(x, params[x]);
    }
  } else {
    for (var i = 0; i < arguments.length; i++) {
      fn(i, arguments[i]);
    }
  }
  return formatted;
};