class Game {
    constructor() {
        this.score = 0;
        this.leftTime = 60;
        this.num1 = 0;
        this.num2 = 0;
        this.opt = '';
        this.level = 1;
        this.optsList = ['+', '−', '×', '÷'];
        const timer = setInterval(() => {
            this.leftTime--;
            if (this.leftTime < 10)
                document.querySelector('.time-counter').textContent = "00 : 0" + this.leftTime;
            else
                document.querySelector('.time-counter').textContent = "00 : " + this.leftTime;
            if (this.leftTime == 0) {
                clearInterval(timer);
                this.showResult();
            }
        }, 1000);
        this.updateScore();
        this.generateNewProblem();
    }
    generateNewProblem() {
        document.querySelector('.input span').textContent = '';
        this.opt = this.optsList[Math.floor(Math.random() * 4)];
        this.level = this.getProblemLevel();
        if (this.opt != '÷') {
            this.num1 = Math.floor(Math.random() * (10 ** this.level));
            this.num2 = Math.floor(Math.random() * (10 ** this.level));
        }
        else {
            this.num1 = Math.floor(Math.random() * (10 ** this.level));
            this.num2 = Math.floor(Math.random() * ((10 ** this.level) - 1)) + 1;
            //不能除0
        }
        document.querySelector('.num1').textContent = this.num1;
        document.querySelector('.num2').textContent = this.num2;
        document.querySelector('.operater').textContent = this.opt;
    }
    getProblemLevel() {
        if (this.leftTime > 40) {
            return 1;
        }
        else if (this.leftTime > 20) {
            return 2;
        }
        else {
            return 3;
        }
    }
    checkAnswer() {
        let userAns = document.querySelector('.input span').textContent;
        userAns = Number(userAns);
        switch (this.opt) {
            case '+':
                if (this.num1 + this.num2 == userAns) {
                    this.score += this.level;
                    document.querySelector('.correct').play();
                }
                else {
                    if(this.score > 0)
                        this.score--;
                    document.querySelector('.incorrect').play();
                }
                break;
            case '−':
                console.log((this.num1 - this.num2),'-', userAns)
                if ((this.num1 - this.num2) == userAns) {
                    this.score += this.level;
                    document.querySelector('.correct').play();
                }
                else {
                    if(this.score > 0)
                        this.score--;
                    document.querySelector('.incorrect').play();
                }
                break;
            case '×':
                if (this.num1 * this.num2 == userAns) {
                    this.score += this.level;
                    document.querySelector('.correct').play();
                }
                else {
                    if(this.score > 0)
                        this.score--;
                    document.querySelector('.incorrect').play();
                }
                break;
            case '÷':
                if (Math.floor((this.num1 / this.num2) * 10) / 10 == userAns) {
                    this.score += this.level;
                    document.querySelector('.correct').play();
                }
                else {
                    if(this.score > 0)
                        this.score--;
                    document.querySelector('.incorrect').play();
                }
                break;
                
        }
        this.updateScore();
        this.generateNewProblem();
    }
    updateScore() {
        let scoreStr = '';
        if (this.score < 10) {
            scoreStr = "00" + this.score;
        }
        else if (this.score < 100) {
            scoreStr = "0" + this.score;
        }
        else {
            scoreStr = this.score;
        }
        console.log(scoreStr)
        document.querySelector('.score').textContent = scoreStr;
    }
     
    showResult() {
        document.querySelector('.result .score').textContent = this.score;
        document.querySelector('.gaming').classList.toggle('hidden');
        document.querySelector('.result').classList.toggle('hidden');
    }
}

var app = undefined;
let start = document.querySelector('.start-btn');
let inputField = document.querySelector('.input span');
start.addEventListener('click', () => {
    document.querySelector('.welcome').classList.toggle('hidden');
    document.querySelector('.gaming').classList.toggle('hidden');
    app = new Game();
})

document.body.addEventListener('keyup', (e) => {
    if ((e.key >= 0 && e.key <= 9) || e.key == '.' || e.key == '-') {
        inputField.textContent += String(e.key);    
    }
    else if(e.key== 'Backspace'){
        inputField.textContent = inputField.textContent.substring(0, inputField.textContent.length - 1);
    }
    else if (e.key == 'Enter') {
        app.checkAnswer();
    }
    
})
document.querySelector('.retry').addEventListener('click', () => {
    delete app;
    document.querySelector('.result').classList.toggle('hidden');
    document.querySelector('.gaming').classList.toggle('hidden');
    app = new Game();
})