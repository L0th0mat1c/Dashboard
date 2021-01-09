<template>
<div class="container">
      <div class="col-md-6 mx-auto text-center">
         <div class="header-title">
            <h1 class="wv-heading--title">
               Login to Dashboard
            </h1>
            <h2 class="wv-heading--subtitle">
               Informations below:
            </h2>
         </div>
      </div>
      <div class="row">
         <div class="col-md-4 mx-auto">
            <div class="myform form ">
                <div class="form-group">
                  <input type="text" id="email" name="email" placeholder="Your email adress" v-model="userToCheck.email" class="form-control my-input">
                </div>
                <!-- <div class="erreur" v-if="emailError">
                        <p>Sorry, we can't find your email!</p>
                </div> -->
                <div class="form-group">
                  <input type="password" id="password" name="password" placeholder="Your password" v-model="userToCheck.password" class="form-control my-input">
                </div>
                <!-- <div class="erreur" v-if="passwordError">
                        <p>Sorry, wrong password!</p>
                </div> -->
                <div class="text-center ">
                  <button type="submit" @click="login()" class=" btn btn-block send-button tx-tfm">Login</button>
                </div>
                <div class="col-md-12 ">
                    <div class="login-or">
                      <hr class="hr-or">
                      <span class="span-or">or</span>
                    </div>
                </div>
                <div class="form-group">
                    <button @click="toRegister()" type="submit" class="btn btn-block btn-dark">Create a free account</button>
                </div>
                <div class="section">

                    <div class="card social-block">
                      
                        <a class="btn btn-block btn-social btn-facebook" href="http://localhost:3050/auth/facebook/secrets" role="button"><i class="fab fa-facebook"></i>Sign up with Facebook</a>
                    
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
// import router from "../router"

    export default {
        name: "login",

        computed: {
            ...mapState(['user']),           
        },
        watch: {
  
        },
        
        beforeMount(){
        },

//sécurisation api????
        mounted() {
          
        },

        data(){
            return{
                userToCheck: {
                  password:null,
                  email:null,
                },
                validationErrors:null,
                check:''
            }
        },
 
        methods: {
     
            login(){
              const vm = this

              console.log(this.userToCheck)
              
               axios.post('http://localhost:3030/local/login', 
                { 
                        'username' : this.userToCheck.email,
                        'password' : this.userToCheck.password, 
                              
                }, {
                  withCredentials: true
                })
                .then(function (response) {
                    //console.log(JSON.stringify(response.data))
                    vm.$store.commit('INCREMENT_USER', response.data)
                    console.log('response', response.data)
                    // router.push('/')
                    window.location = 'http://localhost:8080/'
                })
                .catch(error=> {
                    console.log(error)
                    // if (error.response.status == 401){
                    //     this.validationErrors = error.response.data.error;
                    //     console.log('validationErrors:', this.validationErrors)
                    // }
                }) 

            },
            async signFacebook() {
              await axios.get('http://localhost:3000/auth/facebook/secrets').then((response) => {
                this.check = response.data;
                console.log('check',this.check)
                
              })
            },
          
//  méthodes clients
            toRegister() {
              this.$router.push('/register') 
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