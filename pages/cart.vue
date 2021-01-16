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
            <b-dropdown-item><nuxt-link to="/edit-profile" v-if="user != 'thebookhaven20@gmail.com'">Profile</nuxt-link></b-dropdown-item>
            <b-dropdown-item><nuxt-link to="/admin" v-if="user == 'thebookhaven20@gmail.com'">Admin Setting</nuxt-link></b-dropdown-item>
            <b-dropdown-item v-on:click="signout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <nuxt-link to="/login" v-if="!users"><b-button size="sm" class="my-2 my-sm-0">Log In/Sign Up</b-button></nuxt-link>
    </b-navbar>

        
      
      <b-container class="cart-component">
        <h1 class="text-center">ADD TO CART</h1>
        <b-card no-body class="overflow-hidden" v-for="(books,index) in items" :key="index">
          <b-row no-gutters>
            <b-col md="3">
              <b-card-img :src="books.Image" alt="Image" class="rounded-0"></b-card-img>
              <div> 
                <b-form-checkbox class="cart-checkbox" size="lg" :value="books.Title" unchecked-value="null" v-model="checkTitles" @change="checkBox"></b-form-checkbox>           
              </div>
              
            </b-col>
            <b-col md="6">
              <b-card-body :title="books.Title"> 
                <b-card-text>
                  Author: {{books.Author}}
                </b-card-text>
    
                <b-card-text>
                  Genre: {{books.Genre}}
                </b-card-text>
                <b-card-text>
                  <h5>Price: Php {{books.Price}}</h5>
                </b-card-text>
                  <br>
                  <br>
                <b-button v-b-toggle.sidebar-right @click.prevent="viewDetails(books.Title,books.Image,books.Author, books.Ratings, books.Price, books.Synopsis,books.Genre)">View Details</b-button>
                <b-button><b-icon icon="trash" aria-hidden="true" @click="removeCart(books.Title)"></b-icon></b-button>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      <div>
                      <b-sidebar id="sidebar-right" :title="title" img-top right shadow>
                        <div class="px-2 py-3">
                          <b-img :src="img" fluid thumbnail></b-img>
                          <div>
                          </div>
                          <p class="text-left">
                            <ul>
                              <li>{{author}}</li>
                              <li>{{synopsis}}</li>
                              <li>{{genre}}</li>
                              <li>Price: Php {{price}}</li>
                            </ul>
                          </p>
                           <b-form-rating variant="warning" id="rating-inline" inline :value="ratings" readonly></b-form-rating>
                          <p>Rate this book?</p>                         
                          
                        </div>
                      </b-sidebar>
                    </div>
    <b-container class="checkout-container" fluid>

      <b-navbar class="checkout-bar">
        <div>
          <!-- <b-form-checkbox
                id="checkbox-select-all"
                name="checkout-select-all"
                value="selectall"
                unchecked-value="not_accepted"
              >
          <h6>Select All </h6>
          </b-form-checkbox>  -->
        </div>
        <div>
          <h6>Book Subtotal (No) item/s: TotalPrice: {{checkOutPrice}}</h6>
        </div>

        <div>
          <b-button v-b-modal.checkout-modal><h4><b-icon icon="bag-check-fill" aria-hidden="true"></b-icon> Checkout</h4></b-button>
          
          <b-modal id="checkout-modal" scrollable title="Checkout Summary" hide-footer>
            <div v-for="(Titles, index) in checkOutTitles" :key="index">
              {{Titles}}:       ₱{{indivPrice[index]}}
            </div>
            <h6>Total: {{checkOutPrice}}</h6>
            <div v-if="!paymentFlag">
            <h4>Payment Method</h4>
            <b-button @click="paymentFlag = true">TBH CREDITS</b-button>
            <b-button v-b-tooltip.hover title="Undermaintenance sorry :<" disabled>G-CASH</b-button>
            
            </div>
            <h4 v-if="paymentFlag">TBH Credits: {{Credits}}</h4>
            
            <b-button class="mt-3" block @click="downloadPDF">Buy Now</b-button>
            <b-button class="mt-3" block @click="$bvModal.hide('checkout-modal')">Cancel</b-button>
            <!-- <b-form-input v-model="text" placeholder="johndoe@email.com"></b-form-input>
            <b-form-checkbox
              id="reciept-box-modal"
              v-model="status"
              name="recieptcheckbox"
              value="accepted"
              unchecked-value="not_accepted"
            >
              Send Digital Reciept to email
            </b-form-checkbox> -->
          </b-modal>

          <b-modal id="checkout-success" scrollable title="Checkout Summary" hide-footer>
            <h2>THANK YOU FOR BUYING!</h2>
            <b-button class="mt-3" block id="modal-done" href="#" @click="$bvModal.hide('checkout-success')">Done</b-button>
          </b-modal>
          
        </div>
        
      </b-navbar>      
              
            
                
    
    </b-container>

    </b-container>

    <!-- <b-container class="cart-component">
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
    </b-container> -->

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
import "firebase/storage"



export default {

  components: {
  },

  mounted(){
      firebase.auth().onAuthStateChanged(user => {

        if (user) {
          this.users = user.email
           firebase.firestore().collection('User').where("Email","==",user.email).get().then(snapshot => {
            snapshot.docs.forEach(docs => {
                this.user = [...this.user, docs.data()]
                this.avatar = docs.data().Image
                this.id = docs.id;
                this.Credits = docs.data().Credits;

                this.user[0].Cart.forEach(item => {
                    firebase.firestore()
                    .collection('items')
                    .where("Title","==",item)
                    .get().then(snapshot => {
                      snapshot.docs.forEach(docs => {
                          this.items = [...this.items, docs.data()]
              
                          
                        })
                      })
              
                    })

                    
          
              })
           })
        }
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

    validation: function(){
      let arrCart = this.cart;
      let arrPaid = this.paid;
      
      console.log(arrCart);
      for(let i = 0; i <= arrCart.length; i++){
        //console.log(arrCart[i]);
      }
    },

    viewDetails(title,image,author,ratings,price,synopsis,genre){
        this.title = title;
        this.img = image;
        this.author = author;
        this.ratings = ratings;
        this.price = price;
        this.synopsis = synopsis;
        this.genre = genre;
    },

    checkBox(){

      let val = this.checkTitles;
      let arr = this.items;
      let titles = [];
      let arrPrice = this.checkPrice;
      let temp = [];
      let tempPrice = [];
      let arrPrices = [];
      let total = 0;
      let tempIndivPrice = [];

      for(let i = 0; i < arr.length; i++){
        temp = arr[i].Title;
        tempPrice = arr[i].Price
        titles.push(temp);
        arrPrices.push(tempPrice);
      }
      temp = [];
      for(let i =  0; i < val.length; i++){
        let title = val[i];
        for(let j = 0; j < titles.length; j++){
          if(val[i].includes(titles[j])){
            tempIndivPrice.push(arrPrices[j]);
            temp.push(val[i]);
            total = total + parseInt(arrPrices[j]);
          }
        }
      }
      this.checkOutTitles = temp;
      this.checkOutPrice = total;
      this.indivPrice = tempIndivPrice;

      
      
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


    downloadPDF (bvModalEvent){
      // Get a reference to the storage service, which is used to create references in your storage bucket
      var storage = firebase.storage();
      


      // Create a storage reference from our storage service
      var storageRef = storage.ref();
      for(let i = 0; i < this.checkOutTitles.length; i++){
      let temp = this.checkOutTitles[i];
      this.removeCart(temp);
      console.log(temp);
      this.updatePaid(temp);
      this.Credits-=this.checkOutPrice;
      var url = storageRef.child('PDF/' + temp + '.pdf').getDownloadURL().then(function(url) {

      // `url` is the download URL for 'images/stars.jpg'
      
      // This can be downloaded directly:
       let xhr = new XMLHttpRequest();
       xhr.open('GET', url);
       xhr.responseType = 'blob';
       let formData = new FormData(this);
       xhr.send(formData); 

       xhr.onload = function(e) {
      // Create a new Blob object using the 
      //response data of the onload object
      var blob = new Blob([this.response], {type: 'image/pdf'});
      //Create a link element, hide it, direct 
      //it towards the blob, and then 'click' it programatically
      let a = document.createElement("a");
      a.style = "display: none";
      document.body.appendChild(a);
      //Create a DOMString representing the blob 
      //and point the link element towards it
      let urli = window.URL.createObjectURL(blob);
      a.href = urli;
      a.download = temp + '.pdf';
      //programatically click the link to trigger the download
      a.click();
      //release the reference to the file by revoking the Object URL
      window.URL.revokeObjectURL(urli);
    };
      

      console.log(temp);
    }).catch(function(error) {
      console.log(error);

  //     switch (error.code) {
  //   case 'storage/object-not-found':
  //     alert("not found");
  //     break;

  //   case 'storage/unauthorized':
  //     alert("dont have permission");
  //     break;

  //   case 'storage/canceled':
  //     alert("canceled");
  //     break;

  //   case 'storage/unknown':
  //     alert("unknown");
  //     break;
  // }
    });
      }
      this.Credits-=this.checkOutPrice;
      this.user[0].Credits = this.Credits;

      firebase.firestore().collection("User").doc(this.id).update({
        Credits: this.Credits
      }).then(function() {
      console.log("Document successfully updated!");
      })
      .catch(function(error) {
          console.error("Error updating document: ", error);
      });

      this.checkOutPrice = 0;
      this.$bvModal.show('checkout-success');
      this.$bvModal.hide('checkout-modal');
      
      
      
      
    },



    removeCart(title){
     
      this.items = this.items.filter(del => del.Title !== title)

        firebase.firestore().collection("User").doc(this.id).update({
        Cart: firebase.firestore.FieldValue.arrayRemove(title)
      }).then(function() {
      console.log("Document successfully updated!");
      })
      .catch(function(error) {
          console.error("Error updating document: ", error);
      });
      
    },

    updatePaid(title){
      var bookTitle = title;

      firebase.firestore().collection("User").doc(this.id).update({
        Paid: firebase.firestore.FieldValue.arrayUnion(bookTitle)
      }).then(function() {
      console.log("Document successfully updated!");
      })
      .catch(function(error) {
          console.error("Error updating document: ", error);
      });
    }

    },

    data(){
      return {
        value:"",
        users:"",
        findText:"",
        selected:"",
        items:[],
        user:[],
        avatar:"",

        name:"",
        email:"",
        contact:"",
        image:"",
        socmed:"",
        id:"",

        title:"",
        img:"",
        ratings:"",
        author:"",
        price:"",
        synopsis:"",
        genre:"",

        Credits:0,

        checkPrice: [],
        checkTitles: [],
        checkOutTitles: [],
        checkOutPrice: 0,
        testURL: "",
        paid: [],
        cart: [],
        checkoutSummary:[],
        indivPrice:[],

        paymentFlag:false,

      }
    },
}
</script>
