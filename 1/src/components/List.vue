<template>
  <div class="mlt">
    <h2>Todo List</h2>
    <div class="listContainer">
      <div class="addContainer">
        <AddListItem v-model="newItemText" @keydown.enter="addItem" @click="addItem" />
      </div>
      <ol v-if="todos.length">
        <list-item
          v-bind:key="item.id"
          v-for="item in todos"
          :todo="item"
          v-bind:onEdit="item.onEdit"
          :users="users"
          @deleteListItem="deleteListItem($event)"
          @todoChanged="editListItem(item.id, $event)"
        ></list-item>
        <section>
        <input type="radio" v-bind:value="0" v-model="selectedRadioButton">resolve actions only in Frontend
        <br/>
        <input type="radio" v-bind:value="1" v-model="selectedRadioButton">resolve actions in backend
        </section>
      </ol>
      <p v-else>Nothing left in the list. Add a new todo in the input aside.</p>

    </div>
  </div>
</template>

<script>
import ListItem from "./ListItem.vue";
import AddListItem from "./AddListItem.vue";
import gql from 'graphql-tag'
const uuidv4 = require('uuid/v4');

export default {
  name: "list",
  components: {
    ListItem,
    AddListItem
  },
  data() {
    return {
      newItemText: "",
      todos: [],
      users: [],
      selectedRadioButton: 1
    };
  },
  methods: {
    addItem() {
      const trimmedText = this.newItemText.trim();
      //TODO pass id from server
      if (trimmedText) {
      if (this.selectedRadioButton === 1){
        this.addTodo(trimmedText)
      } else {
          this.todos.push({
          id: uuidv4(),
          message: trimmedText
        });
        this.newItemText = "";
      }
      }
    },
    editListItem(id, todo) {
      this.todos.forEach(element => {
        if (element.id === id) {
          element = todo;
        }

        if (this.selectedRadioButton === 1){
        this.updateTodo(todo.id, todo.message, todo.assignedTo);
      }
      });
    },
    deleteListItem(id) {
      this.todos = this.todos.filter(element => element.id != id);
         if (this.selectedRadioButton === 1){
        this.removeTodo(id);
      }
    },


  async addTodo(message) {
    await this.$apollo.mutate({
      // Query
      mutation: gql`mutation ($message: String!) {
        addTodo( message: $message) {
          id
          message
          assignedTo
          status
        }
      }`,
      // Parameters
      variables: {
         message: message, 
      },
    }).then((data) => {
                    this.todos.push(data.data.addTodo)
                }).catch((error) => {
                    return error;
                })
    
  }, 
  
  async updateTodo(id, message, assignedTo) {
    await this.$apollo.mutate({
      // Query
      mutation: gql`mutation ($id: String!, $message: String, $assignedTo: Int) {
        updateTodo(id: $id, message: $message, assignedTo: $assignedTo) {
          id
          message
          assignedTo
          status
        }
      }`,
      // Parameters
      variables: {
         id: id, 
         message: message, 
         assignedTo: assignedTo, 
      },
    })
  }, 
  
  async removeTodo(id) {
    await this.$apollo.mutate({
      mutation: gql`mutation ($id: String!) {
        removeTodo(id: $id) {
          id
        }
      }`,
      // Parameters
      variables: {
         id: id
      },
    })
  },
  },

  apollo: {
    todos: gql`query {
      todos{
        id,
        message,
       assignedTo, 
       status
      }
    }`,  

    users: gql`query {
      users{
        id,
        email,
        loggedIn
      }
    }`,
  }
};
</script>



<style scoped>
.listContainer {
  flex-direction: column;
  display: flex;
}


.mlt {
  margin: 5% 0 0 10%;
}

.addContainer {
  display: flex;
  align-items: flex-end;
  /* margin-left: 10%; */
  /* background-color: aqua; */
  flex: 3;
}

ol {
  flex: 2;
  display: flex;
  flex-direction: column;
  width: 50%
}
</style>
