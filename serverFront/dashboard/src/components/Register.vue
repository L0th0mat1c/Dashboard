<template>
  <div class="container">
      <div class="col-md-6 mx-auto text-center">
         <div class="header-title">
            <h1 class="wv-heading--title">
               Joins us !
            </h1>
            <h2 class="wv-heading--subtitle">
               Create your account and access to the dashboard
            </h2>
         </div>
      </div>
      <div class="row">
         <div class="col-md-4 mx-auto">
            <div class="myform form ">
                <div class="form-group">
                  <input type="text" id="first_name" name="first_name" placeholder="First name" class="form-control my-input" v-model="newDataUser.first_name" >
                </div>
                <div class="form-group">
                  <input type="text" id="last_name" name="last_name" placeholder="Last name" class="form-control my-input" v-model="newDataUser.name">
                </div>
                <div class="form-group">
                  <input type="text" id="email" name="email" placeholder="Email" class="form-control my-input" v-model="newDataUser.email">
                </div>
                <div class="form-group">
                  <input type="password" id="password" name="password" placeholder="Password" class="form-control my-input" v-model="newDataUser.password">
                </div>
                <div class="form-group">
                  <input type="password" id="password_confirm" name="password_confirm" placeholder="Confirm your password" class="form-control my-input">
                </div>
                <div class="text-center ">
                  <button @click="newUser()" type="submit" class=" btn btn-block send-button tx-tfm">Create Your Free Account</button>
                </div>
                <div class="col-md-12 ">
                    <div class="login-or">
                      <hr class="hr-or">
                      <span class="span-or">or</span>
                    </div>
                </div>
                <div class="form-group">
                    <button @click="toLogin()" type="submit" class="btn btn-block btn-dark">Login</button>
                </div>
            </div>
         </div>
         
      </div>
   </div>
</template>

<script>
import axios from 'axios'
    export default {
        name: "login",
        data(){
            return{
                newDataUser: {},
                validationErrors:null,
            }
        },
        methods: {
            newUser(){
                axios.post('http://localhost:3030/local/adduser', 
                    {
                            'first_name' : this.newDataUser.first_name,
                            'name' : this.newDataUser.name,
                            'email' : this.newDataUser.email,
                            'password' : this.newDataUser.password,
                            
                    })
                    .then(function (response) {
                        console.log(JSON.stringify(response.data))
                    })
                    .catch(error=> {
                        console.log(error)
                    // if (error.response.status == 401){
                    //     this.validationErrors = error.response.data.error;
                    //     console.log('validationErrors:', this.validationErrors)
                    // }
                    }) 
                this.$router.push('/login')           
            },
            async toLogin(){
              this.$router.push('/login') 
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