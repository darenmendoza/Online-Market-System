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
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
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

    <b-container fluid>
      <b-row  class="text-center">
        <b-col >
          <div class="y-auto">
            <div class="container">
              <b-card-group column>
                
                <h2>Best Selling Ebook</h2>
                <b-card-group deck class="container ">
                  <div v-for="products in items" :key="products">
                      <item v-bind:books="products" />
                  </div>
                </b-card-group>
                
               
                <h2>Popular Ebooks</h2>
                <b-card-group deck class="container">
                  <div v-for="products in items" :key="products">
                      <item v-bind:books="products" />
                  </div>
                </b-card-group>
                
               
                <h2>Recently Added</h2>
                <b-card-group deck class="container">
                  <div v-for="products in items" :key="products">
                      <item v-bind:books="products" />
                  </div>
                </b-card-group>
                

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
import item from './item'
import firebase from 'firebase/app'
import "firebase/firestore"


export default {

  components: {
    item
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
    }

    },

    data(){
      return {
        value:"",

        items:[]
      }
    }
}
</script>
