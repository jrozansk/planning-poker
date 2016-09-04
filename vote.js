if(!!window.EventSource) {
  var source = new EventSource('/vote_enabled')

  source.onmessage = function(e) {
    if(e.data == "true") {
      document.getElementById("voting_pane").style.visibility = "visible";
      document.getElementById("waiting_pane").style.visibility = "hidden";
    } else {
      document.getElementById("voting_pane").style.visibility = "hidden";
      document.getElementById("waiting_pane").style.visibility = "visible";
    }
  }
}