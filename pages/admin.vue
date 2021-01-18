<template>
  <article>
    <client-only>
      <b-navbar toggleable="lg">
        <b-navbar-brand tag="b" class="text"
          ><img
            src="@/assets/tbh.png"
            height="50px"
            class="d-inline-block align-center "
            alt="tbh"
          />
          The Book Haven
        </b-navbar-brand>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <!--<b-button
              ><b-icon icon="heart-fill" aria-hidden="true"></b-icon> Wishlist
            </b-button>
            <b-button
              ><b-icon icon="cart3" aria-hidden="true"></b-icon
            ></b-button>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              v-model="findText"
              placeholder="Search"
            ></b-form-input> !-->
            <!-- <input type="text" class="form-control" v-model="findText" /> -->
           <!-- <b-button
              size="sm"
              class="my-2 my-sm-0"
              v-on:click.prevent="displaySearch"
              type="submit"
              >Search</b-button
            >-->
          </b-nav-form>

          <b-nav-item-dropdown right v-if="user">
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em
                ><b-avatar src="@/assets/tbh.png"> </b-avatar
              ></em>
            </template>
            <b-dropdown-item v-on:click="signout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <nuxt-link to="/" v-if="!user"
          ><b-button size="sm" class="my-2 my-sm-0"
            >Log In/Sign Up</b-button
          ></nuxt-link
        >
      </b-navbar>
      <h2 align="center">List Of User</h2>
      <table style="width:100%">
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Role</th>
        </tr>

        <tr v-for="(user, index) in items" :key="index">
          <td>{{ user.Name }}</td>
          <td>
            {{ user.Status }}
            <b-dropdown id="dropdown-1" class="m-md-2">
              <b-dropdown-item @click="statusChange('Disable',user.Email,index)" v-if="user.Status == 'Active'">Disable</b-dropdown-item>
              <b-dropdown-item @click="statusChange('Active',user.Email,index)" v-if="user.Status == 'Disable'">Enable</b-dropdown-item>
            </b-dropdown>
          </td>
          <td>{{ user.Role }}</td>
        </tr>
      </table>

      <h2 align="center">List Of Ebooks and PDF</h2>
      <table style="width:100%">
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Price</th>
          <th>Ratings</th>
        </tr>

        <tr v-for="(user, index) in books" :key="index">
          <td>{{ user.Title }}</td>
          <td>{{ user.Author }}</td>
          <td>Php {{ user.Price }}</td>
          <td>{{ user.Ratings }}</td>
        </tr>
      </table>

      <h2 align="center">Best Selling Ebooks and PDF</h2>
      <table style="width:100%">
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Price</th>
        </tr>

        <tr v-for="(user, index) in best" :key="index">
          <td>{{ user.Title }}</td>
          <td>{{ user.Author }}</td>
          <td>Php {{ user.Price }}</td>
        </tr>
      </table>

      <b-container fluid class="page-footer">
        <b-row>
           <b-col class="text-center"><h4>The Book Haven</h4>
        <p>Hello, we at The Book Haven offers you new and exicting e-books and pdf for just the right price. Shop and read with us day and night to feel that experience within our books. We hope you have a great experience here at The Book Haven. Thank you!</p>
        </b-col>
        <b-col class="text-center"><h4>#TeamKetchup</h4>
        <p>#TeamKetchup is a 5 man team of inspiring and passionate developers. We at The Book Haven would like to thank them for helping us build this wonderful website with full of dedication and passion. THANK YOU KETCHUP!</p>
        </b-col>
        </b-row>
      </b-container>
    </client-only>
  </article>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export default {
  components: {},

  mounted() {
    firebase
      .firestore()
      .collection("User")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((docs) => {
          this.items = [...this.items, docs.data()];
        });
      }),
      firebase
        .firestore()
        .collection("items")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((docs) => {
            this.books = [...this.books, docs.data()];
          });
        }),
      firebase
        .firestore()
        .collection("items")
        .where("Ratings", "==", 5)
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((docs) => {
            this.best = [...this.best, docs.data()];
          });
        }),
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.user = user.email;
        }
      });
  },

  methods: {
    linkGen(pageNum) {
      return pageNum === 1 ? "?" : `?page=${pageNum}`;
    },
    signout() {
      firebase
        .auth()
        .signOut()
        .then((user) => {
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
      let temp = "";
      let arrayTemp = [];
      console.log(`You've searched for: ${val}`);
      val = val.toLowerCase();
      for (let i = 0; i < arr.length; i++) {
        temp = arr[i].Title;
        arrayTitle.push(temp);
        arrayTemp.push(temp);
      }
      console.log("Result:");
      arrayTemp = arrayTemp.map((arrayTemp) => arrayTemp.toLowerCase());
      for (let i = 0; i < arrayTemp.length; i++) {
        if (arrayTemp[i].includes(val)) {
          result = arrayTitle[i];
          console.log(result);
        }
      }
      if (result == "") {
        console.log("No Result Found");
      }
    },
    statusChange(status, email,index){
        var id=""

        firebase.firestore().collection('User').where("Email","==",email).get().then(snapshot => {
            snapshot.docs.forEach(docs => {
                id = docs.id
                this.items[index].Status = status
                firebase.firestore().collection("User").doc(id).update({
        Status: status
      }).then(function() {
      console.log("Document successfully updated!");
      })
      .catch(function(error) {
          console.error("Error updating document: ", error);
      });
            })
        }).catch(function(error) {
        console.log("Error getting documents: ", error);
    });
      
    }
  },
  data() {
    return {
      value: "",
      user: "",
      findText: "",

      items: [],
      books: [],
      best: [],
    };
  },
};
</script>

<style>
table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #ddd;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #ddd;
}

th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #52796f;
  color: white;
}
</style>
