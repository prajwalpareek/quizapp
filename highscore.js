let hsco = document.querySelector('#highsco')
let highsco = JSON.parse(localStorage.getItem('maxscore'))

let maxnum = Math.max(...highsco);
let newnum = 0

setInterval(()=>{
    if(newnum<maxnum){
        newnum += 1
        hsco.innerText = newnum;
    }
},10)

