<template>
  <article>
    <div class="container" :class="{'sign-up-active' : signUp}">
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-left">
            <h2>Welcome Back!</h2>
            <p>Please login with your personal info</p>
            <button class="invert" id="signIn" @click="signUp = !signUp">Sign In</button>
          </div>
          <div class="overlay-right">
            <h2>Hello, Friend!</h2>
            <p>Please enter your personal details</p>
            <button class="invert" id="signUp" @click="signUp = !signUp">Sign Up</button>
          </div>
        </div>
      </div>
      <div v-if="error" class="error">{{error.message}}</div>
      <form @submit.prevent="signup" class="sign-up">
        <h2>Create login</h2>
        <div>Use your email for registration</div>
        <input type="text" placeholder="Name" required/>
        <div class="email">
          <input type="email" v-model="email" placeholder="Email" required/>
        </div>
        <div class="password">
          <input type="password" v-model="password" placeholder="Password" required/>
        </div>
        <button type="submit" class="button">Sign Up</button>
      </form>
      <form @submit.prevent="login" class="sign-in">
        <h2>Sign In</h2>
        <div>Use your account</div>
        <div class="email">
          <input v-model="email" type="email" placeholder="Email" required/>
        </div>
        <div class="password">
          <input v-model="password" type="password" placeholder="Password" required/>
        </div>
        <a href="#">Forgot your password?</a>
        <button type="submit" class="button">Sign In</button>
      </form>
    </div>
  </article>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  
  methods: {
      signup(){
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(function(result){

          alert("Thank you for signing up");
          
          firebase.auth().currentUser.sendEmailVerification().then(function(result){
                alert("Verification Email Sent");    

                 }).catch(error => {
                    this.error = error;
                 })
        }).catch(function(error){

          alert("Email Already Registered");
          console.log(this.password);
          var errorCode = error.code;
          var errorMessage = error.message;

          if(errorCode == 'auth/weak-password'){
            alert('The password is too weak.');
          }else{
            alert(errorMessage);
          }
          console.log(error);
          
        })
      },
      login(){
          firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then(function(result){
              console.log(result.user.email);
              window.alert("Login Successful");
          })
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            // [START_EXCLUDE]
            if (errorCode === 'auth/wrong-password') {
              alert('Wrong password.');
            } 
            if (errorCode === 'auth/invalid-email') {
              alert('Invalid email.');
            }
            if (errorCode === 'auth/user-disabled') {
              alert('User disabled.');
            }
            if (errorCode === 'auth/user-not-found') {
              alert('User Not Found');
            }
            console.log(error);
            document.getElementById('login').disabled = false;
            // [END_EXCLUDE]
          });
      }
    },
  data: () => {
      return {
        email: "",
        password: '',
        error: '',
        signUp: false
      }
    }

}
</script>

<style lang="scss">
    
    .article {
        display: flex;
        justify-content: center;
    }
    .container {
        position: absolute;
        top: 20%;
        left: 25%;
        width: 768px;
        height: 480px;
        overflow: hidden;
        box-shadow: 0 15px 30px rgba(0, 0, 0, .2),
                    0 10px 10px rgba(0, 0, 0, .2);
        background: linear-gradient(to bottom, #efefef, #ccc);
        
        .overlay-container {
        position: absolute;
        top: 0;
        left: 50%;
        width: 50%;
        height: 100%;
        overflow: hidden;
        transition: transform .5s ease-in-out;
        z-index: 100;
        }
        .overlay {
        position: relative;
        left: -100%;
        height: 100%;
        width: 200%;
        background: linear-gradient(to bottom right, #7FD625, #009345);
        color: #fff;
        transform: translateX(0);
        transition: transform .5s ease-in-out;
        }
        @mixin overlays($property) {
        position: absolute;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-direction: column;
        padding: 20%  8%;
        width: calc(50% -80px);
        height: calc(100% -140px);
        text-align: center;
        transform: translateX($property);
        transition: transform .5s ease-in-out;
        }
        .overlay-left {
        @include overlays(-0%);
        }
        .overlay-right {
        @include overlays(0);
        right: 0;
        }
    }
    h2 {
        margin: 0;
    }
    p {
        margin: 20px 0 30px;
    }
    a {
        color: #222;
        text-decoration: none;
        margin: 15px 0;
        font-size: 1rem;
    }
    button {
        border-radius: 20px;
        border: 1px solid #009345;
        background-color: #009345;
        color: #fff;
        font-size: 1rem;
        font-weight: bold;
        padding: 10px 40px;
        letter-spacing: 1px;
        text-transform: uppercase;
        cursor: pointer;
        transition: transform .1s ease-in;
        &:active {
        transform: scale(.9);
        }
        &:focus {
        outline: none;
        }
    }
    button.invert {
        background-color: transparent;
        border-color: #fff;
    }
    form {
        position:absolute;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-direction: column;
        padding: 120px 85px;
        width: calc(50% -120px);
        height: calc(100% -180px);
        text-align: center;
        background: linear-gradient(to bottom, #efefef, #ccc);
        transition: all .5s ease-in-out;
        div {
        font-size: 1rem;
        }
        input {
        background-color: #eee;
        border: none;
        padding: 8px 15px;
        margin: 6px 0;
        width: calc(100% - 30px);
        border-radius: 15px;
        border-bottom: 1px solid #ddd;
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, .4), 
                            0 -1px 1px #fff, 
                            0 1px 0 #fff;
        overflow: hidden;
        &:focus {
            outline: none;
            background-color: #fff;
        }
        }
    }
    .sign-in {
        left: 0;
        z-index: 2;
    }
    .sign-up {
        left: 0;
        z-index: 1;
        opacity: 0;
    }
    .sign-up-active {
        .sign-in {
        transform: translateX(100%);
        }
        .sign-up {
        transform: translateX(100%);
        opacity: 1;
        z-index: 5;
        animation: show .5s;
        }
        .overlay-container {
        transform: translateX(-100%);
        }
        .overlay {
        transform: translateX(50%);
        }
        .overlay-left {
        transform: translateX(0);
        }
        .overlay-right {
        transform: translateX(20%);
        }
    }
    @keyframes show {
        0% {
        opacity: 0;
        z-index: 1;
        }
        49% {
        opacity: 0;
        z-index: 1;
        }
        50% {
        opacity: 1;
        z-index: 10;
        }
    }
</style>
