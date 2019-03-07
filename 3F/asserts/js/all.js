// TODO:
// overflow
let app = new Vue({
    el: '.calculator',
    data: {
        ans:0,
        val:0,
        currentOpt:'',
        currentHistory:'',
        isDot : false,
        isFinished: false
    },
    methods:{
        init:function(){
            this.ans = 0;
            this.val = '0';
            this.currentOpt = '';
            this.currentHistory = '';
            this.isDot = false;
            this.isFinished = false;
        },
        renderInputHistory:function(){
            this.currentHistory += this.val + this.currentOpt;
        },
        renderAns:function(){
            console.log('renderAns val ' + this.val);
            console.log('renderAns ans ' + this.ans);
            this.val = this.ans;
        },
        backspace:function(){
            this.val = String(this.val).slice(0, String(this.val).length-1);
        },
        input: function (num) {
            if (String(this.val).length > 10) {
                // console.log(56(-String(this.ans).length - 10));
                // let offset = 56 - Math.pow(String(this.val).length, 1.1);
                // console.log(offset);
                // document.querySelector('.input').style.fontSize = `${offset}px`;
            }
            if(this.isFinished){
                //若上階段計算已完成，則清除資料
                this.init();
            }
            console.log(this.val, this.isDot)
            if(num == '.' && this.isDot){
                //當輸入為 . 時，且this.isDot的狀態為TRUE(已有小數點)時，不做任何動作，禁止輸入
                return;
            }
            if(num == '.' && !this.isDot){
                //當輸入為 . 時，且this.isDot的狀態為FALSE(已有小數點)時，將狀態更改為TRUE，表示進入小數點狀態
                this.isDot = true;
            }
            if(this.val == 0 && !this.isDot){
                //輸入狀態為0且尚未是小數點狀態
                if(num == '.' ){
                    //此時輸入小數點會將小數點加進去，變為0.
                    this.val += String(num);
                    return;
                }
                if(num == '00'){
                    //禁止在0的狀態時，輸入00
                    return;
                }
                //若為狀態為0，直接將數字改為輸入之數字
                this.val = String(num);
            }
            else{
                //正常輸入，接續下去
                this.val += String(num);
            }
        },
        operation: function(opt){
            // this.val = this.ans;
            
            this.currentOpt = opt;
            if (this.isFinished) {
                this.currentHistory = '';
                this.ans = 0;
                this.isFinished = false;    
            }
            if(this.ans == 0) {
                this.ans = this.val;
                console.log(this.val);
                this.currentHistory += `${this.val} ${opt} `
                this.val = '0';
                this.isDot = false;
                return;
            }
            
            console.log(this.val);
            this.ans = parseFloat(this.ans);
            this.val = parseFloat(this.val);
            switch(this.currentOpt){
                case '+':
                    this.ans += this.val;
                    console.log(this.ans);
                    break;
                case '-':
                    this.ans -= this.val;
                    console.log(`${this.ans} - ${this.val}`);
                    break;
                case '*':
                    this.ans *= this.val;
                    console.log(this.ans);
                    break;
                case '/':
                    console.log(`${this.ans} / ${this.val}`);
                    this.ans =  this.ans / this.val;
                    break;
            }
            if(opt == '/')
                this.currentHistory += `${this.val} ÷ `
            else
                this.currentHistory += `${this.val} ${opt} `
            this.val = '0';
            this.isDot = false;
            console.log(this.ans)
        },
        calculate:function(){
            this.ans = parseFloat(this.ans);
            this.val = parseFloat(this.val);
            switch(this.currentOpt){
                case '+':
                    this.ans += this.val;
                    break;
                case '-':
                    this.ans -= this.val;
                    break;
                case '*':
                    this.ans *= this.val;
                    break;
                case '/':
                    console.log(`${this.ans} / ${this.val}`)
                    this.ans =  this.ans / this.val;
                    break;
            }
            this.currentHistory += `${this.val}`
            this.val = parseFloat(this.ans.toPrecision(12));
            console.log(this.ans)
            this.opt = '';
            
            this.isFinished = true;
        }
    }
});

