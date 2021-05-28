const mailjs = new Mailjs,
    mailInput = document.getElementById("dta_email"),
    emailCopy = document.getElementsByTagName("email")[0],
    passInput = document.getElementById("dta_pass"),
    newInput = document.getElementsByTagName("new")[0],
    login = document.getElementsByTagName("connexion")[0],
    pass = document.getElementsByTagName("password")[0],
    deleted = document.getElementsByTagName("delete")[0],
    create = document.getElementsByTagName("create")[0],
    progress = document.getElementById("progress"),
    dtaProgress = document.getElementsByClassName("spn")[0];

function TOKEN() {
    console.log("1");
    var e = localStorage.getItem("token"),
        t = localStorage.getItem("id");
    mailjs.token = e, mailjs.id = t
}

function newEmail() {
    mailjs.token = "", mailjs.id = "", mailjs.createOneAccount().then(function(e) {
        mailInput.innerText = e.data.username, mailInput.value = e.data.username, localStorage.setItem("dta_email", e.data.username), localStorage.setItem("dta_pass", e.data.password), mailjs.login(e.data.username, e.data.password).then(e => {
            localStorage.setItem("token", e.data.token), localStorage.setItem("id", e.data.id), setPass(), setTimeout(() => {
                TOKEN()
            }, 2e3)
        })
    })
}

function setEmail(e) {
    const t = localStorage.getItem("dta_email");
    mailInput.innerText = t, mailInput.value = t, console.log(e)
}

function copyEmail() {
    const e = localStorage.getItem("dta_email");
    emailCopy.innerHTML += `<input type="text" value="${e}" id="copyInput">`;
    const t = document.getElementById("copyInput");
    t.select(), t.setSelectionRange(0, 99999), document.execCommand("copy"), emailCopy.innerHTML = `<i class="fas fa-envelope"></i>&nbsp;&nbsp;<p id="dta_email">${e}</p>`, Swal.fire({
        title: "Email copied !",
        icon: "success",
        confirmButtonText: "OK"
    })
}

function copyPass() {
    const e = localStorage.getItem("dta_pass");
    pass.innerHTML += `<input type="text" value="${e}" id="copyInput">`;
    const t = document.getElementById("copyInput");
    t.select(), t.setSelectionRange(0, 99999), document.execCommand("copy"), pass.innerHTML = `<i class="fas fa-key"></i><br><p id="dta_pass">${e}</p>`, Swal.fire({
        title: "Password copied !",
        icon: "success",
        confirmButtonText: "OK"
    })
}

function setPass() {
    const e = localStorage.getItem("dta_pass");
    passInput.innerText = e
}

function deleteMail() {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: !0,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then(e => {
        e.isConfirmed && mailjs.deleteMe().then(e => {
            Swal.fire("Deleted!", "The account has been deleted.", "success"), newEmail()
        })
    })
}
emailCopy.addEventListener("click", () => {
    copyEmail()
}), deleted.addEventListener("click", () => {
    deleteMail()
}) && (localStorage.getItem("dta_email") ? setEmail() : newEmail()), passInput.addEventListener("click", () => {
    const e = localStorage.getItem("dta_pass");
    Swal.fire({
        title: "Password",
        html: `Password is ${e}`,
        timer: 7e3,
        timerProgressBar: !0,
        showCancelButton: !0,
        confirmButtonText: "Copy",
        cancelButtonText: "OK"
    }).then(e => {
        !0 === e.isConfirmed && copyPass()
    })
}), newInput.addEventListener("click", () => {
    newEmail(), setPass()
}), login.addEventListener("click", async () => {
    const {
        value: e
    } = await Swal.fire({
        title: "Email Address",
        input: "email",
        inputPlaceholder: "example@email.com"
    });
    if (e) {
        const {
            value: t
        } = await Swal.fire({
            title: "Enter the password",
            input: "password",
            inputAttributes: {
                maxlength: 100,
                autocapitalize: "off",
                autocorrect: "off"
            }
        });
        if (!t) return;
        mailjs.login(e, t).then(a => {
            console.log(a), 401 === a.data.code ? Swal.fire("Wrong username / password", "Try Again", "error") : (localStorage.setItem("token", a.data.token), localStorage.setItem("id", a.data.id), localStorage.setItem("dta_pass", t), passInput.innerText = t, localStorage.setItem("dta_email", e), mailInput.innerText = e, Swal.fire("You are logged in", e, "success"))
        })
    }
}), window.onload = setEmail(), window.onload = setPass(), setInterval(() => {}), TOKEN(), setInterval(() => {
    TOKEN()
}, 5e3), mailjs.me().then(e => {
    console.log(e), dtaProgress.innerText = e.data.quota - 4e7;
    const t = e.data.quota - 4e7;
    if (0 === t) e.data.quota, progress.style.width = "0%";
    else {
        const a = 100 * e.data.quota / t;
        progress.style.width = `${a}%`
    }
}, 1e3);
var reception = document.getElementsByClassName("reception")[0];

function load() {
    mailjs.getMessages().then(e => {
        reception.innerHTML = '<h1 class="mailbox">Mailbox</h1>',
            function(e) {
                for (var t = 0; t < e.length; t++) {
                    if (e[t].subject) {
                        var a = `\n            <div class="mail" id="${e[t].id}">\n            <div class="userIMG"><span>${e[t].from.name.substring(0,1)}</span></div>\n            <div class="info_sender">\n                <span class="name">${e[t].from.name}</span>\n                <span class="email">${e[t].from.address}</span>\n            </div>\n            <div class="info">\n                <span class="subject">${e[t].subject}</span>\n                <span class="description">${e[t].intro.substring(0,44)}...</span>\n            </div>\n        </div>`;
                        reception.innerHTML += a
                    } else a = `\n            <div class="mail" id="${e[t].id}">\n            <div class="userIMG"><span>${e[t].from.name.substring(0,1)}</span></div>\n            <div class="info_sender">\n                <span class="name">${e[t].from.name}</span>\n                <span class="email">${e[t].from.address}</span>\n            </div>\n            <div class="info">\n                <span class="subject" style="color: rgb(80, 80, 80);">(no subject)</span>\n                <span class="description">${e[t].intro.substring(1,44)}...</span>\n            </div>\n        </div>`, reception.innerHTML += a;
                    var n = e[t].subject,
                        s = e[t].id;
                    document.getElementById(e[t].id).addEventListener("click", () => {
                        mailjs.getMessage(s).then(e => {
                            console.log(e), Swal.fire({
                                title: `${n}`,
                                text: `${e.data.text}`,
                                showDenyButton: !0,
                                showCancelButton: !0,
                                confirmButtonText: "Remove Email"
                            }).then(e => {
                                if (e.isConfirmed) mailjs.deleteMessage(s).then(Swal.fire("Deleted !", "", "success"));
                                else if (e.isDenied) return
                            })
                        })
                    })
                }
            }(e.data)
    })
}
load(), setInterval(() => {
    load()
}, 3e3);

newEmail()
