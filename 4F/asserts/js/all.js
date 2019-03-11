let timeOffset = [-12,-8,-1,0,3];
let loc = ['NEW YORK', 'LONDON', 'BANGKOK', 'TAIWAN', 'SYDNEY'];
let month = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
let contentContainer = document.querySelector('.content');
for (let i = 0; i < timeOffset.length; i++){
    let date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();
    let day;
    if (hour + timeOffset[i] < 0) {
        day = `${date.getDate()} ${month[date.getMonth()]}. ${date.getFullYear()}`;    
    }
    contentContainer.innerHTML += `
    <div class="element night">
        <div class="loc-info">
            <div class="loc">${loc[i]}</div>
            <div class="date">${day}</div>
        </div>
        <div class="clock">
            ${hour+timeOffset[i]}:${min}
        </div>
    </div>
    `
}
// 前一小時是前一天 if hour < 0 || hour > 12
// 前一天是上個月 if 
// 前一天是去年
// 