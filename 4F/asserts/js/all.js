let timeOffset = [-12,-8,-1,0,3];
let loc = ['NEW YORK', 'LONDON', 'BANGKOK', 'TAIWAN', 'SYDNEY'];
let monthCode = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
let monthDay = [31,28,31,30,31,30,31,31,30,31,30,31];
let contentContainer = document.querySelector('.content');
let blinkText = '：';
function updateClock() {
    contentContainer.innerHTML = '';
    for (let i = 0; i < timeOffset.length; i++){
        let date = new Date();
        let hour = date.getHours();
        let day = date.getDate();
        let year = date.getFullYear();
        let month = date.getMonth();
        let min = date.getMinutes();
        hour+=timeOffset[i];
        //閏年處理
        if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0)
            monthDay[1] = 29;
        else
            monthDay[1] = 28;
        //時間判斷
        if(hour > 23){
            //超過23時 算隔天
            hour -= 23;
            day += 1;
            if(day > monthDay[month]){
                //若該日超過當月最大天數，月份加加
                month += 1;
                day = 1;
                if(month > 11){
                    //若超過12個月，年分加加 && 月份歸為1月
                    month = 0;
                    year += 1;
                }
            }
        }
        else if(hour < 0){
            //少於0時，算前一天
            hour = 24 + hour;
            day -= 1;
            if(day < 0){
                //若該日低於0號，月份減減
                month -= 1;
                if(month < 0){
                    month = 11;
                    year -= 1;
                    //若少於1月，回到去年
                }
                day = monthDay[month];
            }
        }
        dayInfo = `${date.getDate()} ${monthCode[date.getMonth()]}. ${date.getFullYear()}`;    
        let dayAndNight = 0; // 0 day 1 night
        if(hour < 5 || hour > 18) dayAndNight = 1;
        else dayAndNight = 0;
        contentContainer.innerHTML += `
        <div class="element ${dayAndNight?'night':'day'}">
            <div class="loc-info">
                <div class="loc">${loc[i]}</div>
                <div class="date">${dayInfo}</div>
            </div>
            <div class="clock">
                ${hour}<span style="font-size:0.8em;">${blinkText}</span>${min}
            </div>
        </div>
        `
    }
    blinkText = blinkText == '：' ? '　' : '：';
}
updateClock();
setInterval(updateClock,1000);