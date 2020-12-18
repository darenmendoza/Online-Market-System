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

          <b-nav-item-dropdown right v-if="user">
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em><b-avatar :src="avatar">
            </b-avatar></em>
            </template>
            <b-dropdown-item><nuxt-link to="/edit-profile" v-if="user != 'thebookhaven20@gmail.com'">Profile</nuxt-link></b-dropdown-item>
            <b-dropdown-item><nuxt-link to="/admin" v-if="user == 'thebookhaven20@gmail.com'">Admin Setting</nuxt-link></b-dropdown-item>
            <b-dropdown-item v-on:click="signout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <nuxt-link to="/" v-if="!user"><b-button size="sm" class="my-2 my-sm-0">Log In/Sign Up</b-button></nuxt-link>
    </b-navbar>

    <b-container fluid>
      <b-row  class="text-center">
        <b-col >
          <div class="y-auto">
            <div class="container">
              <b-card-group column>
                <div>
                <h2>Best Selling Ebook</h2>
                <b-card-group deck class="container">
                    <b-card :title="books.Title" :img-src="books.Image" img-alt="Image" img-top v-for="books in items.slice(0,4)" :key="books.best">
                      <b-card-text>
                        {{books.Author}} <br> 
                      <div>
                        <b-form-rating variant="warning" readonly inline :value="books.Ratings"></b-form-rating>
                      </div> 
                      <p>{{books.Price}}</p>
                      </b-card-text>
                      <b-button v-b-toggle.sidebar-right>View Details</b-button>
                      <template #footer>
                        <small class="text-muted"> (0) downloaded</small>
                      </template> 
                    </b-card>
                </b-card-group>
                </div>
                <div>
                <h2>Popular Ebooks</h2>
                <b-card-group deck class="container">
                  <b-card :title="books.Title" :img-src="books.Image" img-alt="Image" img-top v-for="books in items.slice(0,4)" :key="books.popular">
                      <b-card-text>
                        {{books.Author}} <br> 
                      <div>
                        <b-form-rating variant="warning" readonly inline :value="books.Ratings"></b-form-rating>
                      </div> 
                      <p>{{books.Price}}</p>
                      </b-card-text>
                      <b-button v-b-toggle.sidebar-right>View Details</b-button>
                      <template #footer>
                        <small class="text-muted"> (0) downloaded</small>
                      </template> 
                    </b-card>
                </b-card-group>
                </div>
                <div>
                <h2>Recently Added</h2>
                <b-card-group deck class="container">
                  <b-card :title="books.Title" :img-src="books.Image" img-alt="Image" img-top v-for="(books,index) in items.slice(0,4)" :key="index">
                      <b-card-text>
                        {{books.Author}} <br> 
                      <div>
                        <b-form-rating variant="warning" readonly inline :value="books.Ratings"></b-form-rating>
                      </div> 
                      <p>{{books.Price}}</p>
                      </b-card-text>
                      <b-button v-b-toggle.sidebar-right>View Details</b-button>
                      <template #footer>
                        <small class="text-muted"> (0) downloaded</small>
                      </template> 
                    </b-card>
                </b-card-group>
                </div>
                  <div>
                      <b-sidebar id="sidebar-right" title="Book Title" right shadow>
                        <div class="px-2 py-3">
                          <b-img src="@/assets/empty-out-the-negative-1.jpg" fluid thumbnail></b-img>
                          <b-button><b-icon icon="heart-fill" aria-hidden="true"></b-icon></b-button>
                          <b-button><b-icon icon="cart3" aria-hidden="true"></b-icon> Add to Cart</b-button>
                          <p class="text-left">
                            <ul>
                              <li>Author</li>
                              <li>Sypnosis Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi deserunt consectetur debitis perspiciatis id quam sint cupiditate explicabo praesentium provident, esse eaque fugit quidem voluptatem corrupti at nisi accusantium iusto.</li>
                              <li>Genre</li>
                              <li>Date Published</li>
                            </ul>
                          </p>
                           <b-form-rating variant="warning" id="rating-inline" inline value="3"></b-form-rating>
                          <p>Rate this book?</p>                         
                          
                        </div>
                      </b-sidebar>
                    </div>
               

              </b-card-group>
            </div>
            
          </div>
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


export default {

  components: {
  },

  mounted(){
    
    firebase.firestore().collection('items').get().then(snapshot => {
            snapshot.docs.forEach(docs => {
                this.items = [...this.items, docs.data()]
            })
        }),

      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.user = user.email;
           firebase.firestore().collection('User').where("Email","==",user.email).get().then(snapshot => {
            snapshot.docs.forEach(docs => {
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
          console.log(user);
          this.$router.push("/");
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
        }
      }
      if(result == ''){
        console.log('No Result Found');
      }
    }
    },
    data(){
      return {
        value:"",
        user:"",
        findText:"",
        avatar:"",

        items:[]
       
      }
    },
}
</script>
