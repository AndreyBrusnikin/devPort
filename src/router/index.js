import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import TodoList from "@/views/TodoList";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: LoginView
  },
  {
    path: '/toDo',
    name: 'todo',
    component: TodoList
  },
]

const router = new VueRouter({
  routes
})

export default router
