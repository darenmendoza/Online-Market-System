<template>
  <article>
    <client-only>
      <b-navbar toggleable="lg">
        <nuxt-link to="/"><b-navbar-brand  tag="b" class="text"><img src='@/assets/tbh.png' height="50px" class="d-inline-block align-center " alt="tbh" > The Book Haven </b-navbar-brand>
      </nuxt-link>
      <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">  
          <b-nav-form>
            <b-button><b-icon icon="heart-fill" aria-hidden="true"></b-icon> Wishlist </b-button> 
            <nuxt-link to="/cart"><b-button><b-icon icon="cart3" aria-hidden="true"></b-icon></b-button></nuxt-link>
            <b-form-input size="sm" class="mr-sm-2" v-model="findText" placeholder="Search"></b-form-input>
            <!-- <input type="text" class="form-control" v-model="findText" /> -->
            <b-button size="sm" class="my-2 my-sm-0" v-on:click.prevent="displaySearch" type="submit">Search</b-button>
          </b-nav-form>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em><b-avatar :src="avatar">
            </b-avatar></em>
            </template>
            <b-dropdown-item v-on:click="signout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
    </b-navbar>

    <b-container class="edit-profile" v-for="(user,index) in items" :key="index">
      <b-row>
        <b-col md="3">
          <b-avatar :src="user.Image" size="250"></b-avatar>
          <b-button class="upload-btn" @click="modalShow = !modalShow"><b-icon icon="upload" aria-hidden="true"></b-icon></b-button> 
          <b-modal v-model="modalShow" title="Upload Profile Image" ref="modal" hide-footer>
            <p class="my-4">Upload your Profile</p>
            <b-form-file
              v-model="file1"
              :state="Boolean(file1)"
              placeholder="Choose a Picture or drop it here..."
              drop-placeholder="Drop file here..."
              accept="image/*"
            ></b-form-file>
            <div class="mt-3">Selected file: {{ file1 ? file1.name : '' }}</div>
            <div class="mt-3">
              <b-button @click="uploadFile" v-if="file1 ? file1.name : ''">Upload Picture</b-button>
            </div>
          </b-modal> 
        </b-col>


        <b-col md="6">

          <div><h1>{{user.Name}}  <b-button v-b-toggle.collapse-name><b-icon icon="pencil" aria-hidden="true"></b-icon></b-button></h1>
          </div>
            <b-collapse id="collapse-name" class="mt-2">
              <b-form-group
                id="input-group-1"
                label="Name"
                label-for="input-1"
                valid-feedback="Thank you!"
                >
                  <b-form-input id="input-1" v-model="name" trim></b-form-input>
                   <b-button v-b-toggle.collapse-name @click="changeName" v-if="name.length > 4"><b-icon icon="check2" aria-hidden="true"></b-icon></b-button>
              </b-form-group>
             
            </b-collapse>


          <div>
            <h4>{{user.Contact}}  <b-button v-b-toggle.collapse-contact-No><b-icon icon="pencil" aria-hidden="true"></b-icon></b-button></h4>
          </div>
            <b-collapse id="collapse-contact-No" class="mt-2">
              <b-form-group
                id="input-group-contact-No"
                label="Contact No."
                label-for="input-1"
                >
                  <b-form-input
                    id="input-1"
                    type="text"
                    placeholder="+63### ### ###"
                    maxlength="11"
                    @keypress="onlyNumber"
                    v-model="contact"
                    required
                  >
                  </b-form-input>
                  <b-button v-b-toggle.collapse-contact-No @click="changeContact" v-if="contact.length == 11"><b-icon icon="check2" aria-hidden="true"></b-icon></b-button>
              </b-form-group>
            </b-collapse>
          <div>
             <h4>{{user.Email}} </h4>
          </div>
          

          <div>
            <h4>Social Media Links <!--<b-button v-b-toggle.collapse-soc><b-icon icon="pencil" aria-hidden="true"></b-icon></b-button>!--></h4> 
          </div>

           <div v-for="(sns,index) in user.SocialMedia" :key="index">
              <b-link :href="sns">{{sns}}</b-link>
            </div>
           <!--
            <b-collapse id="collapse-soc" class="mt-2">
              <b-form-group
                id="input-group-soc"
                label="Account"
                label-for="input-soc"
                >
                  <b-form-input
                    id="input-soc"
                    type="text"
                    placeholder="Link to your account"
                    v-model="socmed"
                    required
                  >
                  </b-form-input>
                  <b-button v-b-toggle.collapse-soc><b-icon icon="check2" aria-hidden="true"></b-icon></b-button>
              </b-form-group>
            </b-collapse> !-->
          </b-col>
      </b-row>
    </b-container>

    <b-container fluid class="page-footer">
      <b-row>
        <b-col class="text-center"><h4>The Book Haven</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos corporis, cumque nostrum accusamus, mollitia excepturi, non incidunt iure explicabo totam temporibus perspiciatis qui? Non nostrum sequi rerum accusantium delectus optio.</p>
        </b-col>
        <b-col class="text-center"><h4>Payment</h4>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit atque ratione earum voluptate quae sint suscipit sapiente. Sapiente, porro distinctio ducimus consequuntur nulla, nihil numquam quo modi ratione, quas at?
        </p>
        </b-col>
        <b-col class="text-center"><h4>Customer Service</h4>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum repellat officia ipsa incidunt nam vitae adipisci dolores hic dolorum officiis voluptatem tenetur asperiores neque, necessitatibus facilis deleniti quo odio ab.</p>
        </b-col>
      </b-row>
    </b-container>
    </client-only>
  </article>
</template>


<script>
import firebase from 'firebase/app'
import "firebase/firestore"
import "firebase/auth"
import "firebase/storage"

export default {

  components: {
  },

  computed: {
      
        
    },
    
  mounted(){

    firebase.auth().onAuthStateChanged(user => {
        if (user) {

          firebase.firestore().collection('User').where("Email","==",user.email).get().then(snapshot => {
            snapshot.docs.forEach(docs => {
                this.items = [...this.items, docs.data()]
                this.id = docs.id
                this.avatar = docs.data().Image
            })
        }).catch(function(error) {
        console.log("Error getting documents: ", error);
    });
          
        }
      });
       
  },

  methods: {
      linkGen(pageNum) {
        return pageNum === 1 ? '?' : `?page=${pageNum}`
      },
       signout() {
      firebase
        .auth()
        .signOut()
        .then(user => {
          this.$router.push("/login");
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    displaySearch: function() {
      let val = this.findText;
      let arr = this.items;
      let arrayTitle = [];
      let result = [];
      let temp = '';
      let arrayTemp = [];
      console.log(`You've searched for: ${val}`);
      val = val.toLowerCase();
      for(let i = 0; i < arr.length; i++){
        temp = arr[i].Title;
        arrayTitle.push(temp);
        arrayTemp.push(temp);
      }
      console.log('Result:');
      arrayTemp = arrayTemp.map(arrayTemp => arrayTemp.toLowerCase());
      for(let i = 0; i < arrayTemp.length; i++){
        if(arrayTemp[i].includes(val)){
          result = arrayTitle[i];
          console.log(result);
          alert('Found the book: ' + result);
          
        }
      }
      if(result == ''){
        console.log('No Result Found');
        alert('No Result Found')
      }
    },

    changeName() {  
      
      this.items[0].Name = this.name;
      firebase.firestore().collection("User").doc(this.id).update({
        Name: this.items[0].Name
      }).then(function() {
      console.log("Document successfully updated!");
      })
      .catch(function(error) {
          console.error("Error updating document: ", error);
      });

    },
    onlyNumber ($event) {
        let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
        if ((keyCode < 48 || keyCode > 57)) {
            $event.preventDefault();
      }
    },

    
    changeContact() {  
      
      this.items[0].Contact = this.contact;
      firebase.firestore().collection("User").doc(this.id).update({
        Contact: this.items[0].Contact
      }).then(function() {
      console.log("Document successfully updated!");
      })
      .catch(function(error) {
          console.error("Error updating document: ", error);
      });
    },

    uploadFile(){

      let file = this.file1
                var storageRef = firebase.storage().ref('Profile/' + this.items[0].Email + '/' + file.name);
                let uploadTask = storageRef.put(file)
                
                uploadTask.on('state_changed', (snapshot) =>{

                }, (error) =>{

                }, () =>{

                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        this.image = downloadURL
                        this.items[0].Image = this.image
                        this.avatar = this.items[0].Image
                        firebase.firestore().collection("User").doc(this.id).update({
                          Image: this.items[0].Image
                        }).then(function() {
                          
                        console.log("Document successfully updated!");
                        })
                        .catch(function(error) {
                            console.error("Error updating document: ", error);
                        });  
                                  
                    });
                });

      this.modalShow = false;
      
    },
    hideModal() {
        this.$refs['modal'].hide()
      }
  

    },

    data(){
      return {
        value:"",
        user:"",
        findText:"",
        selected:"",
        items:[],
        avatar:"",

        name:"",
        email:"",
        contact:"",
        image:"",
        socmed:"",
        id:"",

        file1: null,

         modalShow: false
      }
    },
}
</script>
