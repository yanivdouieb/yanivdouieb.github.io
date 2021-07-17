if (!localStorage.getItem("history")) {
  localStorage.setItem("history", "[]");
}
function $_GET(param) {
  var vars = {};
  window.location.href.replace(location.hash, "").replace(
    /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
    function (m, key, value) {
      // callback
      vars[key] = value !== undefined ? value : "";
    }
  );

  if (param) {
    return vars[param] ? vars[param] : null;
  }
  return vars;
}
if (localStorage.getItem("allow_voiceSearch") === "false") {
  document.getElementById("microRecord").style.display = "none";
}
if (window.navigator.userAgent.includes("Firefox/")) {
  document.getElementById("microRecord").style.display = "none";
} else {
  if (window.navigator.userAgent.includes("OPR/")) {
    document.getElementById("microRecord").style.display = "none";
  } else {
    if (window.navigator.userAgent.includes("Opera/")) {
      document.getElementById("microRecord").style.display = "none";
    } else {
      if (window.navigator.userAgent.includes("Opera/")) {
        document.getElementById("microRecord").style.display = "none";
      } else {
        if (window.navigator.userAgent.includes(";MSIE")) {
          document.getElementById("microRecord").style.display = "none";
        } else {
          var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
          var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;

          var grammar = "#JSGF V1.0;";

          var recognition = new SpeechRecognition();
          var speechRecognitionList = new SpeechGrammarList();
          speechRecognitionList.addFromString(grammar, 1);
          recognition.grammars = speechRecognitionList;
          recognition.lang = "en-US";
          recognition.interimResults = false;

          recognition.onresult = function (event) {
            document.getElementById(
              "microContain"
            ).innerHTML = `<lord-icon src="https://cdn.lordicon.com/fpipqhrr.json" trigger="click" colors="primary:#3818ff,secondary:#18ff9e" class="microInput" id="microRecord" stroke="76"></lord-icon>`;
            var last = event.results.length - 1;
            console.log(encodeURI(event.results[last][0].transcript));
            location.href = `./?query=${encodeURI(
              event.results[last][0].transcript
            )}`;
          };

          recognition.onspeechend = function () {
            document.getElementById(
              "microContain"
            ).innerHTML = `<lord-icon src="https://cdn.lordicon.com/fpipqhrr.json" trigger="click" colors="primary:#3818ff,secondary:#18ff9e" class="microInput" id="microRecord" stroke="76"></lord-icon>`;
            recognition.stop();
          };

          recognition.onerror = function (event) {
            document.getElementById(
              "microContain"
            ).innerHTML = `<lord-icon src="https://cdn.lordicon.com/fpipqhrr.json" trigger="click" colors="primary:#3818ff,secondary:#18ff9e" class="microInput" id="microRecord" stroke="76"></lord-icon>`;
            if (event.error === "not-allowed") {
              document.getElementById("error").innerText =
                "Voice search has been disabled";
            } else {
              document.getElementById("error").innerText =
                "An error occurred during voice search";
            }
          };

          document
            .querySelector("#microRecord")
            .addEventListener("click", function () {
              recognition.start();
              document.getElementById(
                "microContain"
              ).innerHTML = `<lord-icon src="https://cdn.lordicon.com/fpipqhrr.json" trigger="loop" colors="primary:#ee6d66,secondary:#ee6d66" class="microInput" id="microRecord" stroke="76"> </lord-icon>`;
            });
        }
      }
    }
  }
}
document.getElementById("searchInput").addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    if (!document.getElementById("searchInput").value) {
    } else {
      location.href = `./?query=${encodeURI(
        document.getElementById("searchInput").value
      )}`;
    }
  }
});

if ($_GET("query")) {
  if (localStorage.getItem("allow_history") == "true") {
    var addItem = function (query, url, time) {
      var oldItems = JSON.parse(localStorage.getItem("history")) || [];

      var newItem = {
        query_name: query,
        query_url: url,
        query_time: time,
      };

      oldItems.push(newItem);

      localStorage.setItem("history", JSON.stringify(oldItems));
    };
    addItem(
      decodeURI($_GET("query")),
      location.href,
      new Date().toLocaleString()
    );
  } else {

  }

  document.getElementById("searchInput").value = decodeURI($_GET("query"));
  document.title = `${decodeURI($_GET("query"))} - Codev`;
  fetch(
    `https://api.stackexchange.com/2.3/search?page=1&order=desc&sort=votes&intitle=${$_GET(
      "query"
    )}&site=stackoverflow&pagesize=100`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.items.length > 0) {
        for (let i = 0; i < data.items.length; i++) {
          if (localStorage.getItem("openNewTab") === "true") {
              document.getElementById("dataRes").innerHTML += `
                <li>
                    <p class="user">Posted by ${data.items[i].owner.display_name}</p>
                    <a class="linkRes" href="${data.items[i].link}" target="_blank">${data.items[i].title}</a>
                </li>`;
            } else {
              document.getElementById("dataRes").innerHTML += `
                <li>
                    <p class="user">Posted by ${data.items[i].owner.display_name}</p>
                    <a class="linkRes" href="${data.items[i].link}">${data.items[i].title}</a>
                </li>`;
            }
        }
      } else {
        document.getElementById("containerError").innerHTML += `
            <p class="error" id="error">No documents matched the specified search terms (<strong>${decodeURI(
              $_GET("query")
            )}</strong>)</p>
    <div class="helpSearch">
        <p>Suggestions:</p>
        <ul>
            <li>Check the spelling of the search terms</li>
            <li>Try other words</li>
            <li>Use more general keywords</li>
            <li>Specify fewer words</li>
        </ul>
    </div>`;
      }
    })
    .catch((error) => {
      console.log(error);
    });
  setTimeout(() => {
    fetch(
      `https://api.stackexchange.com/2.3/search?page=2&order=desc&sort=votes&intitle=${$_GET(
        "query"
      )}&site=stackoverflow&pagesize=100`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.items.length > 0) {
          for (let i = 0; i < data.items.length; i++) {
            if (localStorage.getItem("openNewTab") === "true") {
              document.getElementById("dataRes").innerHTML += `
                <li>
                    <p class="user">Posted by ${data.items[i].owner.display_name}</p>
                    <a class="linkRes" href="${data.items[i].link}" target="_blank">${data.items[i].title}</a>
                </li>`;
            } else {
              document.getElementById("dataRes").innerHTML += `
                <li>
                    <p class="user">Posted by ${data.items[i].owner.display_name}</p>
                    <a class="linkRes" href="${data.items[i].link}">${data.items[i].title}</a>
                </li>`;
            }
          }
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, 5000);
  setTimeout(() => {
    fetch(
      `https://api.stackexchange.com/2.3/search?page=3&order=desc&sort=votes&intitle=${$_GET(
        "query"
      )}&site=stackoverflow&pagesize=100`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.items.length > 0) {
          for (let i = 0; i < data.items.length; i++) {
            if (localStorage.getItem("openNewTab") === "true") {
              document.getElementById("dataRes").innerHTML += `
                <li>
                    <p class="user">Posted by ${data.items[i].owner.display_name}</p>
                    <a class="linkRes" href="${data.items[i].link}" target="_blank">${data.items[i].title}</a>
                </li>`;
            } else {
              document.getElementById("dataRes").innerHTML += `
                <li>
                    <p class="user">Posted by ${data.items[i].owner.display_name}</p>
                    <a class="linkRes" href="${data.items[i].link}">${data.items[i].title}</a>
                </li>`;
            }
          }
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, 10000);
  setTimeout(() => {
    fetch(
      `https://api.stackexchange.com/2.3/search?page=4&order=desc&sort=votes&intitle=${$_GET(
        "query"
      )}&site=stackoverflow&pagesize=100`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.items.length > 0) {
          for (let i = 0; i < data.items.length; i++) {
            if (localStorage.getItem("openNewTab") === "true") {
              document.getElementById("dataRes").innerHTML += `
                <li>
                    <p class="user">Posted by ${data.items[i].owner.display_name}</p>
                    <a class="linkRes" href="${data.items[i].link}" target="_blank">${data.items[i].title}</a>
                </li>`;
            } else {
              document.getElementById("dataRes").innerHTML += `
                <li>
                    <p class="user">Posted by ${data.items[i].owner.display_name}</p>
                    <a class="linkRes" href="${data.items[i].link}">${data.items[i].title}</a>
                </li>`;
            }
          }
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, 15000);
  setTimeout(() => {
    fetch(
      `https://api.stackexchange.com/2.3/search?page=5&order=desc&sort=votes&intitle=${$_GET(
        "query"
      )}&site=stackoverflow&pagesize=100`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.items.length > 0) {
          for (let i = 0; i < data.items.length; i++) {
            if (localStorage.getItem("openNewTab") === "true") {
              document.getElementById("dataRes").innerHTML += `
                <li>
                    <p class="user">Posted by ${data.items[i].owner.display_name}</p>
                    <a class="linkRes" href="${data.items[i].link}" target="_blank">${data.items[i].title}</a>
                </li>`;
            } else {
              document.getElementById("dataRes").innerHTML += `
                <li>
                    <p class="user">Posted by ${data.items[i].owner.display_name}</p>
                    <a class="linkRes" href="${data.items[i].link}">${data.items[i].title}</a>
                </li>`;
            }
          }
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, 20000);
  setTimeout(() => {
    fetch(
      `https://api.stackexchange.com/2.3/search?page=5&order=desc&sort=votes&intitle=${$_GET(
        "query"
      )}&site=stackoverflow&pagesize=100`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.items.length > 0) {
          for (let i = 0; i < data.items.length; i++) {
            if (localStorage.getItem("openNewTab") === "true") {
              document.getElementById("dataRes").innerHTML += `
                <li>
                    <p class="user">Posted by ${data.items[i].owner.display_name}</p>
                    <a class="linkRes" href="${data.items[i].link}" target="_blank">${data.items[i].title}</a>
                </li>`;
            } else {
              document.getElementById("dataRes").innerHTML += `
                <li>
                    <p class="user">Posted by ${data.items[i].owner.display_name}</p>
                    <a class="linkRes" href="${data.items[i].link}">${data.items[i].title}</a>
                </li>`;
            }
          }
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, 25000);
} else {
  document.title = "Error - Codev";
  location.href = "../";
}
