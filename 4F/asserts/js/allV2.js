let timeOffset = [-12,-8,-1,0,3];
let loc = ['America/New_York', 'Europe/London', 'Asia/Bangkok', 'Asia/Taipei', 'Australia/Sydney'];
let monthCode = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
let contentContainer = document.querySelector('.content');
let blinkText = '：';
function updateClock() {
    contentContainer.innerHTML = '';
    for (let i = 0; i < timeOffset.length; i++){
        let date = new Date();
        let timeString = date.toLocaleString('zh-TW', { timeZone: loc[i], hour12: false });
        let timeDate = timeString.split(' ')[0];
        let timeTime = timeString.split(' ')[1];
        let hour = timeTime.split(':')[0];
         let dayAndNight = 0; // 0 day 1 night
        if(hour < 5 || hour > 18) dayAndNight = 1;
        else dayAndNight = 0;
        let dateInfo = `${timeDate.split('/')[2]} ${monthCode[timeDate.split('/')[1]-1]}. ${timeDate.split('/')[0]}`
        contentContainer.innerHTML += `
        <div class="element ${dayAndNight?'night':'day'}">
            <div class="loc-info">
                <div class="loc">${loc[i].split('/')[1].toUpperCase()}</div>
                <div class="date">${dateInfo}</div>
            </div>
            <div class="clock">
                ${hour}<span style="font-size:0.8em;">${blinkText}</span>${timeTime.split(':')[1]}
            </div>
        </div>
        `
    }
    blinkText = blinkText == '：' ? '　' : '：';
}
updateClock();
setInterval(updateClock,1000);