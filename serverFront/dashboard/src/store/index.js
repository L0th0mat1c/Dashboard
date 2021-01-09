import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:{},
    widgets:[],
    cityError:null,
    userCity:false,
    twitterId:'',
    twitterUser:'',
    twitterTopic:'',
    newsCategory: '',
    userNews:false,
    userBourse: false,
    bourse:''


  },

  mutations: {
    INCREMENT_USER(state, response){
      state.user = response
      window.location = 'http://localhost:8080/#/userPage/'+state.user.userId
    },
//gestion météo
    IMPLEMENT_WEATHER(state, city){
      state.cityError = null
      state.user.city = city
    },
    ERROR_WEATHER(state){
      state.cityError = true
    },
    CHANGE_CITY(state){
      state.user.city = ""
    },
    USER_CITY_TRUE(state){
      state.userCity = true
    },
    USER_CITY_FALSE(state){
      state.userCity = false
    },
    INCREMENT_TWITTER_ID(state, id){
      state.twitterId = id
    },
    INCREMENT_TWITTER_USER(state, name){
      state.twitterUser = name
    },
    INCREMENT_TWITTER_TOPIC(state, topic){
      state.twitterTopic = topic
    },
    USER_NEWS_CATEGORY_TRUE(state){
      state.userNews = true
    },
    USER_NEWS_CATEGORY_FALSE(state){
      state.userNews = false
    },
    INCREMENT_USER_NEWS(state, category){
      state.user.newsCategory = ''
      state.user.newsCategory = category
    },
    CHANGE_NEWS(state){
      state.user.newsCategory= ''
    },
    USER_BOURSE_TRUE(state){
      state.userBourse = true
    },
    USER_BOURSE_FALSE(state){
      state.userBourse = false
    },
    INCREMENT_USER_BOURSE(state, category){
      state.user.bourse = ''
      state.user.bourse = category
    },
    CHANGE_BOURSE(state){
      state.user.bourse= ''
    },



  },
  actions: {

    GET_WIDGETS(state, id){
      axios.getWidgets('http://localhost:3000/api/getwidgets', 
        {       
                'id': id,
        })
        .then(function (response) {
            console.log(JSON.stringify(response))
            //state.widgets = response.data
        })
        .catch(error=> {
            console.log(error)
            // if (error.response.status == 401){
            //     this.validationErrors = error.response.data.error;
            //     console.log('validationErrors:', this.validationErrors)
            // }
        }) 
    },
    async CHECK_WEATHER({ commit }, city){
       await axios.get('https://prevision-meteo.ch/services/json/'+city)
                .then(function (response) {
                  //console.log(JSON.stringify(response))
                    if(response.data.city_info){
                      commit("IMPLEMENT_WEATHER", city)
                    } else {
                      commit("ERROR_WEATHER") 
                    }
                    //console.log(JSON.stringify(response.data.city_info))
                })
    },
    async CHECK_NEWS({ commit}, category){
      console.log('store')
      await axios.get('http://localhost:3000/news/'+category
        ).then((response) => {
        if (response != null) {
          commit("INCREMENT_USER_NEWS", category)
        }
        
      })
    },
    async CHECK_BOURSE({ commit}, category){
      console.log('store')
      await axios.get('http://api.marketstack.com/v1/'+category+
      '?access_key=38f78506ecdbece66838d89d72c9652e&symbols=AAPL'
      
        ).then((response) => {
        if (response != null) {
          commit("INCREMENT_USER_BOURSE", category)
        }
        
      })
    },

  },
  modules: {
  }
})
