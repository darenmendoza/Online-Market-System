<template>
  <article>
    {{ state() }}
    <div class="container" :class="{ 'sign-up-active': signUp }">
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-left">
            <h2>Welcome Back!</h2>
            <p>Please login with your personal info</p>
            <button class="invert" id="signIn" @click="signUp = !signUp">
              Sign In
            </button>
          </div>
          <div class="overlay-right">
            <h2>Hello, Friend!</h2>
            <p>Please enter your personal details</p>
            <button class="invert" id="signUp" @click="signUp = !signUp">
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <div v-if="error" class="error">{{ error.message }}</div>
      <form @submit.prevent="signup" class="sign-up">
        <h2>Create login</h2>
        <div>Use your email for registration</div>
        <input type="text" placeholder="Name" v-model="name" required />
        <div class="email">
          <input type="email" v-model="email" placeholder="Email" required />
        </div>
        <div class="password">
          <input
            type="password"
            v-model="password"
            placeholder="Password"
            required
          />
        </div>
        <br />
        <button type="submit" class="button">Sign Up</button>
      </form>
      <form @submit.prevent="login" class="sign-in">
        <h2>Sign In</h2>
        <div>Use your account</div>
        <br />
        <div class="email">
          <input
            v-model="email"
            id="email"
            type="email"
            placeholder="Email"
            required
          />
        </div>
        <div class="password">
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <div class="checkbox">
          <input
            v-model="checked"
            type="checkbox"
            class="form-check-input"
            id="remembermebox"
          />
          <label class="form-check-label" for="remembermebox"
            >-- Remember Me</label
          >
        </div>
        <a @click="showModal = true">Forgot your password?</a>
        <button type="submit" class="button">Sign In</button>
      </form>
    </div>
    <transition name="fade" appear>
      <div
        class="modal-overlay"
        v-if="showModal"
        @click="showModal = false"
      ></div>
    </transition>
    <transition name="form" appear>
      <div class="modal-form" v-if="showModal">
        <div class="vue-tempalte">
          <form @submit.prevent="reset">
            <h3>Forgot Password</h3>
            <div class="form-group">
              <label>Email address</label>
              <input type="email" v-model="ResetEmail" required />
            </div>
            <button type="submit">Reset password</button>
          </form>
        </div>
      </div>
    </transition>
  </article>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"

var user = firebase.auth().currentUser;
let userId = "thebookhaven20@gmail.com";

export default {
  methods: {
    state() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log(user);
        }
      });
    },

    signup() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          firebase.firestore().collection("User").add({
              Name: this.name,
              Email: this.email,
              Role: 'Client',
              Image: 'Not Uploaded',
              Contact: 'Please Enter Contact Number',
              Cart:[],
              Paid:[],
              Status:"Active",
              SocialMedia:[],
              Credits:5000
          })
          .then(function(docRef) {
              console.log("Document written with ID: ", docRef.id);
          })
          .catch(function(error) {
              console.error("Error adding document: ", error);
          });

          
          console.log(user);
          firebase
            .auth()
            .currentUser.sendEmailVerification()
            .then((user) => {
              alert("Thank you for signing up");
              alert("Verification Email Sent");
              this.$router.push('/')
            })
            .catch((error) => {
              console.log(error);
              this.error = error;
            });
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;

          if (errorCode == "auth/weak-password") {
            alert("The password is too weak.");
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
    },
    login() {
      
      if(this.email == userId)
      {
        
         firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          this.$router.push("/admin");
          if (document.getElementById("remembermebox").checked == true) {
            firebase
              .auth()
              .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
          } else {
            firebase
              .auth()
              .setPersistence(firebase.auth.Auth.Persistence.SESSION);
          }
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          // [START_EXCLUDE]
          if (errorCode === "auth/wrong-password") {
            alert("Wrong password.");
          }
          if (errorCode === "auth/invalid-email") {
            alert("Invalid email.");
          }
          if (errorCode === "auth/user-disabled") {
            alert("User disabled.");
          }
          if (errorCode === "auth/user-not-found") {
            alert("User Not Found");
          }
          console.log(error);
          // document.getElementById('login').disabled = false;
          // [END_EXCLUDE]
        });

      }




      firebase.firestore().collection('User').where("Email","==",this.email).get().then(snapshot => {
            snapshot.docs.forEach(docs => {
                if(docs.data().Status == 'Active')
                {
                    firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          console.log(user.user.email);
          if (user.user.email != userId) {
            this.$router.push("/");
          } else {
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";
          }

          if (document.getElementById("remembermebox").checked == true) {
            firebase
              .auth()
              .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
          } else {
            firebase
              .auth()
              .setPersistence(firebase.auth.Auth.Persistence.SESSION);
          }
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          // [START_EXCLUDE]
          if (errorCode === "auth/wrong-password") {
            alert("Wrong password.");
          }
          if (errorCode === "auth/invalid-email") {
            alert("Invalid email.");
          }
          if (errorCode === "auth/user-disabled") {
            alert("User disabled.");
          }
          if (errorCode === "auth/user-not-found") {
            alert("User Not Found");
          }
          console.log(error);
          // document.getElementById('login').disabled = false;
          // [END_EXCLUDE]
        });






                }
                else{
                  alert("Account Disabled!")
                }
            })
        }).catch(function(error) {
        console.log("Error getting documents: ", error);
    });




      
    },
    reset() {
      firebase
        .auth()
        .sendPasswordResetEmail(this.ResetEmail)
        .then(function(result) {
          alert("Password Reset Email Sent!");
          window.location.reload(true);
        })
        .catch(function(error) {
          alert("Error occured! please try again next time");
          console.log(error);
          window.location.reload(true);
        });
    },
  },
  data: () => {
    return {
      name:"",
      email: "",
      password: "",
      error: "",
      signUp: false,
      ResetEmail: "",
      showModal: false,
      checked: false,
    };
  },
};
</script>
<style lang="scss" scoped>
.article {
  display: flex;
  justify-content: center;
}
.container {
  position: absolute;
  top: 10%;
  left: 25%;
  width: 768px;
  height: 480px;
  overflow: hidden;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
  background: #52796f;

  .overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.5s ease-in-out;
    z-index: 100;
  }
  .overlay {
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    background: #84a98c;
    color: #fff;
    transform: translateX(0);
    transition: transform 0.5s ease-in-out;
  }
  @mixin overlays($property) {
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    padding: 20% 8%;
    width: calc(50% -80px);
    height: calc(100% -130px);
    text-align: center;
    transform: translateX($property);
    transition: transform 0.5s ease-in-out;
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
  border: 1px solid #009345;
  background-color: #2f3e46;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  padding: 10px 40px;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.1s ease-in;
  &:active {
    transform: scale(0.9);
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
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  padding: 70px 83px;
  width: calc(50% -90px);
  height: calc(100% -180px);

  text-align: center;
  background: #cad2c5;
  transition: all 0.5s ease-in-out;
  div {
    font-size: 1rem;
  }

  input {
    background-color: #eee;
    border: none;
    padding: 8px 20px;
    margin: 6px 0;
    border-radius: 15px;
    border-bottom: 1px solid #ddd;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.4), 0 -1px 1px #fff,
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
    animation: show 0.5s;
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

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 20px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffff;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 15px;
  width: 15px;
  left: 4px;
  bottom: 2px;
  background-color: #2f3e46;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #009345;
}

input:focus + .slider {
  box-shadow: 0 0 1px #1fd172;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

// TEMPORARY MODAL ANIMATION WILL CHANGE NEXT SPRINT
.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 101;
  background-color: rgba(0, 0, 0, 0.3);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.modal-form {
  position: fixed;
  top: 19%;
  left: 40%;
  transform: translate(-19%, -40%);
  z-index: 102;
}
</style>
