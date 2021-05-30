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
function updateBg(){
  var bgV = atob($_GET('bg'))
  var bg = document.getElementById('bg')
  bg.style.background = bgV
}
function updateName(){
  var nameV = atob($_GET('name'))
  var name = document.getElementsByTagName('name')[0]
  name.innerHTML = nameV
}
function updateEmoji(){
  var emojiV = String.fromCodePoint(parseInt ($_GET('emoji'), 16))
  var emoji = document.getElementsByTagName('Emoji')[0]
  emoji.innerHTML = emojiV
}
function updateMsg(){
  var msgV = atob($_GET('msg'))
  var msg = document.getElementById('msg')
  msg.innerText = msgV
}
function updateFont(){
  var fontV = atob($_GET('font'))
  var font = document.getElementsByTagName('body')[0]
  font.style.fontFamily = fontV
}
try{
  updateFont()
  updateMsg()
  updateEmoji()
  updateName()
  updateBg()
}catch(err){
  document.getElementsByTagName('body')[0].innerHTML = ""
  document.getElementsByTagName('body')[0].style.fontFamily = "Poppins"
  Swal.fire({
    title: 'Invalid link !',
    text: 'The link you just entered is invalid! Check the link or contact your network administrator...',
    icon: 'error',
    confirmButtonText: 'OK'
  }).then((response)=>{
    if(response.isConfirmed){
      window.history.go(-1);
    }
  })
}