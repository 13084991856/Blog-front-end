<template>
  <div class="wrapper wow slideInLeft">
    <div class="content">
      <el-form
        ref="form"
        label-width="80px"
        :inline="false"
        size="normal"
        :model="changeform"
        :rules="changerules"
      >
        <el-form-item label="原密码" prop="oldPass">
          <el-input
            v-model="changeform.oldPass"
            type="password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPass">
          <el-input
            v-model="changeform.newPass"
            type="password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="newPass2">
          <el-input
            v-model="changeform.newPass2"
            type="password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确认修改</el-button>
          <el-button @click="exit">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import WOW from "wowjs";
import Cookie from "js-cookie";
export default {
  data() {
    // 确认密码的规则
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.changeform.oldPass === value) {
          callback(new Error("新密码与原密码相同"));
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.changeform.newPass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      changeform: {
        oldPass: "",
        newPass: "",
        newPass2: "",
      },

      changerules: {
        oldPass: [
          { required: true, message: "请输入您的原密码", trigger: "blur" },
        ],
        newPass: [{ validator: validatePass, trigger: "blur" }],
        newPass2: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    exit() {
      this.$router.push({ path: "/" });
      location.reload();
    },
    // 更新用户信息
    async onSubmit() {
      //表单预验证
      this.$refs.form.validate((valid) => {
        if (!valid) return;
        let data = {
          oldPass: this.changeform.oldPass,
          newPass: this.changeform.newPass,
        };
        this.$http.post("/api/users/change", data).then((res) => {
          if (res.data.code == -1) {
            this.$message({
              message: "原始密码错误",
              type: "error",
            });
          } else {
            this.$message({
              message: "修改成功",
              type: "success",
            });
            // 清除Cookie
            Cookie.set("token", "");
            // 清除sessionStorage
            sessionStorage.clear();
            this.$router.push({ path: "/" });
            location.reload();
          }
        });
      });
    },
  },
  created() {},
  mounted() {
    let wow = new WOW.WOW({
      boxClass: "wow",
      animateClass: "animated",
      offset: 0,
      mobile: true,
      live: false,
    });
    wow.init();
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 30%;
  margin: 5% auto;
  color: #fff !important;
}

/deep/.el-form-item__label {
  font-size: 14px;
  color: #fff !important;
}
// 头像
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/deep/.avatar-uploader-icon:hover {
  border-color: #ffffff !important;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>