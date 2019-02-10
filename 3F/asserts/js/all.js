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
            this.val = this.ans;
        },
        backspace:function(){
            this.val = String(this.val).slice(0, String(this.val).length-1);
        },
        input: function(num){
            this.isLastOpt = false;
            console.log(String(this.val)+String(num));
            if(num == '.'){
                if(!this.isDot){
                    // console.log(this.isDot)
                    this.val = String(this.val)+String(num);
                    this.isDot = true;
                    // console.log(this.isDot)
                }
                return;
            }
            // 0不能重複輸入
            if(this.val == '0' && (num == '0' || num== '00')) return;
            // 0的時候直接更改為輸入的數字 或是已經在運算中途 也改為輸入的數字
            if(this.val == '0' || (this.currentOpt && this.isLastOpt) || this.isLastOpt){
                this.val = String(num);
            }
            else{
                    this.val = String(this.val)+String(num);
            }
            
                
            console.log(`val:${String(this.val)}`)
        },
        operation: function(opt){
            // console.log(opt);
            if(this.isLastOpt) return;
            this.isLastOpt = true;
            this.queue = parseFloat(this.val);
            this.ans = parseFloat(this.ans);
            if(this.currentOpt == ''){
                this.ans = this.queue;
                this.currentOpt = opt;
            }
            else{
                switch(this.currentOpt){
                    case ' + ':
                        console.log(this.ans, this.queue)
                        this.ans +=this.queue;
                        break;
                    case ' - ':
                        this.ans -=this.queue;
                        break;
                    case ' * ':
                        this.ans *=this.queue;
                        break;
                    case ' / ':
                        this.ans = this.queue / this.val;
                        break;
                }
                console.log(this.currentOpt)
                this.currentOpt = opt;
            }
            this.renderInputHistory();
            console.log(`ans:${this.ans}`)
            this.val = this.ans;
        },
        calculate:function(){
            this.queue = parseFloat(this.queue);
            this.val = parseFloat(this.val);
            switch(this.currentOpt){
                case ' + ':
                    console.log(this.val, this.queue)
                    this.ans +=this.queue;
                    console.log(this.val)
                    break;
                case ' - ':
                    this.ans -=this.queue;
                    break;
                case ' * ':
                    this.ans *=this.queue;
                    break;
                case ' / ':
                    this.ans = this.queue / this.val;
                    break;
            }
            this.renderAns()
            this.currentHistory = '';
            finished = true;
        }
    }
});