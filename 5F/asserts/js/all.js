//http://opendata.epa.gov.tw/webapi/Data/REWIQA/?$orderby=SiteName&$skip=0&$top=1000&format=json
const app = new Vue({
    el:'.wrapper',
    data:{

    },
    mounted: function(){
        fetch('http://opendata.epa.gov.tw/webapi/Data/REWIQA/?$orderby=SiteName&$skip=0&$top=1000&format=json',{
            mode: 'cors',
        })
        .then(function(res){
            console.log(res);
            return res.json();
        })
        .then(function(data){
            console.log(data);
        })
    }
})