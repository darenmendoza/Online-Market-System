<template>
  <article>
    <client-only>
      <b-navbar toggleable="lg">
      <nuxt-link to="/"><b-navbar-brand  tag="b" class="text" @click="fullView = false, searchBar = false"><img src='@/assets/tbh.png' height="50px" class="d-inline-block align-center " alt="tbh" > The Book Haven </b-navbar-brand>
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

          <b-nav-item-dropdown right v-if="users">
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em><b-avatar :src="avatar">
            </b-avatar></em>
            </template>
            <b-dropdown-item><nuxt-link to="/edit-profile" v-if="user != 'thebookhaven20@gmail.com'" style="text-decoration:none; color:black;">Profile</nuxt-link></b-dropdown-item>
            <b-dropdown-item><nuxt-link to="/admin" v-if="user == 'thebookhaven20@gmail.com'">Admin Setting</nuxt-link></b-dropdown-item>
            <b-dropdown-item v-on:click="signout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <nuxt-link to="/login" v-if="!users"><b-button size="sm" class="my-2 my-sm-0">Log In/Sign Up</b-button></nuxt-link>
    </b-navbar>

    <b-container fluid>
      <b-row  class="text-center">
        <b-col >
          <div class="y-auto">
            <div v-if="!searchBar">
            <div class="container" v-if="fullView == false">
              <b-card-group column>
                <div>
                <h2>Best Selling Ebook</h2>
                <b-card-group deck class="container">
                    <b-card :title="books.Title" :img-src="books.Image" img-alt="Image" img-top v-for="(books,index) in items.slice(0,4)" :key="index">
                      <b-card-text>
                        {{books.Author}}<br> 
                      <div>
                        <b-form-rating variant="warning" readonly inline :value="books.Ratings"></b-form-rating>
                      </div> 
                      <p>₱{{books.Price}}</p>
                      </b-card-text>
                      <b-button v-b-toggle.sidebar-right @click.prevent="viewDetails(books.Title,books.Image,books.Author, books.Ratings, books.Price, books.Synopsis,books.Genre)">View Details</b-button>
                      <template #footer>
                        <small class="text-muted"> ({{books.Downloads}}) downloaded</small>
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
                      <p>₱{{books.Price}}</p>
                      </b-card-text>
                      <b-button v-b-toggle.sidebar-right @click.prevent="viewDetails(books.Title,books.Image,books.Author, books.Ratings, books.Price, books.Synopsis,books.Genre)">View Details</b-button>
                      <template #footer>
                        <small class="text-muted"> ({{books.Downloads}}) downloaded</small>
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
                      <p>₱{{books.Price}}</p>
                      </b-card-text>
                      <b-button v-b-toggle.sidebar-right @click.prevent="viewDetails(books.Title,books.Image,books.Author, books.Ratings, books.Price, books.Synopsis,books.Genre)">View Details</b-button>
                      <template #footer>
                        <small class="text-muted"> ({{books.Downloads}}) downloaded) downloaded</small>
                      </template> 
                    </b-card>
                </b-card-group>
                </div>
                
                  <div>
                      <b-sidebar id="sidebar-right" :title="title" img-top right shadow>
                        <div class="px-2 py-3">
                          <b-img :src="img" fluid thumbnail></b-img>
                          <div>
                          <b-button><b-icon icon="heart-fill" aria-hidden="true"></b-icon></b-button>
                          <b-button v-b-toggle.sidebar-right v-on:click.prevent="addedToCart" v-if="!paid"><b-icon icon="cart3" aria-hidden="true"></b-icon> Add to Cart</b-button>
                          <b-button v-b-toggle.sidebar-right v-if="paid" disabled><b-icon icon="check" aria-hidden="false"></b-icon> Books Already Paid</b-button>
                          </div>
                          <p class="text-left">
                            <ul>
                              <li>{{author}}</li>
                              <li>{{synopsis}}</li>
                              <li>{{genre}}</li>
                              <li>Price: ₱{{price}}</li>
                            </ul>
                          </p>
                           <b-form-rating variant="warning" id="rating-inline" inline :value="ratings" readonly></b-form-rating>
                          <p>Rate this book?</p>                         
                          
                        </div>
                      </b-sidebar>
                    </div>
               

              </b-card-group>
              <b-button @click="fullView = true">Show All</b-button>
            </div>
            
            <ShowAll v-if="fullView" v-bind:all="items"/>
            </div>
            <Search v-bind:search="searched" v-if="searchBar" :key="build"/>
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
import ShowAll from './full'
import Search from './search'


export default {

  components: {
    ShowAll,
    Search
  },
  

  mounted(){
    
    firebase.firestore().collection('items').get().then(snapshot => {
            snapshot.docs.forEach(docs => {
                this.items = [...this.items, docs.data()]
            })
        }),

      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.logged = true
          this.users = user.email;
           firebase.firestore().collection('User').where("Email","==",user.email).get().then(snapshot => {
            snapshot.docs.forEach(docs => {
              this.user = [...this.user, docs.data()]
                this.avatar = docs.data().Image
                this.id = docs.id

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
          this.$router.push("/login");
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    displaySearch: function() {
      if(this.findText == ''){
            alert("No Result Found");
      }
      else{
      this.build+=1;
      this.searched = [];
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
          if(this.items[i].Title == result)
          {
            this.searched.push(this.items[i])
            this.searchBar = true;
          }
        }
      }
      
      }

    },

    viewDetails(title,image,author,ratings,price,synopsis,genre){
      this.paid = false;
        this.title = title;
        this.img = image;
        this.author = author;
        this.ratings = ratings;
        this.price = price;
        this.synopsis = synopsis;
        this.genre = genre;

        if(this.logged){
        this.user[0].Paid.forEach(item => {
                    firebase.firestore()
                    .collection('items')
                    .where("Title","==",item)
                    .get().then(snapshot => {
                            if(title == item){
                              this.paid =true
                              
                            }
                    
                      })
              
                    })
        }


    },

    addedToCart: function(){
      

      
      if(this.logged){
        // db.items()
        var bookTitle = this.title;

        firebase.firestore().collection("User").doc(this.id).update({
          Cart: firebase.firestore.FieldValue.arrayUnion(bookTitle)
        }).then(function() {
        alert(bookTitle + " is added to cart");
        console.log("Document successfully updated!");
        })
        .catch(function(error) {
            console.error("Error updating document: ", error);
        });
      } else {
        this.$router.push('/login')
      }

      
    }

    },

    // addCart() {  
    //   var bookTitle = this.title
    //   this.items[0].Cart = this.bookTitle;
      

    // },

    
    data(){
      return {
        value:"",
        users:"",
        findText:"",
        avatar:"",
        count: 0,
        index: 0,
        id:"",
        logged:false,

        items:[],
        user:[],

        title:"",
        img:"",
        ratings:"",
        author:"",
        price:"",
        synopsis:"",
        genre:"",

        paid:false,

        fullView:false,

        searched:[],
        searchBar:false,
        build:0,
       
      }
    },
}
</script>
