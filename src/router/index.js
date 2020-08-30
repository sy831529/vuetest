import Vue from 'vue'
import VueRouter from 'vue-router'
import Bookmanage from "../views/Bookmanage";
import AddBook from "../views/AddBook";
import BookUpdate from "../views/BookUpdate";
import index from "../views/index";


Vue.use(VueRouter)

  const routes = [
    {

      /*  此处路由路径 path: '/' 表示该路由为App路由的子路由，也表示页面请求 http://localhost:8080 时会响应index.vue页面，
      *   而请求 http://localhost:8080 时也会响应App.vue页面，相当于同时显示了index.vue和App.vue两个页面，
      *   这时在App.vue的视图层配置<router-view></router-view>标签后，则指定他的子路由的页面该显示在这里，也就是index.vue
      */
      path: '/',
      name: '图书管理',
      component: index,
      //  redirect:"/PageOne" 表示进入index.vue同时会重定向到/PageOne路由，显示出子路由页面
      redirect:"/Bookmanage",
      //  此处设置子路由则表示子路由页面会显示在index.vue的  <router-view></router-view>
      children:[
        {
          path: '/Bookmanage',
          name:'查询图书',
          component: Bookmanage
        },
        {
          path: '/AddBook',
          name:'添加图书',
          component: AddBook
        },
        {
          path: '/BookUpdate',
          component: BookUpdate
        }
      ]
    },
    // {
    //   path: '/navigation',
    //   name:'导航2',
    //   component: index,
    //   children: [
    //     {
    //       path: '/PageThree',
    //       name:'页面3',
    //       component: PageThree
    //     },
    //     {
    //       path: '/PageFour',
    //       name:'页面4',
    //       component: PageFour
    //     },
    //   ]
    // },
  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
