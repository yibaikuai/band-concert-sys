<template>
  <div>
    <vue-particles
      color="#409EFF"
      :particle-opacity="0.7"
      :particles-number="60"
      shape-type="circle"
      :particle-size="6"
      lines-color="#409EFF"
      :lines-width="1"
      :line-linked="true"
      :line-opacity="0.4"
      :lines-distance="150"
      :move-speed="4"
      :hover-effect="true"
      hover-mode="grab"
      :click-effect="true"
      click-mode="push"
    />
    <img
      src="@/assets/image/other/bg1.jpg"
      class="bg"
      alt="bg"
    >
    <div
      id="container"
      class="container1"
    >
      <div class="form-container sign-up-container">
        <el-form
          ref="create"
          class="login-form"
          label-width="80px"
          :model="user"
          :rules="regRules"
          hide-required-asterisk
          @keyup.enter="createUser"
        >
          <h1>注册</h1>
          <el-form-item
            label="用户名"
            style="align-items: center"
            prop="username"
            required
          >
            <el-input
              v-model="user.username"
              placeholder="新用户的登录名"
            />
          </el-form-item>
          <el-form-item
            label="密码"
            style="align-items: center"
            prop="password"
            required
          >
            <el-input
              v-model="user.password"
              type="password"
              placeholder="至少 ≥ 6 位"
            />
          </el-form-item>
          <el-form-item
            label="性别"
            style="align-items: center;width: 240px"
            prop="sex"
            required
          >
            <el-select
              v-model="user.sex"
            >
              <el-option
                v-for="item in sexList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="年龄"
            style="align-items: center;width: 240px"
            prop="age"
            required
          >
            <el-input
              v-model="user.age"
              type="number"
              placeholder="请输入年龄"
              min="12"
              max="99"
            />
          </el-form-item>
          <el-form-item
            label="职业(可选)"
            style="align-items: center"
            prop="career"
          >
            <el-input
              v-model="user.career"
              placeholder="请输入职业"
            />
          </el-form-item>
          <el-button
            :disabled="!canReg"
            @click="createUser"
          >
            创建
          </el-button>
        </el-form>
      </div>
      <div class="form-container sign-in-container">
        <el-form
          ref="login"
          :rules="loginRules"
          hide-required-asterisk
          :model="user"
          class="login-table"
          @keyup.enter="gologin"
        >
          <h1 id="login-title">
            请登录
          </h1>
          <el-form-item
            label="用户名"
            prop="username"
            style="align-items: center"
          >
            <el-input
              v-model="user.username"
              autofocus
              placeholder="请输入用户名"
            />
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
            style="align-items: center; padding-left: 11.5px"
          >
            <el-input
              v-model="user.password"
              type="password"
              placeholder="请输入密码"
            />
          </el-form-item>
          <el-button
            :disabled="!canSubmit"
            @click="gologin"
          >
            登录
          </el-button>
        </el-form>
      </div>

      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>已有账号？去登录</h1>

            <button
              class="ghost"
              @click="goSignIn"
            >
              去登录
            </button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>没注册？去注册</h1>

            <button
              class="ghost"
              @click="goSignUp"
            >
              去注册
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { create, login, reset } from "@/api/login";

import bg from "@/assets/image/other/bg1.jpg";
import {userStore} from "@/store/user";
import {buildRoute} from "@/router/permission";
const store = userStore()
export default {
  name: "Login",
  data() {
    return {
      bg: bg,
      user: {
        username: "",
        password: "",
        sex:'',
        age:'',
        career:''
      },
      sexList:[
        {
          value: "男",
          label: "男"
        },
        {
          value: "女",
          label: "女"
        }
      ],
      loginRules: {
        username: [{ required: true, message: "用户名必填", trigger: "blur" }],
        password: [
          { required: true, message: "密码必填", trigger: "blur" },
          { min: 6, message: "密码至少为6位", trigger: "blur" },
        ],
      },
      regRules:{
        username: [{ required: true, message: "用户名必填", trigger: "blur" }],
        password: [
          { required: true, message: "密码必填", trigger: "blur" },
          { min: 6, message: "密码至少为6位", trigger: "blur" },
        ],
        sex:[{ required: true, message: "性别必填", trigger: "blur" }],
        age:[{ required: true, message: "年龄必填", trigger: "blur" }],
      },
      passWordRules: /^\S{6,}$/,
      emailRules: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
    };
  },
  computed: {
    canSubmit() {
      const { username, password } = this.user;
      return Boolean(username && password);
    },
    canReg() {
      const { username, password} = this.user;
      return Boolean(username && password);
    },
  },
  mounted() {
    document.body.style.overflowX = "hidden";
  },
  methods: {
    gologin() {
      let roleInfo = {};
      login(this.user)
        .then(({ data }) => {
          if (data.code === 1) {
            this.$message.error(data.msg);
          } else {
            const { accessToken } = data.data;
            const { role } = data.data;
            const {bandName} = data.data
            localStorage.setItem("token", accessToken);
            this.$router.push("/bandlist");
            this.$message.success("登录成功！");
            if (role === 'admin') {
              roleInfo = { name: '管理员', role: 'admin' }
            } else if(role === 'singer'){
              roleInfo = { name: '歌手', role: 'singer' ,bandName:bandName}
            }else {
              roleInfo = { name: '粉丝', role: 'fan' }
            }
            console.log(roleInfo)
            store.$patch({ userInfo:roleInfo })
            let allRoutes  = buildRoute(roleInfo.role)
            // 保存当前用户所有可以访问的路由到vuex中
            store.$patch({routes: allRoutes})
            // 动态添加路由配置
          }
        })
        // .catch((err) => {
        //   this.$message.error(err.response.data.message);
        // });
    },
    createUser() {
      if (!this.passWordRules.test(this.user.password)) {
        this.$message.error("格式错了哦,密码至少6位");
      } else {
        console.log(this.user)
        create(this.user).then((res) => {
          if (res.data.code === 1) {
            this.$message.error(res.data.msg);
            this.user = { username: "", password: "" };
          } else {
            this.goSignIn();
            this.$message.success("创建成功");
            this.user = { username: "", password: "" };
          }
        });
      }
    },
    goSignUp() {
      let container = document.getElementById("container");
      container.classList.add("right-panel-active");
    },
    goSignIn() {
      let container = document.getElementById("container");
      container.classList.remove("right-panel-active");
    },
  },
};
</script>

<style scoped>
body {
  overflow-x: hidden;
}
#particles-js {
  width: 100%;
  height: calc(100% - 100px);
  position: absolute;
  top: 0;
  left: 0;
}
.bg {
  z-index: -1;
  height: 100%;
  background-size: 100%;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  background-size: cover;
}
.container1 {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: absolute;
  overflow: hidden;
  width: 50vw;
  height: 40vh;
  max-width: 100%;
  min-width: 500px;
  min-height: 480px;
  left: 0;
  right: 0;

  top: 21vh;
  margin: auto;
  opacity: 0.7;
}
.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}
.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}
.container1.right-panel-active .sign-in-container {
  transform: translateX(100%);
}
.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}
.container1.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.41s;
}
.login-table {
  transition: all 0.7s;
}
.forget-table {
  transition: all 0.7s;
  opacity: 0;
}
.active-login {
  opacity: 0;
  z-index: -1;
}
.active-forget {
  transform: translateY(-100%);
  opacity: 1;
}
@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container1.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background: skyblue;
  background: -webkit-linear-gradient(to right, skyblue, #ff416c);
  background: linear-gradient(to right, skyblue, skyblue);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container1.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.container1.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}
.container1.right-panel-active .overlay-right {
  transform: translateX(20%);
}

* {
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}
.el-button {
  transition: all 0.4s;
}
button {
  border-radius: 20px;
  border: 1px solid skyblue;
  background-color: skyblue;
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin: 0 auto;
  transition: transform 80ms ease-in;
}

button:active {
  transform: scale(0.95);
}
button:focus {
  outline: none;
}
button.ghost {
  background-color: skyblue;
  border-color: #ffffff;
  cursor: pointer;
  transition: all 0.4s;
}
.ghost:hover {
  color: skyblue;
  background-color: white;
}

form {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

input {
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  background: rgb(209, 207, 208);
}
.forget-psw {
  color: skyblue;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.5s;
}
.forget-psw:hover {
  color: rgb(255, 145, 0);
}
.el-button {
  font-size: 16px;
}
</style>
