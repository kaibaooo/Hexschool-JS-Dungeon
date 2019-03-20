
const app = new Vue({
    el:'#wrapper',
    data:{
        url : "http://34.80.220.180:3000/corkiller/http://opendata.epa.gov.tw/webapi/Data/REWIQA/?$orderby=SiteName&$skip=0&$top=1000&format=json",
        AQIData : '',
        AQINewData : {},
        currentCity : '屏東縣',
        currentSite : '',
        AQIColor:'good',
        AQI : '',
        O3 : '',
        PM10 : '',
        PM2dot5 : '',
        CO : '',
        SO2 : '',
        NO2 : '',
        PublishTime : '',
        selectedSite : [],

    },
    mounted:function(){
        fetch(this.url)
            .then(response => {
                return response.json();
            })
            .then(json => {
                this.AQIData = json;
                this.beautifyData();
                this.createOptions();
                this.changeCity();
                console.log(this.AQINewData)
            });
    },
    methods:{
        beautifyData: function(){
            for(let ele of this.AQIData){
                if(this.AQINewData[ele['County']] == undefined){
                    this.AQINewData[ele['County']] = []
                    this.AQINewData[ele['County']].push({
                        'name': ele['SiteName'],
                        'AQI':  ele['AQI'],
                        'O3':  ele['O3'],
                        'PM10':  ele['PM10'],
                        'PM2.5':  ele['O3'],
                        'CO':  ele['CO'],
                        'SO2':  ele['SO2'],
                        'NO2':  ele['NO2'],
                        'PublishTime' : ele['PublishTime']
                    });
                }
                else{
                    this.AQINewData[ele['County']].push({
                        'name': ele['SiteName'],
                        'AQI':  ele['AQI'],
                        'O3':  ele['O3'],
                        'PM10':  ele['PM10'],
                        'PM2.5':  ele['O3'],
                        'CO':  ele['CO'],
                        'SO2':  ele['SO2'],
                        'NO2':  ele['NO2'],
                        'PublishTime' : ele['PublishTime']
                    })
                }
            }
        },
        createOptions:function(){
            for(let ele in this.AQINewData){
                console.log(ele);
                document.querySelector('#location').innerHTML += `<option value="${ele}">${ele}</option>`;
            }
        },
        changeCity:function(){
            let selectedCity = this.AQINewData[this.currentCity];
            this.currentSite = selectedCity[0].name;
            this.AQI = selectedCity[0].AQI;
            this.O3 = selectedCity[0].O3;
            this.PM10 = selectedCity[0].PM10;
            this.PM2dot5 = selectedCity[0]['PM2.5'];
            this.CO = selectedCity[0].CO;
            this.SO2 = selectedCity[0].SO2;
            this.NO2 = selectedCity[0].NO2; 
            this.PublishTime = selectedCity[0].PublishTime;
            this.updatePanel();
            document.querySelector('.areas').innerHTML = '';
            for(let idx in selectedCity){
                let addColorCity = selectedCity[idx];
                console.log(this.fillColor(selectedCity[idx].AQI));
                addColorCity['color'] = this.fillColor(selectedCity[idx].AQI);
                this.selectedSite.push(selectedCity[idx]);
            }
            console.log(this.selectedSite);
            let areaNumber = document.querySelectorAll('.area-info');
            
        },
        changeSite:function(e){
            console.log(e.currentTarget.children[0].textContent);
            for(let idx in this.selectedSite){
                console.log(this.selectedSite[idx].name)
                if(this.selectedSite[idx].name == e.currentTarget.children[0].textContent){
                    this.currentSite = this.selectedSite[idx].name;
                    this.AQI = this.selectedSite[idx].AQI;
                    this.O3 = this.selectedSite[idx].O3;
                    this.PM10 = this.selectedSite[idx].PM10;
                    this.PM2dot5 = this.selectedSite[idx]['PM2.5'];
                    this.CO = this.selectedSite[idx].CO;
                    this.SO2 = this.selectedSite[idx].SO2;
                    this.NO2 = this.selectedSite[idx].NO2; 
                    this.updatePanel();
                }
            }
        },
        updatePanel:function(){
            document.querySelector('.general-info').innerHTML = `
                <h3 class="current-area">${this.currentSite}</h3>
                    <h3 class="current-AQI ${this.fillColor(this.AQI)}">${this.AQI}</h3>
                    <div class="clear"></div>
                `
        },
        fillColor:function(val){
            if(val <= 50){
                return 'good';
            }
            else if(val <= 100){
                return 'normal';
            }
            else if(val <= 150){
                return 'sensitive';
            }
            else if(val <= 200){
                return 'unhealth';
            }
            else if(val <= 300){
                return 'badhealth';
            }
            else{
                return 'danger';
            }
        }

    }

})
