<template>
<h3>Please enter your login details</h3>
  <div class="inputContainer" style="display:right">
      <form action="#" @submit.prevent="">
        <input type="email" placeholder="example@email.de" v-model="form.email" />
        <input type="password" placeholder="******" v-model="form.password" />
        <button type="submit">sign in</button>
    </form>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
    name: 'login',
  props: {
  },
  methods: {
      login(){

      }
  },
  data() {
      return{
          form:{
              email:'',
            password:''}
      }
  },

  apollo: {
    // Vue-Apollo options here
    users: gql`query {
      user{
        email,
        password
      }
    }`,
  }
};
</script>