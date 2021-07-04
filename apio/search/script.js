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
if(!$_GET('query')){
  window.location.href = '/'
}
const uri = "http://127.0.0.1:5501/"
document.getElementById('search').addEventListener('click', ()=>{
    const search = document.getElementById('srch').value
    if(!search){
        return
    }else{
        window.location.href = `./?query=${btoa(search)}`
    }
})
document.getElementById('random').addEventListener('click', ()=>{
    window.location.href = './random'
})
fetch(`https://api.publicapis.org/entries?title=${atob($_GET('query'))}`)
  .then((res)=>{return res.json()})
  .then((Data)=>{
    var data = Data.entries
    try{
      for(var i = 0; i<data.length; i++){
        document.getElementById('container').innerHTML += `
        <div class="item">
        <h1 class="apiName" id="apiName-${btoa(data[i].API)}">${data[i].API}&nbsp;<like id="like"><i class="far fa-heart" id="unliked"></i></like></h1>
        <p class="apiDescription" id="apiDescription">
            ${data[i].Description}
        </p>
        <button class="apiLoad" id="apiLoad-${btoa(data[i].API)}" onclick="window.location.href = \`./api/?api=${btoa(data[i].API)}\`">MORE INFORMATIONS 💡</button>
    </div>`
        if(localStorage.getItem(`liked-${btoa(data[i].API)}`)){
            document.getElementById(`apiName-${btoa(data[i].API)}`).innerHTML = `${data[i].API}&nbsp;<like id="like"><i class="fa fa-heart" id="liked"></i></like>`
        }
      }
      document.getElementsByClassName('loading')[0].className = 'load'
    }catch{
      document.getElementsByClassName('loading')[0].className = 'load'
      document.getElementById('err').innerHTML = `No results for : <strong>${atob($_GET('query'))}</strong>`
    }
      
  })
