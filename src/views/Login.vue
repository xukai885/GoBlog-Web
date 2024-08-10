<template>
  <div class="login-container">
    <el-card class="login-card">
      <h3 class="login-title">用户登录</h3>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-width="80px" class="login-form">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
  <script>
  import axios from 'axios';
  import {ElMessage} from 'element-plus'
  
  export default{
    // name:"Login",
    data(){
      return{
        loginForm: {
        username: "",
        password: "",
        },
        loginRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        // submitted:false
      },
    };
    },
    methods:{
      submitForm(){
        axios({
          method:'post',
          url:"/login",
          data:({
            username: this.loginForm.username,
            password:this.loginForm.password,
          })
        }).then((res)=>{
          if (res.code==1000){ // 登陆成功
            localStorage.setItem("loginResult",JSON.stringify(res.data)); 
            this.$store.commit("login",res.data)
            this.$router.push({path:this.redirect||'/info'}) //登陆成功跳转页面
            ElMessage('登陆成功')
            
          }else{
            console.log(res.msg)
            ElMessage(res.msg)
          }
        }).catch((error)=>{
          console.log(error)
          ElMessage(res.msg)
        })
  
      }
    }
  }
  
  
  </script>

<style>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-card {
  width: 400px;
}

.login-title {
  text-align: center;
  margin-bottom: 20px;
}

.login-form {
  margin-top: 20px;
}
</style>
  
  
  