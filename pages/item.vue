<template>
    <b-card :title="books.Title" :img-src="books.Image" img-alt="Image" img-top>
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
</template>

<script>

export default {

    props:['books'],

    data() {
      return{
      
      value:""
    }
    
  }
}
    
</script>

<style>

</style>