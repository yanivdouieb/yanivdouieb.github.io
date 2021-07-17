if(!localStorage.getItem('history')){
  localStorage.setItem('history', "[]");
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
            document.getElementById('microContain').innerHTML = `<lord-icon src="https://cdn.lordicon.com/fpipqhrr.json" trigger="click" colors="primary:#3818ff,secondary:#18ff9e" class="microInput" id="microRecord" stroke="76"></lord-icon>`
            var last = event.results.length - 1;
            console.log(encodeURI(event.results[last][0].transcript));
            location.href = `./search/?query=${encodeURI(event.results[last][0].transcript)}`
          };

          recognition.onspeechend = function () {
            document.getElementById('microContain').innerHTML = `<lord-icon src="https://cdn.lordicon.com/fpipqhrr.json" trigger="click" colors="primary:#3818ff,secondary:#18ff9e" class="microInput" id="microRecord" stroke="76"></lord-icon>`
            recognition.stop();
          };

          recognition.onerror = function (event) {
            document.getElementById('microContain').innerHTML = `<lord-icon src="https://cdn.lordicon.com/fpipqhrr.json" trigger="click" colors="primary:#3818ff,secondary:#18ff9e" class="microInput" id="microRecord" stroke="76"></lord-icon>`
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
              document.getElementById('microContain').innerHTML = `<lord-icon src="https://cdn.lordicon.com/fpipqhrr.json" trigger="loop" colors="primary:#ee6d66,secondary:#ee6d66" class="microInput" id="microRecord" stroke="76"> </lord-icon>`
            });
        }
      }
    }
  }
}
document.getElementById('searchInput').addEventListener('keyup', (event)=>{
  if(event.key === "Enter"){
    if(!document.getElementById('searchInput').value){
      
    }else{
      location.href = `./search/?query=${encodeURI(document.getElementById('searchInput').value)}`
    }
  }
})
if(localStorage.getItem('allow_voiceSearch') === "false"){
  document.getElementById("microRecord").style.display = "none";
}