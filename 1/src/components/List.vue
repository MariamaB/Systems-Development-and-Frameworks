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
          @todoChanged="updateTodo(item.id, $event)"
          @assign="assignTodo(item.id, $event)"
        ></list-item>
      </ol>
      <p v-else>Nothing left in the list. Add a new todo in the input aside.</p>
    </div>
  </div>
</template>

<script>
import ListItem from "./ListItem.vue";
import AddListItem from "./AddListItem.vue";
import gql from "graphql-tag";

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
          this.addTodo(trimmedText);
      }
    },
    deleteListItem(id) {
        this.removeTodo(id);
    },

    async addTodo(message) {
      await this.$apollo
        .mutate({
          // Query
          mutation: gql`
            mutation($message: String!) {
              addTodo(message: $message) {
                id
                message
                status
                assignedTo{
                  id
                  email
                }
              }
            }
          `,
          variables: {
            message: message
          }
        });
    },

    async assignTodo(id, todo) {
      await this.$apollo.mutate({
        // Query
        mutation: gql`
          mutation($id: ID!, $assignedTo: ID) {
            assignTodo(id: $id, assignedTo: $assignedTo) {
              id
              message
              assignedTo{
                email
              }
              status
            }
          }
        `,
        variables: {
          id: id,
          assignedTo: todo.assignedTo.id
        }
      });
    },
      async updateTodo(id, todo) {
      await this.$apollo.mutate({
        // Query
        mutation: gql`
          mutation($id: ID!, $message: String) {
            updateTodo(id: $id, message: $message) {
              id
              message
              assignedTo{
                email
              }
              status
            }
          }
        `,
        variables: {
          id: id,
          message: todo.message,
        }
      });
    },

    async removeTodo(id) {
      await this.$apollo.mutate({
        mutation: gql`
          mutation($id: ID!) {
            removeTodo(id: $id) {
              id
            }
          }
        `,
        variables: {
          id: id
        }
      });
    }
  },

  apollo: {
    todos: gql`
      query {
        todos {
          id
          message
          status
          assignedTo{
            id
            email
          }
        }
      }
    `,

    users: gql`
      query {
        users {
          id
          email
        }
      }
    `
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
  width: 50%;
}
</style>
