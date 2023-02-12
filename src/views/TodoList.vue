<template>
    <div class="todo-holder">
        <Loader :loader="isLoading"></Loader>
        <div>
            <h3>User info:</h3>
            <div>Name: {{user.name}}</div>
            <div>Phone: {{user.phone}}</div>
            <div>Website: {{user.website}}</div>
            <div>Email: {{user.email}}</div>
            <div>User name: {{user.username}}</div>

        </div>
        <div v-show="!isLoading">

            <div class="todo-option-holder">
                <input class="search-input" type="text" placeholder="Search title" v-model="searchQuery">
                <div class="todo-option">
                    <div class="todo-add">
                        <div>
                          <label for="addId">Id:</label>
                          <input type="number" id="addId" v-model="addId">
                        </div>
                        <div>
                          <label for="addTitle">Tittle</label>
                          <input type="text" id="addTitle" v-model="addTitle">
                        </div>
                      <button @click="addTodo"> Add ToDos</button>

                    </div>
                    <div>
                        <div>
                          <span>Filter Status:</span>
                          <select class="select-custom" v-model="selectedStatus">
                              <option v-for="(status, index) in statusOption" v-bind:value="status" :key="'status'+index">
                                  {{ status }}
                              </option>
                          </select>
                        </div>
                        <div>
                          <span>Filter userId:</span>
                          <select class="select-custom" v-model="selectedId">
                              <option v-for="(option, index) in idOption" v-bind:value="option" :key="'option'+index">
                                  {{ option }}
                              </option>
                          </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="todo-list-holder">
                <div class="todo-list title">
                    <div class="todo-item">Id</div>
                    <div class="todo-item">User id</div>
                    <div class="todo-item flex-10">Title</div>
                    <div class="todo-item">Completed</div>
                    <div class="todo-item">Favorites</div>
                </div>
                <div class="todo-list" :key="'todo'+todo.id" v-for="todo in filterAndSearchedTodos">
                    <div class="todo-item">{{ todo.id }}</div>
                    <div class="todo-item">{{ todo.userId }}</div>
                    <div class="todo-item flex-10">{{ todo.title }}</div>
                    <div class="todo-item class=">
                        <Icon id="success" v-if="todo.completed"></Icon>
                        <Icon id="error" v-else></Icon>
                    </div>
                    <div class="todo-item">
                        <Icon class="icon-favor" :class="{active: isActive(todo.id)}" id="favor"
                              @click.native="changeFav(todo.id)"></Icon>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import axios from 'axios';
    import Icon from '@/components/Icon'
    import Loader from '@/components/Loader'

    const statusOption = {
        All: 'All',
        Completed: 'Completed',
        Uncompleted: 'Uncompleted',
        Favorites: 'Favorites',
    };

    const idOption = 'All Users';

    export default {
        name: 'ToDo',
        components: {
            Icon,
            Loader
        },
        props: {
            user: {default: Object}
        },
        data() {
            return {
                todoList: [],
                isLoading: false,
                favorite: [],
                searchQuery: '',
                selectedStatus: statusOption.All,
                statusOption,
                selectedId: idOption,
                idOption: [],
                addTitle: '',
                addId: '',
            }
        },
        methods: {
            isActive(id) {
                return this.favorite.find(r => r === id)
            },
            sort() {
                return this.todoList.sort((todo1, todo2) => todo1[this.selectedSort]?.localeCompare(todo2[this.selectedSort]))
            },
            changeFav: function (id) {
                if (this.favorite.find(r => r === id)) {
                    this.favorite.forEach((el, i) => {
                        if (el == id) {
                            this.favorite.splice(i, 1)
                            localStorage.setItem('favorite', JSON.stringify(this.favorite));
                        }
                    })
                } else {
                    this.favorite.push(id);
                    localStorage.setItem('favorite', JSON.stringify(this.favorite));
                }
            },
            addTodo() {
                let data = {
                    id: this.todoList.length + 1,
                    userId: Number(this.addId),
                    completed: false,
                    title: this.addTitle
                };

                axios.post("https://jsonplaceholder.typicode.com/todos", data)
                    .then((response) => {
                        console.log(response.data);
                        this.todoList.push(data)
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            async fetchTodos() {
                try {
                    this.isLoading = true;
                    const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
                    this.todoList = response.data
                    this.idOption.push(idOption)
                    this.idOption = this.idOption.concat(Array.from(new Set(this.todoList.map(item => item.userId))).map(item => item));
                    this.favorite = JSON.parse(localStorage.getItem('favorite') || '[]');
                } catch (e) {
                    alert(e)
                } finally {
                    this.isLoading = false;
                }

            },

        },
        async mounted() {
            await this.fetchTodos();
        },
        computed: {

            filterStatus() {
                if (this.selectedStatus === this.statusOption.Completed) {
                    return this.todoList.filter(todo => todo.completed === true)
                } else if (this.selectedStatus === this.statusOption.Uncompleted) {
                    return this.todoList.filter(todo => todo.completed === false)
                } else if (this.selectedStatus === this.statusOption.Favorites) {
                    return this.todoList.filter(todo => this.favorite.includes(todo.id));
                }
                return this.todoList
            },
            filterId() {
                if (this.selectedId === idOption) {
                    return this.filterStatus;
                }
                return this.filterStatus.filter(todo => todo.userId === this.selectedId);
            },
            filterAndSearchedTodos() {
                return this.filterId.filter(todo => todo.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
            }
        },
    }
</script>
<style lang="scss" scoped>
    input {
        border: 0;
        border-bottom: 1px solid #C4C4C4;

        &:focus {
            outline: none;
        }
    }

    .todo-list-holder {
        width: 100%;
        max-width: 100%;
        height: 100%;
        overflow: auto;
        background-color: white;
        box-shadow: 0px 0.25rem 1rem rgba(139, 77, 77, 0.25);
    }

    .todo-list {
        width: 100%;

        background-color: rgba(97, 112, 187, 0.05);
        display: flex;

        &.title {
            background-color: #f7f8fc;
            position: sticky;
            top: 0;
            z-index: 1;
        }
    }

    .todo-item {
        width: 100%;
        border-bottom: 1px solid #C4C4C4;
        flex: 1;
        min-width: 70px;
        padding: 3px 2px;

        &.flex-10 {
            flex: 10;
        }

        .icon {
            width: 30px;
            height: 30px;
            display: flex;
            margin: 0 auto;
            cursor: default;
        }

        .icon-favor {
            cursor: pointer;
            fill: transparent;
            transition: all .3s;
            stroke: #000000;

            &:hover {
                fill: #e89393;
                stroke: #9c2424;
            }

            &.active {
                fill: #9c2424;
                stroke: #9c2424;
            }
        }
    }



    .search-input {
        width: 100%;
        margin: 10px 0;

    }

    .select-custom {
        border: 0;
        border-bottom: 1px solid #C4C4C4;
    }

    .todo-option-holder {
        display: flex;
        flex-wrap: wrap;

        .select-custom {
            margin: 0 10px 10px 10px;

            &:last-child {
                margin: 0 0 10px 10px;
            }
        }
    }

    .todo-option {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
  .todo-add{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    button{
      margin-left: 10px;
    }
  }
</style>
