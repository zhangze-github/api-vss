import Vue from 'vue'
import VueRouter from 'vue-router'
import WebsiteList from '../views/WebsiteList/Index'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Website',
        component: WebsiteList
    },
    {
        path: '/websitedetail',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/WebsiteDetail/Index')
    }
]

const router = new VueRouter({
    routes
})

export default router
