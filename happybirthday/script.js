var Name = document.getElementById("hi");
var bg = document.getElementById("bg");
document.getElementById("name").value = localStorage.getItem("name");
function updateName() {
  var nameV = document.getElementById("name").value;
  Name.innerHTML = `Hi <name>${nameV}</name> !`;
  localStorage.setItem("name", nameV);
}
function updateColor() {
  localStorage.setItem("bgColor", bg.style.background);
  var colorV = document.getElementById("color");
  if (!localStorage.getItem("bgColor")) {
    if (colorV.value === "select") bg.style.background = "rgb(232, 238, 253)";
    if (colorV.value === "red")
      bg.style.background = "linear-gradient(180deg, #FFE3D8 0%, #E46060 100%)";
    if (colorV.value === "yellow")
      bg.style.background = "linear-gradient(180deg, #F9FFD8 0%, #E4C760 100%)";
    if (colorV.value === "green")
      bg.style.background = "linear-gradient(180deg, #D8FFD8 0%, #60E47D 100%)";
    if (colorV.value === "lightblue")
      bg.style.background = "linear-gradient(180deg, #D8FFF6 0%, #60D5E4 100%)";
    if (colorV.value === "darkblue")
      bg.style.background = "linear-gradient(180deg, #D8E3FF 0%, #3E44E1 100%)";
    if (colorV.value === "purple")
      bg.style.background = "linear-gradient(180deg, #F2D8FF 0%, #C260E4 100%)";
  } else {
    colorV.addEventListener("change", () => {
      if (colorV.value === "select") bg.style.background = "rgb(232, 238, 253)";
      if (colorV.value === "red")
        bg.style.background =
          "linear-gradient(180deg, #FFE3D8 0%, #E46060 100%)";
      if (colorV.value === "yellow")
        bg.style.background =
          "linear-gradient(180deg, #F9FFD8 0%, #E4C760 100%)";
      if (colorV.value === "green")
        bg.style.background =
          "linear-gradient(180deg, #D8FFD8 0%, #60E47D 100%)";
      if (colorV.value === "lightblue")
        bg.style.background =
          "linear-gradient(180deg, #D8FFF6 0%, #60D5E4 100%)";
      if (colorV.value === "darkblue")
        bg.style.background =
          "linear-gradient(180deg, #D8E3FF 0%, #3E44E1 100%)";
      if (colorV.value === "purple")
        bg.style.background =
          "linear-gradient(180deg, #F2D8FF 0%, #C260E4 100%)";
    });
  }
}
var Emoji = document.getElementById("Emoji");
var EmojiV = document.getElementById("emoji");
function updateEmoji() {
  localStorage.setItem("emoji", EmojiV.value);
  Emoji.innerText = EmojiV.value;
}
var msgV = document.getElementById("text");
msgV.value =
  "Make the most of this day when everything is permitted, or almost ... Happy birthday! Today is a doubly important day: the one when we wish you a happy birthday, and the one where we remind you with these few words that you are an important person in our eyes. Happy Birthday !";
function updateMessage() {
  var msg = document.getElementById("msg");
  msg.innerText = msgV.value;
  localStorage.setItem("msg", msgV.value);
}
var fontV = document.getElementById("font");
var font = document.getElementsByClassName("live")[0];
function updateFont() {
  fontV.addEventListener("change", () => {
    if (!localStorage.getItem("font")) {
      if (fontV.value === "select") font.style.fontFamily = "Poppins";
      if (fontV.value === "limelight") font.style.fontFamily = "Limelight";
      if (fontV.value === "odibee") font.style.fontFamily = "Odibee Sans";
      if (fontV.value === "sigmar") font.style.fontFamily = "Sigmar One";
      if (fontV.value === "stint")
        font.style.fontFamily = "Stint Ultra Condensed";
      if (fontV.value === "pattaya") font.style.fontFamily = "Pattaya";
      if (fontV.value === "kuaiLe") font.style.fontFamily = "ZCOOL KuaiLe";
      if (fontV.value === "varela") font.style.fontFamily = "Varela Round";
      if (fontV.value === "indie") font.style.fontFamily = "Indie Flower";
      if (fontV.value === "amatic") font.style.fontFamily = "Amatic SC";
    } else {
      if (fontV.value === "select")
        font.style.fontFamily = localStorage.getItem("font");
      if (fontV.value === "limelight") font.style.fontFamily = "Limelight";
      if (fontV.value === "odibee") font.style.fontFamily = "Odibee Sans";
      if (fontV.value === "sigmar") font.style.fontFamily = "Sigmar One";
      if (fontV.value === "stint")
        font.style.fontFamily = "Stint Ultra Condensed";
      if (fontV.value === "pattaya") font.style.fontFamily = "Pattaya";
      if (fontV.value === "kuaiLe") font.style.fontFamily = "ZCOOL KuaiLe";
      if (fontV.value === "varela") font.style.fontFamily = "Varela Round";
      if (fontV.value === "indie") font.style.fontFamily = "Indie Flower";
      if (fontV.value === "amatic") font.style.fontFamily = "Amatic SC";
    }
  });
  localStorage.setItem("font", font.style.fontFamily);
}
var send = document.getElementById("send");
send.addEventListener("click", () => {
  function emojiUnicode(emoji) {
    var comp;
    if (emoji.length === 1) {
      comp = emoji.charCodeAt(0);
    }
    comp =
      (emoji.charCodeAt(0) - 0xd800) * 0x400 +
      (emoji.charCodeAt(1) - 0xdc00) +
      0x10000;
    if (comp < 0) {
      comp = emoji.charCodeAt(0);
    }
    return comp.toString("16");
  }
  var uBgColor = btoa(localStorage.getItem("bgColor"));
  var uEmoji = emojiUnicode(localStorage.getItem("emoji"));
  var uFont = btoa(localStorage.getItem("font"));
  var uName = btoa(localStorage.getItem("name"));
  var uMsg = btoa(localStorage.getItem("msg"));
  var baseUrl = "/happybirthday/happy/";
  var url = `${baseUrl}?bg=${uBgColor}&emoji=${uEmoji}&font=${uFont}&name=${uName}&msg=${uMsg}`;
  var api = "12abbdbc8a193980157fc64cea4190d1be77c";
  document.getElementsByTagName(
    "body"
  )[0].innerHTML += `<input type="text" value="${url}" id="copyInput">`;
  const copy = document.getElementById("copyInput");
  copy.select();
  copy.setSelectionRange(0, 99999);
  document.execCommand("copy");
  Swal.fire({
    title: "URL copied !",
    icon: "success",
    confirmButtonText: "OK",
    timer: 3000,
    timerProgressBar: true,
  });
  setTimeout(() => {
    window.open(url);
    location.reload();
  }, 3000);
});
setInterval(() => {
  updateFont();
  updateMessage();
  updateEmoji();
  updateName();
  updateColor();
}, 100);
bg.style.background = localStorage.getItem("bgColor");
Name.innerHTML = `Hi <name>${localStorage.getItem("name")}</name> !`;
EmojiV.value = localStorage.getItem("emoji");
msgV.value = localStorage.getItem("msg");
font.style.fontFamily = localStorage.getItem("font");
