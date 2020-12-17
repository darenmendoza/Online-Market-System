<template>
  <server-only>
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

    <b-container fluid>
      <b-row>
        <b-col>
          <h1 class="text-center">Users Role</h1>
          <b-table small :fields="fields" :items="items" responsive="sm">
            <!-- A virtual column -->
            <template #cell(index)="data">
              {{ data.index + 1 }}
            </template>

            <!-- A custom formatted column -->
            <template #cell(name)="data">
              <b class="text-info">{{ data.value.last.toUpperCase() }}</b>, <b>{{ data.value.first }}</b>
            </template>
              
            <template #cell(show_details)="row">
              <b-button size="sm" class="mr-2"> Details </b-button>
            </template>

          </b-table>
        </b-col>
        <b-col>
          <h1 class="text-center">Most Viewed Ebook</h1>
          <b-table small :fields="fields" :items="items" responsive="sm">
            <!-- A virtual column -->
            <template #cell(index)="data">
              {{ data.index + 1 }}
            </template>

            <!-- A custom formatted column -->
            <template #cell(name)="data">
              <b class="text-info">{{ data.value.last.toUpperCase() }}</b>, <b>{{ data.value.first }}</b>
            </template>
            <template>
              <b-dropdown id="dropdown-1" text="Dropdown Button" class="m-md-2">
                <b-dropdown-item>Active</b-dropdown-item>
                <b-dropdown-item>Disabled</b-dropdown-item>
              </b-dropdown>
            </template>

          </b-table>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <h1 class="text-center">Most Sold Ebook</h1>
          <b-table small :fields="fields" :items="items" responsive="sm">
            <!-- A virtual column -->
            <template #cell(index)="data">
              {{ data.index + 1 }}
            </template>

            <!-- A custom formatted column -->
            <template #cell(name)="data">
              <b class="text-info">{{ data.value.last.toUpperCase() }}</b>, <b>{{ data.value.first }}</b>
            </template>
            <template #cell(actions)="row">
              <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
                Enable
              </b-button>
              <b-button size="sm" @click="row.toggleDetails">
                {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
              </b-button>
            </template>

          </b-table>
        </b-col>
        <b-col>
          <h1>ADMIN FUNC (Future Ops...)</h1>
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
  </server-only>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
export default {
  methods: {
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

  data() {
      return {
        fields: [
          // A virtual column that doesn't exist in items
          'index',
          // A column that needs custom formatting
          { key: 'name', label: 'Full Name' },
          // A regular column
          'status',
          // A regular column
          'role',
        ],
        items: [
          { name: { first: 'John', last: 'Doe' }, role: 'Client', status: 'Live' },
          { name: { first: 'Jane', last: 'Doe' }, role: 'Author', status: 'Disable' },
          { name: { first: 'Rubin', last: 'Kincade' }, role: 'Client', status: 'Live' },
          { name: { first: 'Shirley', last: 'Partridge' }, role: 'Author', status: 'Live' }
        ]
      }
    }
};
</script>

<style scoped></style>
