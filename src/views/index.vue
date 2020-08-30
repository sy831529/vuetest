<template>
    <!--    <el-container/> ：用于构建页面框架-->
    <el-container style="height: 100%; border: 1px solid #eee">

        <!-- <el-aside/> :左侧菜单框架  -->
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">

            <!--  <el-menu/> :左侧菜单内容  -->
            <!--  :default-openeds="['1', '3']"属性，用于指定默认展开那些菜单，通过index值指定,需要int类型参数 -->
            <!--  <:default-active=""属性，用于指定默认选中那些选项，也是通过index值指定,需要String类型参数  -->
            <!--  与上面的区别是，默认展开只代表展开那些菜单，但不会默认勾选中其中的某些选项  -->
            <!--        <el-menu :default-openeds="['1']" :default-active="'1-1'">-->

            <!--          &lt;!&ndash;  <el-submenu />:可展开菜单， 相当于<el-menu/>子标签 &ndash;&gt;-->
            <!--          &lt;!&ndash;  index="" 菜单的下标  &ndash;&gt;-->
            <!--          <el-submenu index="1">-->
            <!--            <template slot="title"><i class="el-icon-message"></i>导航一</template>-->

            <!--              <el-menu-item index="1-1">选项1</el-menu-item>-->
            <!--              <el-menu-item index="1-2">选项2</el-menu-item>-->
            <!--              <el-menu-item index="1-3">选项3</el-menu-item>-->

            <!--            <el-submenu index="1-4">-->
            <!--              <template slot="title">选项4</template>-->
            <!--              <el-menu-item index="1-4-1">选项4-1</el-menu-item>-->
            <!--            </el-submenu>-->
            <!--          </el-submenu>-->
            <!--        </el-menu>-->

            <el-menu router :default-active=$route.path>
                <el-submenu v-for="(item,index) in $router.options.routes" :index="index+''">
                    <template v-if="item.name!=null" slot="title"><i class="el-icon-setting"></i>{{item.name}}</template>
                    <el-menu-item v-for="(item2) in item.children" v-if="item2.name!=null" :index="item2.path">
                        {{item2.name}}
                    </el-menu-item>
                </el-submenu>
            </el-menu>

        </el-aside>
        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <el-dropdown>
                    <i class="el-icon-setting" style="margin-right: 15px"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>查看</el-dropdown-item>
                        <el-dropdown-item>新增</el-dropdown-item>
                        <el-dropdown-item>删除</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span>王小虎</span>
            </el-header>

            <el-main >
                <!--  此处显示对应的子路由页面  -->
                <router-view ></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped>

</style>