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

    <b-container class="cart-component">
      <h1>ADD TO CART</h1>
      <b-card no-body class="overflow-hidden">
        <b-row no-gutters>
          <b-col md="3">
            <b-card-img src="https://picsum.photos/400/400/?image=20" alt="Image" class="rounded-0"></b-card-img>
            <div>
              <b-form-checkbox class="cart-checkbox" size="lg"></b-form-checkbox>
            </div>
            
          </b-col>
          <b-col md="6">
            <b-card-body title="Book Name"> 
              <b-card-text>
                Author
              </b-card-text>
              <b-card-text>
                Publisher
              </b-card-text>
              <b-card-text>
                <h5>Price</h5>
              </b-card-text>
                <br>
                <br>
              

              <b-button variant="outline-primary">View Details</b-button>
              <b-button><b-icon icon="trash" aria-hidden="true"></b-icon></b-button>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </b-container>

    <b-container class="cart-component">
      <b-card no-body class="overflow-hidden">
        <b-row no-gutters>
          <b-col md="3">
            <b-card-img src="https://picsum.photos/400/400/?image=20" alt="Image" class="rounded-0"></b-card-img>
            <div>
              <b-form-checkbox class="cart-checkbox" size="lg"></b-form-checkbox>
            </div>
            
          </b-col>
          <b-col md="6">
            <b-card-body title="Book Name"> 
              <b-card-text>
                Author
              </b-card-text>
              <b-card-text>
                Publisher
              </b-card-text>
              <b-card-text>
                <h5>Price</h5>
              </b-card-text>
                <br>
                <br>
              

              <b-button variant="outline-primary">View Details</b-button>
              <b-button><b-icon icon="trash" aria-hidden="true"></b-icon></b-button>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
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
