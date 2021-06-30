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

fetch("https://api.publicapis.org/random")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    window.history.replaceState("", "", `?api=${btoa(data.entries[0].API)}`);
    document.getElementsByClassName("apiDescription")[0].innerHTML =
      data.entries[0].Description;
    if (!localStorage.getItem(`liked-${$_GET("api")}`)) {
      document.getElementById(
        "apiName"
      ).innerHTML = `${data.entries[0].API}&nbsp;<like id="like"><i class="far fa-heart" id="unliked"></i></like>`;
      document.getElementById("like").addEventListener("click", () => {
        if (document.getElementById("unliked")) {
          document.getElementById(
            "like"
          ).innerHTML = `<i class="fas fa-heart" id="liked"></i>`;
          localStorage.setItem(`liked-${$_GET("api")}`, true);
        } else {
          document.getElementById(
            "like"
          ).innerHTML = `<i class="far fa-heart" id="unliked"></i>`;
          localStorage.removeItem(`liked-${$_GET("api")}`);
        }
      });
    } else {
      document.getElementById(
        "apiName"
      ).innerHTML = `${data.entries[0].API}&nbsp;<like id="like"><i class="fa fa-heart" id="liked"></i></like>`;
      document.getElementById("like").addEventListener("click", () => {
        if (document.getElementById("unliked")) {
          document.getElementById(
            "like"
          ).innerHTML = `<i class="fas fa-heart" id="liked"></i>`;
          localStorage.setItem(`liked-${$_GET("api")}`, true);
        } else {
          document.getElementById(
            "like"
          ).innerHTML = `<i class="far fa-heart" id="unliked"></i>`;
          localStorage.removeItem(`liked-${$_GET("api")}`);
        }
      });
    }
    document.getElementById("apiCategory").innerText = data.entries[0].Category;
    if (data.entries[0].HTTPS === true) {
      document.getElementById("apiHTTPS").innerText = "Yes";
    } else {
      document.getElementById("apiHTTPS").innerText = "No";
    }
    if (data.entries[0].Auth === "") {
      document.getElementById("apiAuth").innerText = "No";
    } else {
      document.getElementById("apiAuth").innerText = data.entries[0].Auth;
    }
    if (data.entries[0].Cors === "unknown") {
      document.getElementById("apiCors").innerText = "Unknown";
    } else {
      if (data.entries[0].Cors === "no") {
        document.getElementById("apiCors").innerText = "No";
      } else {
        document.getElementById("apiCors").innerText = "Yes";
      }
    }
    document.getElementById(
      "image"
    ).innerHTML = ` <iframe src="${data.entries[0].Link}" frameborder="0" class="screenshot"></iframe>`;
    document.getElementById("openLink").addEventListener("click", () => {
      window.open(data.entries[0].Link);
    });
  });

setInterval(()=>{
  if($_GET('query')){
    window.location.href = `/search/?query=${$_GET('query')}`
  }
}, 100)
const uri = "http://127.0.0.1:5501/"
document.getElementById('search').addEventListener('click', ()=>{
    const search = document.getElementById('srch').value
    if(!search){
        return
    }else{
        window.history.replaceState('', '', `?query=${btoa(search)}`)
    }
})
document.getElementById('random').addEventListener('click', ()=>{
    window.location.href = '/random'
})