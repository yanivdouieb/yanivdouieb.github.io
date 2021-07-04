localStorage.setItem('loadAdd', 1)
const uri = "http://127.0.0.1:5501/";
document.getElementById("search").addEventListener("click", () => {
  const search = document.getElementById("srch").value;
  if (!search) {
    return;
  } else {
    window.location.href = `./apio/search/?query=${btoa(search)}`;
  }
});
document.getElementById("random").addEventListener("click", () => {
  window.location.href = "./apio/random";
});
fetch(`https://api.publicapis.org/entries?https`)
  .then((res) => {
    return res.json();
  })
  .then((Data) => {
    var data = Data.entries;
    function createData(max, type, min) {
      if (type === "start") {
        for (var i = 0; i < data.length; i++) {
          if (i < max) {
            document.getElementById("container").innerHTML += `
                <div class="item">
                <h1 class="apiName" id="apiName-${btoa(data[i].API)}">${
              data[i].API
            }&nbsp;<like id="like"><i class="far fa-heart" id="unliked"></i></like></h1>
                <p class="apiDescription" id="apiDescription">
                    ${data[i].Description}
                </p>
                <button class="apiLoad" id="apiLoad-${btoa(
                  data[i].API
                )}" onclick="window.location.href = \`/api/?api=${btoa(
              data[i].API
            )}\`">MORE INFORMATIONS 💡</button>
            </div>`;
            if (localStorage.getItem(`liked-${btoa(data[i].API)}`)) {
              document.getElementById(
                `apiName-${btoa(data[i].API)}`
              ).innerHTML = `${data[i].API}&nbsp;<like id="like"><i class="fa fa-heart" id="liked"></i></like>`;
            }
          }
        }
      }
      if (type === "add") {
        for (var i = 0; i < data.length; i++) {
          if (i > min) {
            if (i < max) {
              document.getElementById("container").innerHTML += `
                    <div class="item">
                    <h1 class="apiName" id="apiName-${btoa(data[i].API)}">${
                data[i].API
              }&nbsp;<like id="like"><i class="far fa-heart" id="unliked"></i></like></h1>
                    <p class="apiDescription" id="apiDescription">
                        ${data[i].Description}
                    </p>
                    <button class="apiLoad" id="apiLoad-${btoa(
                      data[i].API
                    )}" onclick="window.location.href = \`apio/api/?api=${btoa(
                data[i].API
              )}\`">MORE INFORMATIONS 💡</button>
                </div>`;
              if (localStorage.getItem(`liked-${btoa(data[i].API)}`)) {
                document.getElementById(
                  `apiName-${btoa(data[i].API)}`
                ).innerHTML = `${data[i].API}&nbsp;<like id="like"><i class="fa fa-heart" id="liked"></i></like>`;
              }
            }
          }
        }
      }
    }
    createData(50, "start");
    document.getElementById("more").addEventListener("click", () => {
      if (localStorage.getItem("loadAdd") === '1') {
        createData(100, "add", 50);
        localStorage.setItem("loadAdd", 2);
      }else{
        if (localStorage.getItem("loadAdd") === '2') {
          createData(150, "add", 100);
          localStorage.setItem("loadAdd", 3);
        }else{
          if (localStorage.getItem("loadAdd") === '3') {
            createData(200, "add", 150);
            localStorage.setItem("loadAdd", 4);
          }else{
            if (localStorage.getItem("loadAdd") === '4') {
              createData(250, "add", 200);
              localStorage.setItem("loadAdd", 5);
            }else{
              if (localStorage.getItem("loadAdd") === '5') {
                createData(300, "add", 250);
                localStorage.setItem("loadAdd", 6);
              }else{
                if (localStorage.getItem("loadAdd") === '6') {
                  createData(350, "add", 300);
                  localStorage.setItem("loadAdd", 7);
                }else{
                  if (localStorage.getItem("loadAdd") === '7') {
                    createData(400, "add", 350);
                    localStorage.setItem("loadAdd", 8);
                  }else{
                    if (localStorage.getItem("loadAdd") === '8') {
                      createData(450, "add", 400);
                      localStorage.setItem("loadAdd", 9);
                    }else{
                      if (localStorage.getItem("loadAdd") === '9') {
                        createData(500, "add", 450);
                        localStorage.setItem("loadAdd", 10);
                      }else{
                        if (localStorage.getItem("loadAdd") === '10') {
                          createData(550, "add", 500);
                          localStorage.setItem("loadAdd", 11);
                        }else{
                          if (localStorage.getItem("loadAdd") === '11') {
                            createData(600, "add", 550);
                            localStorage.setItem("loadAdd", 12);
                          }else{
                            if (localStorage.getItem("loadAdd") === '12') {
                              createData(650, "add", 600);
                              localStorage.setItem("loadAdd", 13);
                            }else{
                              if (localStorage.getItem("loadAdd") === '13') {
                                createData(700, "add", 650);
                                localStorage.setItem("loadAdd", 14);
                              }else{
                                if (localStorage.getItem("loadAdd") === '14') {
                                  createData(750, "add", 700);
                                  localStorage.setItem("loadAdd", 15);
                                }else{
                                  if (localStorage.getItem("loadAdd") === '15') {
                                    createData(800, "add", 750);
                                    localStorage.setItem("loadAdd", 16);
                                  }else{
                                    if (localStorage.getItem("loadAdd") === '16') {
                                      createData(850, "add", 800);
                                      localStorage.setItem("loadAdd", 17);
                                    }else{
                                      if (localStorage.getItem("loadAdd") === '17') {
                                        createData(855, "add", 850);
                                        localStorage.setItem("loadAdd", 'stop');
                                      }else{
                                        
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });
    setInterval(()=>{
      if (localStorage.getItem("loadAdd") === 'stop'){
        document.getElementById('linkAdd').style.display = 'none'
    }
    },200)
      document.getElementsByClassName("loading")[0].className = "load";
  });
