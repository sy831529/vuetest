<template>
    <div>
        <table>
            <tr>
                <td>编号</td>
                <td>图书名称</td>
                <td>编号</td>
            </tr>
            <tr v-for="(book,index) in books" :book="book" :key="index">
                <td>{{book.id}}</td>
                <td>{{book.name}}</td>
                <td>{{book.author}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: "Book",
        data(){
            return{
                msg:'vue book',
                books:[]
            }
        },
        created() {
            const _this=this
            axios.get('http://localhost:8181/Book/findAll')
                .then(function (resp){
                    _this.books=resp.data;
                    console.log(resp);
            })
        },
    }
</script>

<style scoped>

</style>