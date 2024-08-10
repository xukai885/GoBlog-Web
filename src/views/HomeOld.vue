<template>
    <h2> Home about</h2>
    <button @click="login">登陆</button>
</template>

<script>
export default{
    data(){
        return{
            ok:"1",
        }
    },
    created(){
        this.$store.commit("init")
        if (localStorage.getItem("loginResult")) {
            this.ok=false
      }
    },
    methods:{
        login(){
            this.$router.push({name:"base"})
        }
    }
}






</script>