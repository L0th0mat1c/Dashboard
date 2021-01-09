<template>
<div class="container">
      <div class=" ">
            <h1 class="wv-heading--title">
                Welcome {{user.name}}
            </h1>
            <h2 class="wv-heading--subtitle">
               In this page you can choose and setup the services of your choice:
            </h2>
         </div>
    <div class="row">
        <div class="col-md-4 text-center card">
                <div>
                     <h4>Weather forecast</h4>
                
                <div v-if="userCity == true" class="center">
                    <p>Your city : {{this.user.city}}</p>
                    <p><button type="submit" @click="changeCity()" class=" btn btn-block send-button tx-tfm">Change city</button></p>
                </div>  
                <div v-else>
                    <div class="form-group">
                    <input type="text" id="weather" name="weather" placeholder="Where do you live?" v-model="weather" class="form-control my-input">
                    </div>
                    <div class="erreur" v-if="cityError == true">
                            <p>Sorry, we can't find this place!</p>
                    </div>
                    <div class="text-center ">
                    <button type="submit" @click="weatherCall()" class=" btn btn-block send-button tx-tfm">Validate</button>
                    </div>
                </div>
                </div> 
        </div>
        <div class="col-md-4 text-center card">
          <h4>Twitter services</h4>
      
            <table>
                <thead>
                    <tr>
                        <th colspan="2">What services would you like to get?</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Twitter - Latest tweets</td>
                        <td><button class="btn btn-block send-button tx-tfm" v-if="inputTwitter == false" @click="inputTwitter = true">Add</button></td>
                    </tr>
                    <tr v-if="inputTwitter == true">
                        Almost there! Just let us know your username:
                        <input type="text" v-model="twitterUsername">
                        <button class="btn btn-block send-button tx-tfm" @click="getTwitter(), inputTwitter = false">Validate</button>
                        <button class="btn btn-block send-button tx-tfm" @click="inputTwitterTopics = false">Cancel</button>
                    </tr>
                    <tr>
                        <td>Twitter - Topics to follow</td>
                        <td><button class="btn btn-block send-button tx-tfm" v-if="inputTwitterTopics == false" @click="inputTwitterTopics = true">Add</button></td>
                    </tr>
                    <tr v-if="inputTwitterTopics == true">
                        Almost there! Just let us know what's in your mind:
                        <input type="text" v-model="twitterTopicToSet">
                        <button class="btn btn-block send-button tx-tfm" @click="setTwitterTopics(), inputTwitterTopics = false">Validate</button>
                        <button class="btn btn-block send-button tx-tfm" @click="inputTwitterTopics = false">Cancel</button>
                    </tr>
                </tbody>
            </table>
        </div> 
        <div class="col-md-4 text-center card">
            <div>
                     <h4>News service</h4>
                
                <div v-if="userNews == true" class="center">
                    <p>Your category : {{this.user.newsCategory}}</p>
                    <p><button type="submit" @click="changeCategory()" class=" btn btn-block send-button tx-tfm">Change category</button></p>
                </div>  
                <div v-else>
                    <div class="form-group">
                        <h6>Choose your category</h6>
                   <select name="newCategory" v-model="category">Choose
                    <!-- <option value="selected">Choose ...</option> -->
                   <option v-for="category in newsCategories" :key="category.id" :value="category" @click="changeCategory()">{{category}}</option>
                   </select>
                    </div>
                    <div class="erreur" v-if="newError == true">
                            <p>Sorry, we can't find this category for news!</p>
                    </div>
                    <div class="text-center ">
                    <button type="submit" @click="newsCall()" class="btn btn-block send-button tx-tfm">Validate</button>
                    </div>
                </div>
                </div> 

        </div>
        <div class="col-md-4 text-center card">
            <div>
                     <h4>Change service</h4>
                
                <div v-if="userBourse == true" class="center">
                    <p>Your category : {{this.user.bourse}}</p>
                    <p><button type="submit" @click="changeBourse()" class=" btn btn-block send-button tx-tfm">Change category</button></p>
                </div>  
                <div v-else>
                    <div class="form-group">
                        <h6>Choose your category</h6>
                   <select name="newCategory" v-model="userStack">Choose
                    <!-- <option value="selected">Choose ...</option> -->
                   <option v-for="bourseCategory in bourseCategories" :key="bourseCategory.id" :value="bourseCategory" @click="changeBourse()">{{bourseCategory}}</option>
                   </select>
                    </div>
                    <div class="erreur" v-if="bourseError == true">
                            <p>Sorry, we can't find this category for news!</p>
                    </div>
                    <div class="text-center ">
                    <button type="submit" @click="changeCall()" class="btn btn-block send-button tx-tfm">Validate</button>
                    </div>
                </div>
                </div> 

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
            ...mapState(['user', 'cityError', 'userCity', 'twitterId', 'userNewsCategory', 'userNews', 'userBourse', 'bourse']),                       
        },
        beforeMount(){
        },
        created() {
            this.isLogged()
        },
        data(){
            return{
                weather:null,
                inputTwitter: false,
                inputTwitterTopics: false,
                twitterUsername:'',
                twitterTopicToSet:'',
                newsCategories: [
                    "general",
                    "health",
                    "science",
                    "sports",
                    "technology",
                    "business",
                    "entertainment"
                ],
                category: '',
                newError: '', 
                userlog: '',
                userStack:'',
                bourseCategories: [                   
                    "exchanges",
                    "eod",
                    "intraday"
                ],
                bourseError:''
                
            }
        },
 
        methods: {
            async newsCall() {
                await this.$store.dispatch('CHECK_NEWS', this.category)
                console.log("category",this.user.newsCategory)
                if(this.newError){
                    console.log(this.newError)
                } else {       
                    this.$store.commit('USER_NEWS_CATEGORY_TRUE')
                      this.category = null
                    if (this.userLog.facebookId != null) {
                        axios.put('http://localhost:3050/api/addwidget',
                
                    {       
                            'id': this.userlog._id,
                            'widget' : 'News',
                    })
                    .then(function (response) {
                        console.log(JSON.stringify(response))
                    })
                    .catch(error=> {
                        console.log(error)

                    }) 
                    }else{
                            axios.put('http://localhost:3030/api/addwidget',
                
                    {       
                            'id': this.userlog._id,
                            'widget' : 'News',
                    })
                    .then(function (response) {
                        console.log(JSON.stringify(response))
                    })
                    .catch(error=> {
                        console.log(error)
                    }) 
                    }
                    
                }
            },
            async getTwitter(){
                const vm = this
                    await axios.post('http://localhost:3001/api/twitter', 
                    {       
                            'username': this.twitterUsername,
                    })
                    .then(function (response) {
                        //console.log('brut', JSON.stringify(response.data.infos.data[0].id))
                                                //console.log('brut', response)
                        vm.$store.commit('INCREMENT_TWITTER_ID', response.data.infos.data[0].id)
                        vm.$store.commit('INCREMENT_TWITTER_USER', vm.twitterUsername)
                        console.log('twitterid',vm.twitterId)
                    })
                    .catch(error=> {
                        console.log(error)
                        // if (error.response.status == 401){
                        //     this.validationErrors = error.response.data.error;
                        //     console.log('validationErrors:', this.validationErrors)
                        // }
                    }) 
            },
            async weatherCall(){
                await this.$store.dispatch('CHECK_WEATHER', this.weather)
                console.log("usercity",this.user.city)
                if(this.cityError){
                    console.log(this.cityError)
                } else {       
                    this.$store.commit('USER_CITY_TRUE')
                      this.weather = null
                    axios.put('http://localhost:3050/api/addwidget',
                
                    {       
                            'id': this.user.userId,
                            'widget' : 'Prévisions météo',
                    })
                    .then(function (response) {
                        console.log(JSON.stringify(response))
                    })
                    .catch(error=> {
                        console.log(error)
                        // if (error.response.status == 401){
                        //     this.validationErrors = error.response.data.error;
                        //     console.log('validationErrors:', this.validationErrors)
                        // }
                    }) 
                }
            },
            changeCity(){
                this.$store.commit('CHANGE_CITY')
                this.$store.commit('USER_CITY_FALSE')
            },
            changeBourse(){
                this.$store.commit('CHANGE_BOURSE')
                this.$store.commit('USER_BOURSE_FALSE')
            },
            async changeCall(){
                 await this.$store.dispatch('CHECK_BOURSE', this.userStack)
                console.log("category",this.user.bourse)
                if(this.bourseError){
                    console.log(this.bourseError)
                } else {       
                    this.$store.commit('USER_BOURSE_TRUE')
                      this.userStack = null
                    if (this.userLog.facebookId != null) {
                        axios.put('http://localhost:3050/api/addwidget',
                
                    {       
                            'id': this.userlog._id,
                            'widget' : 'News',
                    })
                    .then(function (response) {
                        console.log(JSON.stringify(response))
                    })
                    .catch(error=> {
                        console.log(error)

                    }) 
                    }else{
                            axios.put('http://localhost:3030/api/addwidget',
                
                    {       
                            'id': this.userlog._id,
                            'widget' : 'News',
                    })
                    .then(function (response) {
                        console.log(JSON.stringify(response))
                    })
                    .catch(error=> {
                        console.log(error)
                    }) 
                    }
                    
                }
            },
            
            setTwitterTopics(){
                this.$store.commit('INCREMENT_TWITTER_TOPIC', this.twitterTopicToSet)
            },
            changeCategory(){
                this.$store.commit('CHANGE_NEWS')
                this.$store.commit('USER_NEWS_CATEGORY_FALSE')
                // this.$store.commit('INCREMENT_USER_NEWS', this.category)
                console.log(this.category)
                // console.log('userlog', this.userLog)
            },
            async isLogged() {
         await axios.get('http://localhost:3030/local/auth', {
                      withCredentials: true})
                    .then((response) => {
                        if (response.data.user == null) {
                          this.userlog = ''
                        }else{
                          this.userLog = response.data.user
                        console.log('userlogFacbook', this.userLog)
                        }
                    })
                    .catch(error=> {
                        console.log(error)
        })
        if (this.userLog == '') {
          await axios.get('http://localhost:3050/facebook/auth', {
                      withCredentials: true})
                    .then((response) => {
                        if (response.data.user == null) {
                          this.userlog = this.userLog
                        }else{
                          this.userLog = response.data.user
                        console.log('userlogBasic', this.userLog)
                        }
                    })
                    .catch(error=> {
                        console.log(error)
          })
      }
    },
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