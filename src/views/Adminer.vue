<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
  >
    <el-menu-item index="0">
      <img
          style="width: 100px"
          src="/dist/Title.ico"
          alt="Element logo"
      />
    </el-menu-item>
    <el-sub-menu index="1">
      <template #title>新增资源</template>
      <el-menu-item index="1-1" @click="dialogVisible = true">新增博客</el-menu-item>
      <el-menu-item index="1-2" @click="dialogVisibleShare = true">新增分享</el-menu-item>
      <el-menu-item index="1-3">新增一言</el-menu-item>
      <el-menu-item index="1-4" @click="dialogVisibleImage = true">新增图片</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="2">退出登录</el-menu-item>
  </el-menu>

<!--  // 根据选择做出不同响应-->
  <div>
<!--    <el-button type="primary" @click="dialogVisible = true">新增资源</el-button>-->
<!--    新增博客文章-->
    <el-dialog v-model="dialogVisible"
      title="新增资源"
      width="50%"
      @close="handleClose"
  >
      <el-form :model="form">
        <el-form-item label="创建时间">
        <el-date-picker
          v-model="form.createtime"
          type="date"
          placeholder="选择日期"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
      /></el-form-item>

        <el-form-item label="选择文件">
          <el-upload :multiple="false"
                     :file-list="this.fileList"
                     :auto-upload= false
                     :limit="1"
                     :on-change="beforeUpload">
            <el-button type="primary">点击选择</el-button>
          </el-upload>
        </el-form-item>


        <el-form-item label="文章简介">
          <el-input
            type="textarea"
            v-model="form.introduction"
            placeholder="请输入简介"
          ></el-input>
        </el-form-item>

        <el-form-item label="分类选择">
          <el-select v-model="form.type" placeholder="请选择分类">
            <el-option
              v-for="category in categories"
              :key="category.id"
              :label="category.typename"
              :value="category.id"
      ></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </div>
    </el-dialog>
<!--    新增分享文章-->
    <el-dialog v-model="dialogVisibleShare"
               title="新增分享"
               width="50%"
               @close="handleClose"
    >
      <el-form :model="formShare">
        <el-form-item label="分享的标题">
          <el-input
              type="textarea"
              v-model="formShare.title"
              placeholder="请输入标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="分享的链接">
          <el-input
              type="textarea"
              v-model="formShare.url"
              placeholder="请输入链接"
          ></el-input>
        </el-form-item>
      </el-form>


      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleShare = false">取消</el-button>
        <el-button type="primary" @click="handleSubmitShare">确定</el-button>
      </div>
    </el-dialog>
<!--    新增图片-->
    <el-dialog v-model="dialogVisibleImage"
               title="新增图片"
               width="50%"
               @close="handleClose"
    >
      <el-form-item label="选择图片">
        <el-upload :multiple="false"
                   :file-list="this.imagefileList"
                   :auto-upload= false
                   :limit="1"
                   :on-change="beforeImageUpload">
          <el-button type="primary">点击选择</el-button>
        </el-upload>
      </el-form-item>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleImage = false">取消</el-button>
        <el-button type="primary" @click="handleSubmitImage">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";
import axios from "axios";
import {handleError} from "vue";
import {ElMessageBox} from "element-plus"


export default {
  name: "Adminer",
  data(){
    return {
      activeIndex: '1',
      form: {
        createtime: '',
        introduction: '',
        type: '',
        file: null,
      },
      imagefile: {
        image: null,
      },
      formShare:{
        title:'',
        url:''
      },
      dialogVisible: false,
      dialogVisibleShare: false,
      dialogVisibleImage: false,
      fileList: [],
      imagefileList: [],
      categories: [],
    }
  },
  methods: {
    beforeUpload(file,fileList){
      this.fileList = fileList
      ElMessage("添加成功")
      this.form.file=this.fileList[0].raw
    },
    beforeImageUpload(file,imagefileList){
      this.imagefileList = imagefileList
      ElMessage("添加成功")
      this.imagefile.image=this.imagefileList[0].raw
    },
    getType(){
      axios({
        method:'get',
        url:'/gettype',
      }).then((res)=>{
        console.log(res.data)
        if(res.code==1000){
          this.categories=res.data
        }
      })},
    handleSubmitShare(){
      axios({
        method:'post',
        url:'/share',
        data:({
          title: this.formShare.title,
          url:this.formShare.url,
        }),
      }).then((res)=>{
        if(res.code==1000){
          ElMessage("添加成功")
          this.handleClose()
        }else {
          ElMessage("添加失败")
          this.handleClose()
        }
      })
    },
    handleSubmitImage(){
      axios({
        method: "POST",
        url:"/upload",
        data:({
          image: this.imagefile.image,
        }),
        headers:{
          "Content-Type":"multipart/form-data",
        }
      }).then((res)=>{
        if (res.code == 1000){
          ElMessageBox({
            title: '提示',
            message: `
        <div>
          <p><strong>上传成功</strong></p>
          <p><strong><span id="uploaded-url">${res.data}</span></strong></p>
        </div>`,
            dangerouslyUseHTMLString: true,
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '复制 URL',
          }).then(() => {
            // 确定按钮点击后的逻辑
          }).catch(() => {
            // 使用 catch 来处理取消按钮的点击事件（这里我们用来复制 URL）
            const urlText = document.getElementById('uploaded-url').innerText;
            navigator.clipboard.writeText(urlText).then(() => {
              ElMessage({
                type: 'success',
                message: 'URL 已复制到剪贴板！'
              });
            }).catch(err => {
              ElMessage({
                type: 'error',
                message: '复制失败，请手动复制！'
              });
            });
          });
        }else {
          ElMessage("上传异常")
        }
      })
    },
    handleSubmit() {
      axios({
        method:'post',
        url:'/addboke',
        data : this.form,
        headers:{
          "Content-Type":"multipart/form-data",
        }
      }).then((res)=>{
        // console.log(res)
        if(res.code==1000){
          ElMessage("添加成功")
          this.handleClose()
        }else {
          ElMessage("添加失败")
          this.handleClose()
        }
      })
    },
    handleClose() {
      this.dialogVisible=false
      this.dialogVisibleShare=false
      this.dialogVisibleImage=false
      // 在这里处理关闭弹窗的逻辑
    },
    handleSelect(key){
        console.log(key)
        if (key == '2'){
          // 退出登录
          localStorage.removeItem("loginResult");

          this.$router.push({path:this.redirect||'/login'}) //登陆成功跳转页面

          ElMessage("退出登录")
        }else if (key == '1-1'){
          this.getType()
        }else if (key=='1-2'){
          // ElMessage("新增分享")
        }else if (key=='1-3'){
          // ElMessage("新增一言")
        }
    },
  }

}

</script>

<style scoped>
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}


</style>
