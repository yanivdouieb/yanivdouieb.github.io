if (localStorage.getItem("allow_history") == "false") {
  document.getElementById("history").innerHTML =
    '<h1 class="noHistory">You have deactivated the history saving...</h1>';
} else {
  document.getElementById("delete").addEventListener("click", () => {
    const confirmation = confirm("Are you sure you want to delete the history ?");
    if (confirmation) {
      localStorage.setItem("history", "[]");
      location.reload();
    }else{
    }
  });
  if (localStorage.getItem("history") == "[]") {
    document.getElementById("history").innerHTML =
      '<h1 class="noHistory">No recent history...</h1>';
  } else {
    var history_data = JSON.parse(localStorage.getItem("history"));
    document.getElementById(
      "nmb"
    ).innerHTML = `${history_data.length} result(s)`;
    for (var i = 0; i < history_data.length; i++) {
      var last = document.getElementById("hsty").innerHTML;
      document.getElementById("hsty").innerHTML = `<li>
                    <p class="time">${history_data[i].query_time}</p><a class="linkHistory" href="${history_data[i].query_url}">SEARCH : ${history_data[i].query_name}</a>
                </li>
                ${last}`;
    }
  }
}
