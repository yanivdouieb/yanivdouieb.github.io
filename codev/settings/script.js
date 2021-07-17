document
  .getElementById("delete_history")
  .addEventListener("click", function (e) {
    const confirmation = confirm(
      "Are you sure you want to delete the history ?"
    );
    if (confirmation) {
      localStorage.setItem("history", "[]");
      location.reload();
    } else {
    }
  });
  document
  .getElementById("block_history")
  .addEventListener("click", function (e) {
    const confirmation = confirm(
      "Are you sure you want to turn off history saving ?"
    );
    if (confirmation) {
      localStorage.setItem("allow_history", "false");
      location.reload();
    } else {
    }
  });
setInterval(() => {
  if (localStorage.getItem("allow_history") == "false") {
    document.getElementById(
      "cmd_block"
    ).innerHTML = `<li id="allow_history">Enable history backup</li>`;
    document
      .getElementById("allow_history")
      .addEventListener("click", function (e) {
        const confirmation = confirm(
          "Are you sure you want enable the history backup ?"
        );
        if (confirmation) {
          localStorage.setItem("allow_history", "true");
          location.reload();
        } else {
        }
      });
  } else {
  }
}, 500);


document
  .getElementById("block_vocal")
  .addEventListener("click", function (e) {
    const confirmation = confirm(
      "Are you sure you want to block voice search ?"
    );
    if (confirmation) {
      localStorage.setItem("allow_voiceSearch", "false");
      location.reload();
    } else {
    }
  });
setInterval(() => {
  if (localStorage.getItem("allow_voiceSearch") == "false") {
    document.getElementById(
      "cmd_vocal"
    ).innerHTML = `<li id="allow_vocal">Enable voice search</li>`;
    document
      .getElementById("allow_vocal")
      .addEventListener("click", function (e) {
        const confirmation = confirm(
          "Are you sure you want to reactivate voice search ?"
        );
        if (confirmation) {
          localStorage.setItem("allow_voiceSearch", "true");
          location.reload();
        } else {
        }
      });
  } else {}
}, 500);

setInterval(() => {
  if(document.getElementById('openNewTab').checked === true){
    localStorage.setItem('openNewTab', 'true');
  }else{
    localStorage.setItem('openNewTab', 'false');
  }
}, 1)
if(localStorage.getItem('openNewTab') === 'true'){
  document.getElementById('openNewTab').checked = true;
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
document.getElementById('download_data').addEventListener('click', ()=>{
  download('codev.json', JSON.stringify(localStorage.getItem('history')))
})
document.getElementById('darkMode').addEventListener('click', ()=>{
  if(document.getElementById('darkMode').checked === true){
    localStorage.setItem('darkMode', 'true');
    location.reload()
  }else{
    localStorage.setItem('darkMode', 'false');
    location.reload()
  }
})
if(localStorage.getItem('darkMode') === 'true'){
  document.getElementById('darkMode').checked = true;
}