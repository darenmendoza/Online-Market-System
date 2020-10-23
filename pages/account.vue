<template>
    <div>
        <form @submit.prevent="signout">
        <button>Log out!</button>
        </form>
    </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
export default {
    methods:{
        signout(){
            firebase.auth().signOut().then(user =>{
                    console.log(user);
                    this.$router.push("/");
                }).catch(function(error) {
                    console.log(error);
                });
        }
    }
}
</script>

<style scoped>

</style>