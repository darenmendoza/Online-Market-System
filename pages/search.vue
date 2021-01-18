<template>
  <div>
    <h2>Search a Book!</h2>
    <b-card-group deck v-for="row in formattedClubs" :key="row.index" style="margin: 2rem">
        <b-card :title="books.Title" :img-src="books.Image" img-alt="Image" img-top v-for="books in row" :key="books.popular" style="max-width: 25%;">
                      <b-card-text>
                        {{books.Author}} <br> 
                      <div>
                        <b-form-rating variant="warning" readonly inline :value="books.Ratings"></b-form-rating>
                      </div> 
                      <p>₱ {{books.Price}}</p>
                      </b-card-text>
                      <b-button v-b-toggle.sidebar-right @click.prevent="viewDetails(books.Title,books.Image,books.Author, books.Ratings, books.Price, books.Synopsis,books.Genre)">View Details</b-button>
                      <template #footer>
                        <small class="text-muted"> ({{books.Downloads}}) downloaded</small>
                      </template> 
                    </b-card>
    </b-card-group>
    <div>
                      <b-sidebar id="sidebar-right" :title="title" img-top right shadow>
                        <div class="px-2 py-3">
                          <b-img :src="img" fluid thumbnail></b-img>
                          <div>
                          <b-button v-b-toggle.sidebar-right v-on:click.prevent="addedToCart" v-if="!paid"><b-icon icon="cart3" aria-hidden="true"></b-icon> Add to Cart</b-button>
                          <b-button v-b-toggle.sidebar-right v-on:click.prevent="addedToCart" v-if="paid" disabled><b-icon icon="check" aria-hidden="false"></b-icon> Books Already Paid</b-button>
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
    

    
  </div>
</template>

<script>
import firebase from 'firebase/app'
import "firebase/firestore"
import "firebase/auth"

export default {

props: ['search'],
  components:{
      

  },
  mounted(){

         
    
    this.clubs = this.search;
    
         
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.logged = true
          this.users = user.email;
           firebase.firestore().collection('User').where("Email","==",user.email).get().then(snapshot => {
            snapshot.docs.forEach(docs => {
              this.user = [...this.user, docs.data()]
                this.id = docs.id

            })
        }).catch(function(error) {
        console.log("Error getting documents: ", error);
    });
        }
      });

      
       
  },

  methods:{

      viewDetails(title,image,author,ratings,price,synopsis,genre){
          console.log(this.clubs)
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

    addedToCart(){
      
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

    },

    

    
  },

  data: function () {
    return {
      clubs: [],
      id:"",
      logged:false,
      title:"",
      img:"",
      ratings:"",
      author:"",
      price:"",
      synopsis:"",
      genre:"",
      user:[],
      paid:false
    }
  },
  computed: {
      formattedClubs() {
          return this.clubs.reduce((c, n, i) => {
              if (i % 4 === 0) c.push([]);
              c[c.length - 1].push(n);
              return c;
          }, []);
      }
  }
}
</script>