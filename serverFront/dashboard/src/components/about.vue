<template>
<div>
 {
    "customer":{
         "host":{{ip}}
    },
    "server":{
        "current_time": {{date}},
        "services":[{
            "name": "prévision météo",
            "widgets":[{
                "name": "prévision météo",
                "description":"Display informations about the weather and temperature for a city",
                "params":[{
                    "name":"city",
                    "type":"string"
                }]
            }]
        
            },{
                
            "name": "twitter",
            "widgets":[{
                "name": "latest tweets",
                "description":"Display the 10 last tweets from a given username",
                "params":[{
                    "name":"username",
                    "type":"string"
                },{
                "name": "topics to follow",
                "description":"Display the 10 last tweets about a given keyword",
                "params":[{
                    "name":"topic",
                    "type":"string"
                }]
            }]
            }
        }]
    }
 }
</div>
</template>

<script>
// import { mapState } from 'vuex'
import axios from 'axios'
    export default {
        name: "about",
        data(){
            return{
                date:'',
                ip:'',
            }
        },
        beforeMount(){
            this.myFunction()
            this.clientIp()
        },
        methods: { 
            myFunction() {
                this.date = Math.round(+new Date()/1000);// unix timestamp
            },
            async clientIp() {
                const vm = this
                await axios.get('https://api.astroip.co/116.12.250.1/?api_key=1725e47c-1486-4369-aaff-463cc9764026')
                .then(function (response) {
                    vm.ip=response.data.requester_ip
                })
                .catch(error=> {
                    console.log(error)
                })                  
            },
            
        }
}
</script>

<style scoped>
</style>