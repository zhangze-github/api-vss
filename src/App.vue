<template>
    <div id="app">
        <!--    <div id="nav">-->
        <!--      <router-link to="/">Home</router-link>-->
        <!--      |-->
        <!--      <router-link to="/about">About</router-link>-->
        <!--    </div>-->
        <div class="content">
            <router-view/>
        </div>
    </div>
</template>

<style lang="less" scoped>
.content {
    max-width: 1200px;
    margin: 0 auto;
    border: 1px solid black;
    padding: 20px;
}
</style>
