<template>
<div class="container-fluid">
    <div class="">
            <h1 class="wv-heading--title text-center">
                Dashbord {{user.name}}
            </h1>
    </div>
    <div class="row">
        <div class="col-md-12 card bg-light" style="width: 25rem;height: 8rem">
             <div v-if="!user.bourse" class="center">You haven't selected your category yet. Check your userpage to do so.</div>
            <div v-else class="card-body card overflow-auto">
                <h5><span class="badge badge-secondary">Change service {{user.bourse}}</span></h5>
                 <table class="table table-striped table-bordered">
                        <thead>
                            <tr>          
                                <th>Exchanges</th> 
                                <th>open</th>
                                <th>close</th>
                                <th>date</th>
                                <th>volume</th>
                                <th>high</th>
                                <th>low</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(bourse) in userBourse" :key="bourse.id" style="heigth:100px;">
                                <td style="padding-top:10px;">{{bourse.exchange}} </td>
                                <td style="padding-top:10px;">{{bourse.open}} </td>
                                <td style="padding-top:10px;">{{bourse.close}} </td>
                                <td style="padding-top:10px;">{{bourse.date}} </td>
                                <td style="padding-top:10px;">{{bourse.volume}}
                                </td>
                                <td style="padding-top:10px;">{{bourse.high}} </td><td style="padding-top:10px;">{{bourse.low}} </td>
                                
                            </tr>


                        </tbody>
                    </table>
            </div>
        </div>
         <div class="col-md-3 card bg-light" style="width: 25rem;height: 18rem">
             <div v-if="!userCity ||weatherInfo == null" class="center">You haven't selected your city yet. Check your userpage to do so.</div>
            <div v-else class="card-body">
                <h5><span class="badge badge-secondary">Weather forecast at {{user.city}}</span></h5>
                <p class="text-secondary">Current temperature : {{weatherInfo.current_condition.tmp}} °C</p>
                <p class="text-danger">Max temperature expected tomorrow : {{weatherInfo.fcst_day_1.tmax}} °C</p>
                <p class="text-primary">Min temperature expected tomorrow : {{weatherInfo.fcst_day_1.tmin}} °C</p>
                <p class="text-info">Global condition expected tomorrow : {{weatherInfo.fcst_day_1.condition}}</p>
            </div>
        </div>
<!-- widget météo -->
        <div class="col-md-9 text-center card bg-info" style="width: 25rem;height: 18rem">
            <h4><span class="badge badge-secondary"> Twitter profil service</span></h4>
            <div v-if="!twitterId" class="center">Your twitter profile isn't setup yet. Check your userpage to do so.</div>
            <div v-else-if="tweets" class="center card overflow-auto" >
                <table class="table table-striped">
                        <thead>
                            <tr>           
                                <th>Latest tweets from {{twitterUser}}</th>
                                <th>Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(tweet) in tweets" :key="tweet.id" style="heigth:100px;">

                                <td style="padding-top:35px;">{{tweet.text}} </td>
                                <td style="padding-top:15px;">{{tweet.created_at}} </td>                              
                            </tr>
                        </tbody>
                    </table>
            </div>
            <div v-else class="center">Nothing to display</div>
        </div>  
        
   
<!-- widget twitter derniers tweet par user-->
      <div class="col-md-6 text-center card bg-info" style="width: 50rem;height: 15rem">
         <h4><span class="badge badge-secondary"> Twitter topic service</span></h4>
            <div v-if="!twitterTopic" class="center">Your haven't chose any topic yet. Check your userpage to do so.</div>
            <div v-else-if="topics" class="center card overflow-auto">
                <span class="badge badge-secondary">                                         
                                    Latest tweet about {{user.twitterTopic}}
                            </span>
                <table class="table table-striped table-bordered">
                        <thead>
                            <tr>          
                                <th>From</th> 
                                <th>tweets</th>
                                
                                <th>Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(topic, index) in topics" :key="topic.id" style="heigth:100px;">
                                <td style="padding-top:10px;">{{topic.author_id}} </td>
                                <td style="padding-top:10px;">
                                    <b-button class="btn btn-info" v-b-modal.modal-1 v-model="selectedTopic" @click="selectedTopic = index">see more</b-button>
                                     <b-modal v-if="index == selectedTopic" id="modal-1" :title="topic.author_id">
                                        <div class="card">{{topic.text}}</div>
                                    </b-modal>
                                </td>
                                
                                <td style="padding-top:10px;">{{topic.created_at}} </td>
                                
                            </tr>


                        </tbody>
                    </table>
            </div>
            
            <div v-else class="center">
                
                Nothing to display</div>
        </div>  
    <!-- widget twitter par mot clé-->
        <div class="col-md-6 text-center card" style="width: 50rem;height: 15rem">
                <span class="badge badge-secondary"><h4>News service</h4></span>
                <div v-if="userNews == null" class="center">Your haven't chose any news. Check your userpage to do so.</div>
                <div v-else-if="userNews" class="center card overflow-auto">
                    <span class="badge badge-secondary">                                         
                                    Latest news about {{user.newsCategory}}
                            </span>
                    <table class="table table-dark table-striped">
                            
                            <tbody>
                                <tr v-for="(userNew, index) in userNews" :key="userNew.id" style="heigth:100px;">
                                    <td style="padding-top:35px;">{{userNew.source.name}} </td>
                                    <td style="padding-top:35px;">{{userNew.title}} </td>
                                    <td style="padding-top:35px;">
                                     <b-button v-b-modal.modal-1 v-model="selectedArticle" @click="selectedArticle = index">see more</b-button>
                                     <b-modal v-if="index == selectedArticle" id="modal-1" :title="userNew.title">
                                        <div class="card">{{userNew.content}}</div>
                                    </b-modal>
                                    </td>    
                                </tr>


                            </tbody>
                        </table>
                </div>
                
                <!-- <div v-else class="center">
                    
                    Nothing to display</div> -->
                
        </div> 

    </div>
     


   </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
    export default {
        name: "login",
        computed: {
            ...mapState(['user', 'userCity', 'twitterId', 'twitterUser', 'twitterTopic']),  
            
            //weatherInfo,  
        },
        beforeMount(){
            this.getWeatherInfo()
            this.getTweets()
            this.getTweetsTopics()
            this.getNews()
            this.getBourse()
        },
        created () {
            window.setInterval(this.getWeatherInfo, 112000)
            window.setInterval(this.getTweets, 82000)
            window.setInterval(this.getTweetsTopics, 92000)
            // window.setInterval(this.getNews, 132000)
            window.setInterval(this.getBourse, 152000)
        },
        data(){
            return{
                weatherInfo:{},
                tweets:null,
                topics:null,
                topicsUsers:null,
                userNews: null,
                selectedArticle: null,
                selectedTopic:null,
                userBourse:null
                // timer: '',
                // timerTweets:'',
                // timerTweetsTopics:'',
            }
        },
 
        methods: {
            async getWeatherInfo(){
                await axios.get('https://prevision-meteo.ch/services/json/'+this.user.city,
               )
                .then(response => this.weatherInfo = response.data)
                //.then(console.log("test", this.weatherInfo))
            },
            async getTweets(){
                await axios.post('http://localhost:3001/api/tweets', 
                    {       
                            'id': this.twitterId,
                    })
                    .then(response => this.tweets = response.data.infos.data)
                    .catch(error=> {console.log(error)}) 
                    //console.log("newt",this.tweets)
            },
             async getTweetsTopics(){
                 const vm = this
                await axios.post('http://localhost:3001/api/topics', 
                    {       
                            'topic': this.twitterTopic,
                    })
                    .then(function (response) {
                    vm.topics = response.data.infos.data
                    console.log('vm.topic', vm.topic)
                    vm.topicsUsers = response.data.infos.includes.users
                    for (let index = 0; index < vm.topics.length; index++) {
                        if(vm.topics[index].author_id === vm.topicsUsers[index].id){
                            vm.topics[index].author_id = vm.topicsUsers[index].username
                        }
                    }
                    })
                    .catch(error=> {console.log(error)}) 
             },
             async getNews(){
                 console.log('this.user.Category', this.user.newsCategory)
                 if (this.user.newCategory != '') {
                     await axios.get('http://localhost:3000/news/'+this.user.newsCategory)
                     .then((response) => {
                         this.userNews = response.data.articles
                         console.log('new', this.userNews)
                     }).catch(error => {console.log(error)})
                 }
             },
             async getBourse(){
                 console.log('this.user.Bourse', this.user.bourse)
                 if (this.user.bourse != '') {
                     var key = "38f78506ecdbece66838d89d72c9652e"
                     await axios.get('http://api.marketstack.com/v1/eod?access_key='+key+'&symbols=AAPL')
    
                     .then((response) => {
                         this.userBourse = response.data.data
                         console.log('new', this.userBourse)
                     }).catch(error => {console.log(error)})
                 }
             }
        }
}
</script>

<style scoped>
.send-button{
background: #54C7C3;
width:100%;
font-weight: 600;
color:#fff;
padding: 8px 25px;
}
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}
.g-button{
color: #fff !important;
border: 1px solid #EA4335;
background: #ea4335 !important;
width:100%;
font-weight: 600;
color:#fff;
padding: 8px 25px;
}
.my-input{
box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
cursor: text;
padding: 8px 10px;
transition: border .1s linear;
}
.header-title{
margin: 5rem 0;
}
h1{
font-size: 31px;
line-height: 40px;
font-weight: 600;
color:#4c5357;
}
h2{
color: #5e8396;
font-size: 21px;
line-height: 32px;
font-weight: 400;
}
.login-or {
position: relative;
color: #aaa;
margin-top: 10px;
margin-bottom: 10px;
padding-top: 10px;
padding-bottom: 10px;
}
.span-or {
display: block;
position: absolute;
left: 50%;
top: -2px;
margin-left: -25px;
background-color: #fff;
width: 50px;
text-align: center;
}
.hr-or {
height: 1px;
margin-top: 0px !important;
margin-bottom: 0px !important;
}
@media screen and (max-width:480px){
h1{
font-size: 26px;
}
h2{
font-size: 20px;
}
}
</style>