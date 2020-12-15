<template>
  <article>
    <client-only>
      <b-navbar toggleable="lg">
      <b-navbar-brand  tag="b" href="homepage" class="text"><img src='@/assets/tbh.png' height="50px" class="d-inline-block align-center " alt="tbh" > The Book Haven </b-navbar-brand>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">  
          <b-nav-form>
            <b-button><b-icon icon="heart-fill" aria-hidden="true"></b-icon> Wishlist </b-button> 
            <b-button><b-icon icon="cart3" aria-hidden="true"></b-icon></b-button>
            <b-form-input size="sm" class="mr-sm-2" v-model="findText" placeholder="Search"></b-form-input>
            <!-- <input type="text" class="form-control" v-model="findText" /> -->
            <b-button size="sm" class="my-2 my-sm-0" v-on:click.prevent="displaySearch" type="submit">Search</b-button>
          </b-nav-form>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em><b-avatar src="https://placekitten.com/300/300">
            </b-avatar></em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item v-on:click="signout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
    </b-navbar>

    <b-container class="edit-profile">
      <b-row>
        <b-col md="3">
          <b-img thumbnail fluid src="https://picsum.photos/250/250/?image=59" alt="Image 3" rounded="circle"></b-img>
          <b-button v-b-modal.modal-upload-img><b-icon icon="upload" aria-hidden="true"></b-icon></b-button>

          <b-modal id="modal-upload-img" title="Upload Profile Image">
            <p class="my-4">Choose a image file from device</p>
            <b-form-group label="Image" label-for="form-image" label-cols-lg="3">
              <b-input-group>
                <b-input-group-prepend is-text>
                  <b-icon icon="image-fill"></b-icon>
                </b-input-group-prepend>
                <b-form-file id="form-image" :disabled="busy" accept="image/*"></b-form-file>
              </b-input-group>
            </b-form-group>
          </b-modal>
        </b-col>
        <b-col md="6">
          <div><h1>Surname, First Name <b-button v-b-toggle.collapse-name><b-icon icon="pencil" aria-hidden="true"></b-icon></b-button></h1>
          </div>
            <b-collapse id="collapse-name" class="mt-2">
              <b-form-group
                id="input-group-1"
                label="Name"
                label-for="input-1"
                >
                  <b-form-input
                    id="input-1"
                    type="text"
                    placeholder="Surname, First Name"
                    required
                  >
                  </b-form-input>
                  <b-button v-b-toggle.collapse-name><b-icon icon="check2" aria-hidden="true"></b-icon></b-button>
              </b-form-group>
            </b-collapse>


          <div>
            <h4>Contact Number <b-button v-b-toggle.collapse-contact-No><b-icon icon="pencil" aria-hidden="true"></b-icon></b-button></h4>
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
                    required
                  >
                  </b-form-input>
                  <b-button v-b-toggle.collapse-contact-No><b-icon icon="check2" aria-hidden="true"></b-icon></b-button>
              </b-form-group>
            </b-collapse>

          <div>
            <h4>Sex <b-button v-b-toggle.collapse-Sex><b-icon icon="pencil" aria-hidden="true"></b-icon></b-button></h4>
          </div>
          
          <b-form-group v-slot="{ ariaDescribedby }">
            <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="male-radios" value="male">Male</b-form-radio>
            <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="female-radios" value="female">Female</b-form-radio>
          </b-form-group>
            <b-collapse id="collapse-Sex" class="mt-2">
              <b-form-group
                id="input-group-Sex"
                label="Name"
                label-for="input-1"
                >
                  <b-form-input
                    id="input-1"
                    type="text"
                    placeholder="Sex"
                    required
                  >
                  </b-form-input>
                  <b-button v-b-toggle.collapse-Sex><b-icon icon="check2" aria-hidden="true"></b-icon></b-button>
              </b-form-group>
            </b-collapse>

          <div>
             <h4>Email <b-button v-b-toggle.collapse-Email><b-icon icon="pencil" aria-hidden="true"></b-icon></b-button></h4>
          </div>
          
           
            <b-collapse id="collapse-Email" class="mt-2">
              <b-form-group
                id="input-group-Email"
                label="Name"
                label-for="input-Email"
                >
                  <b-form-input
                    id="input-Email"
                    type="text"
                    placeholder="email"
                    required
                  >
                  </b-form-input>
                  <b-button><b-icon icon="plus" aria-hidden="true"/></b-button>
                  <b-button v-b-toggle.collapse-Email><b-icon icon="check2" aria-hidden="true"></b-icon></b-button>
              </b-form-group>
            </b-collapse>

          <div>
            <h4>Social Media Links <b-button v-b-toggle.collapse-soc><b-icon icon="pencil" aria-hidden="true"></b-icon></b-button></h4> 
          </div>
           
           <b-button class=""><img src="https://img.icons8.com/cute-clipart/64/000000/facebook-new.png"height="50px"/></b-button>
           <b-button class=""><img src="https://img.icons8.com/cute-clipart/64/000000/google-logo.png" height="50px"/></b-button>
           <b-button class=""><img src="https://img.icons8.com/cute-clipart/64/000000/twitter.png" height="50px"/></b-button>
           
            <b-collapse id="collapse-soc" class="mt-2">
              <b-form-group
                id="input-group-soc"
                label="Name"
                label-for="input-soc"
                >
                  <b-form-input
                    id="input-soc"
                    type="text"
                    placeholder="Link to your account"
                    required
                  >
                  </b-form-input>
                  <b-button v-b-toggle.collapse-soc><b-icon icon="check2" aria-hidden="true"></b-icon></b-button>
              </b-form-group>
            </b-collapse>
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


export default {

  components: {
  },
    
  mounted(){
    
    firebase.firestore().collection('items').get().then(snapshot => {
            snapshot.docs.forEach(docs => {
                this.items = [...this.items, docs.data()]
            })
        })
    
       
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
          console.log(user);
          this.$router.push("/");
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    data: {
      findText: ''
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
    }
    },

    data(){
      return {
        value:"",

        items:[],
      }
    },
}
</script>
