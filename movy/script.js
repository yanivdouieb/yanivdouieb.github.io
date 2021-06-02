var movieName = document.getElementById('movieName')
var date = document.getElementById('date')
var type = document.getElementById('type')
var time = document.getElementById('time')
var trailer = document.getElementById('trailer')
var overview = document.getElementById('overview')
var poster = document.getElementById('poster')
var New = document.getElementById('new')

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }
function nEw(){
    return id = getRndInteger(1, 10000)
}
nEw()
New.addEventListener('click', ()=>{
    nEw()
})
function get(){
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=6558393a61eccafa0f350bf6461ee627`)
    .then((res)=>{return res.json()})
    .then((data)=>{
        if(data.original_title){
            movieName.innerText = data.original_title
       if(data.release_date){date.innerText = data.release_date}else{date.innerText = "UNKNOWN"}


       if(data.runtime){function timeConvert(n) {
        var num = n;
        var hours = (num / 60);
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        return rhours + "h" + rminutes + "";
        }
        var Time = data.runtime
        time.innerText = timeConvert(Time)}else{
            time.innerText = "UNKNOWN"
        }
        if(data.genres[0]){
            if(data.genres[1]){
                type.innerText = `${data.genres[0].name}, ${data.genres[1].name}`
            }else{
                type.innerText = data.genres[0].name
            }
        }else{
            type.innerText = "UNKNOWN"
        }
        overview.innerText = data.overview
        poster.style.background = `url(https://image.tmdb.org/t/p/w500/${data.poster_path})`
        poster.style.backgroundSize = 'cover'
        poster.style.backgroundPositionX = 'center'
        poster.style.backgroundPositionY = 'center'
        poster.style.backgroundRepeat = 'no-repeat'
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=6558393a61eccafa0f350bf6461ee627`)
        .then((res)=>{return res.json()})
        .then((data)=>{
            trailer.addEventListener('click', ()=>{
                Swal.fire({
                    title: `${movieName.innerText} | Trailer`,
                    width: 1000,
                    html:
                        `<iframe width="560" height="315" src="https://www.youtube.com/embed/${data.results[0].key}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
                    backdrop: `
                      rgba(112, 112, 112,0.8)
                      left top
                      no-repeat
                    `
                  })
            })
        })
        }else{
            nEw()
        }
    })
}
setInterval(()=>{
    get()
}, 200)
