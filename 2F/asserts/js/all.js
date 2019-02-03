
var sec = document.querySelector('.sec')
var min = document.querySelector('.min')
var hour = document.querySelector('.hour')
// console.log(sec)
cycle()
setInterval(cycle, 1000)

function cycle(){
    let date = new Date;
    let currentSec= date.getSeconds();
    let currentMin= date.getMinutes();
    let currentHour= date.getHours();
    // console.log(currentSec * 6, currentMin* 6, currentHour%12 * 30)
    sec.style.transform = `rotate(${currentSec * 6-180}deg)`
    min.style.transform = `rotate(${currentMin* 6 + currentSec / 10}deg)`
    hour.style.transform = `rotate(${currentHour%12 * 30 - 90  + currentMin / 60 * 30}deg)`
}