<template>
  <Card :bordered="false" :padding="0" class="body">
    <div class="middle">
      <div class="form">
        <Form ref="formValidate" :model="formValidate" :rules="ruleInline">
          <FormItem prop="username">
            <Input
              type="text"
              v-model="formValidate.username"
              placeholder="请输入用户名"
            >
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input
              type="password"
              password
              v-model="formValidate.password"
              placeholder="请输入密码"
            >
            </Input>
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              @click="handleSubmit('formValidate')"
              shape="circle"
              >登录</Button
            >
            <Button
              @click="handleReset('formValidate')"
              style="margin-left: 8px"
              shape="circle"
              >重置</Button
            >
          </FormItem>
          <p>首次使用？</p>
          <router-link to="/register">点我注册</router-link>
        </Form>
      </div>
    </div>
  </Card>
</template>
<script>
import { apiLogin } from "@/request/api/user.js";
export default {
  data() {
    return {
      formValidate: {
        password: "",

        username: "",
      },
      ruleInline: {
        username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.toLogin();
        } else {
          this.$Message.error("用户名与密码不能为空！");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    toLogin() {
      var data = new URLSearchParams();
      data.append("password", this.formValidate.password);
      data.append("username", this.formValidate.username);
      var me = this;
      apiLogin(data)
        .then(function (response) {
          if (response.data.code !== 200) {
            console.log("登录失败:" + response.data.message);
            if (response.data.data == "无用户") {
              me.$Message.error("该用户不存在");
            } else {
              me.$Message.error("密码错误");
            }
          } else {
            me.$Message.success("登录成功");
            window.sessionStorage.setItem("token", response.data.data.token);
            window.sessionStorage.setItem("username", me.formValidate.username);
            window.sessionStorage.setItem("userID", response.data.data.userID);
            me.$router.push("/homepage");
            window.location.reload();
          }
        })
        .catch((error) => {
          console.log("请求失败", error.message);
        });
    },
  },
  created() {
    if (this.$store.state.newUsername && this.$store.state.newPassword) {
      this.formValidate.username = this.$store.state.newUsername;
      this.formValidate.password = this.$store.state.newPassword;
    }
  },
};
</script>
<style scoped>
.body {
  background-image: url("~@/images/风景.png");
  background-repeat: no-repeat;
  background-size: 100%;
  /* height: calc(100%-100px); */
  height: calc(100vh - 129px);
  margin: auto;
  /* padding-top: 50px; */
}
.middle {
  background: rgba(255, 255, 255, 0.2);
  height: calc(100vh - 129px);
}
Form {
  padding-top: 170px;

  width: 300px;
  text-align: center;
  margin: auto;
}
.form {
  height: calc(100vh - 200px);
  width: 700px;
  background-color: #515a6e;
  margin: auto;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
/* .login__input {
  color: white;
  font-size: 1.15rem;
  width: 100%;
  padding: 0.5rem 1rem;
  border: 2px solid transparent;
  outline: none;
  border-radius: 1.5rem;
  background-color: rgba(255, 255, 255, 0.25);
  letter-spacing: 1px;
}

.login__input:hover,
.login__input:focus {
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.5);
  background-color: transparent;
} */
p {
  display: inline-block;
  color: #ffffff;
}
</style>