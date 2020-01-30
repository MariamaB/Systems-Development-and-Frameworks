  <template>
  <li>
    <div class="itemContainer">
      <div class="messageSection" style="display:inline-block;">
        <template v-if="onEdit">
          <input v-model="newTodo.message" />
          <select v-if="isAdmin" 
          v-model="newTodo.assignedTo">
            <option>assign to ...</option>
            <option
              v-for="(user, index) in users"
              :key="index"
              :value="user"
              :selected="user.id === newTodo.assignedTo.id"
            >{{ user.email }}</option>
          </select>
        </template>
        <template v-else>
          <span style="font-weight: bold;">{{todo.message}}</span>
          - assigned to  : {{assignedToUser}}
        </template>
      </div>

      <div class="mb5 space">
        <span class="buttonContainer" v-if="!onEdit">
          <a @click="setEditMode(true)">
            <img title="Edit" class="icon" src="../assets/edit_circ.png" />
          </a>
          <span class="space" />
          <a @click="deleteListItem(todo.id)">
            <img title="Delete" class="icon" src="../assets/delete_circ.png" />
          </a>
        </span>
        <span class="buttonContainer" v-if="onEdit">
          <a @click="saveChanges()">
            <img title="Save" class="icon" src="../assets/save_circ.png" />
          </a>
          <span class="space" />
          <a @click="setEditMode(false)">
            <img title="Cancel" class="icon" src="../assets/cancel_circ.png" />
          </a>
        </span>
      </div>
      <div>
        <a v-if="todo.status">
          <img title="Done" class="icon" src="../assets/done.png" />
        </a>
        <a v-else @click="setTodoDone">
          <img title="Done_Pending" class="icon" src="../assets/done_pending.png" />
        </a>
      </div>
    </div>
  </li>
</template>

  <script>
import { clone } from "lodash";
import gql from "graphql-tag";

export default {
  name: "list-item",
  props: {
    users: {
      type: Array,
      required: true
    },
    todo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isAdmin: (localStorage.getItem('role') === 'admin')? true : false,
      onEdit: false,
      newTodo: {
        message: "",
        assignedTo: null,
        status: false
      }
    };
  },
  methods: {
    setEditMode(value) {
      if (value) this.newTodo = clone(this.todo);
      this.newTodo.assignedTo = !this.newTodo.assignedTo? {id: 0, email: '', role: ''} : this.newTodo.assignedTo;
      this.onEdit = value;
    },
    saveChanges() {
      
      console.log("HAAALLO")
      this.setEditMode(false);
      if(this.todo.message !== this.newTodo.message){
        this.$emit("todoChanged", this.newTodo);
      }
      
      if (this.newTodo.assignedTo.id != 0 && this.todo.assignedTo != this.newTodo.assignedTo){
        this.$emit("assign", this.newTodo);
        }
    },
    changeMessage(event) {
      this.newMsg = event.target.value;
    },
    deleteListItem(id) {
      this.$emit("deleteListItem", id);
    },
    async setTodoDone() {
      console.log(this.todo.id)
      const { data } = await this.$apollo.mutate({
          mutation: gql`
            mutation($id: ID!, $status: Boolean!) {
              changeTodoStatus(id: $id, status: $status) {
                status
              }
            }
          `,
          variables: {
            id: this.todo.id,
            status: true
          }
        }); 
        const {changeTodoStatus} = data;
        console.log("changeTodoStatus",changeTodoStatus)
        this.todo.status = (changeTodoStatus) ?  changeTodoStatus.status : this.todo.status;
    }
  },
  computed: {
    assignedToUser() {
      let user
      if(this.todo.assignedTo){
        user = this.users.find(u => u.id === this.todo.assignedTo.id);
      }
      return user === undefined ? "none" : user.email;
    },
  }
};
</script>

  <style>
.itemContainer {
  border-bottom-style: inset;
  margin-bottom: 20px;
  border-bottom-color: #42b983;
  display: flex;
}

.buttonContainer {
  display: flex;
  cursor: pointer;
}

.mb5 {
  margin-bottom: 5px;
}

.messageSection {
  display: flex;
  align-self: center;
  justify-self: center;
  margin-left: 15px;
  flex: 2;
}

.icon {
  width: 30px;
  height: 30px;
}

.space {
  margin-right: 20px;
}

a {
  display: flex;
  align-content: center;
}

input {
  color: #42b983;
}
</style>