// TODO:
// overflow
let app = new Vue({
    el: '.calculator',
    data: {
        ans:0,
        val:0,
        queue:0,
        currentOpt:'',
        currentHistory:'',
        isDot : false,
        finished : false,
        isLastOpt : false
    },
    methods:{
        init:function(){
            this.ans = 0;
            this.val = '0';
            this.queue = 0;
            this.currentOpt = '';
            this.currentHistory = '';
            this.isDot = false;
            this.finished = false;
            this.isLastOpt = false;
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
        input: function(num){
            if(this.val == 0){
                this.val = String(num);
            }
            else{
                this.val += String(num);
            }
        },
        operation: function(opt){
            this.val = this.ans;
            this.currentOpt = opt;
            if(this.ans == 0) {
                this.ans = this.val;
                this.val = '0';
                return;
            }
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
            this.val = '0';
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
            this.val = this.ans;
            console.log(this.ans)
        }
}});