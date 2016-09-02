if(!!window.EventSource) {
  var source = new EventSource('/clients')

  source.onmessage = function(e) {
    document.body.innerHTML += e.data + '<br />';
  }
}