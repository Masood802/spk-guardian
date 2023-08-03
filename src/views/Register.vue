<template>
  <div class="main">
    <div class="header">
      <img src="../assets/schoolpk-logo.png" alt="Show Image">
      <h1>Gaurdian App</h1>
    </div>
    <div class="inputs">
      <form @submit="loginstore.register">
        <div class="code">
          <code-tags/>
          <input type="text" placeholder="School Code" v-model="loginstore.form.schoolCode">
        </div>
        <div class="email">
          <email/>
          <input type="email" placeholder="Email" v-model="loginstore.form.email">
        </div>
        <div class="password">
          <lock/>
          <input :type="loginstore.passwrdType" placeholder="Password" v-model="loginstore.form.password">
          <div id="show" v-if="loginstore.passwrdType === 'password'" @click="TogglePassword">
            <eye-off/>
          </div>
          <div id="show" v-else @click="TogglePassword">
            <eye/>
          </div>
        </div>
        <div class="password">
          <lock/>
          <input :type="loginstore.passwrdType" placeholder="Confirm Password" v-model="loginstore.form.password">
          <div id="show" v-if="loginstore.passwrdType === 'password'" @click="TogglePassword">
            <eye-off/>
          </div>
          <div id="show" v-else @click="TogglePassword">
            <eye/>
          </div>
        </div>
        <div class="btn-new">
          <button @click="$router.push('/submit')">REGISTER</button>
          <button @click="$router.push('/')">BACK TO LOGIN</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import CodeTags from '../assets/icons/CodeTags.vue'
import Email from '../assets/icons/Email.vue'
import Lock from '../assets/icons/Lock.vue'
import EyeOff from '../assets/icons/EyeOff.vue'
import {useloginStore} from '@/store/store';

let loginstore = useloginStore()

function TogglePassword() {
  console.log('Hellow')
  if (loginstore.passwrdType === 'password')
    loginstore.passwrdType = 'text'
  else if (loginstore.passwrdType === 'text')
    loginstore.passwrdType = 'password'
}
</script>

<style scoped>
.main {
  width: 80%;
  height: 100%;

  margin: auto;
}

.header {
  width: 80%;
  color: red;
  margin: auto;
  height: 100%;
}

h1 {
  font-size: 3rem;
}

img {
  width: 30%;
}

.code, .email, .password {
  width: 50%;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 18px;
  border-bottom: 2px solid gray
}

input[type="text"], input[type="email"], input[type="Password"] {
  border: none;
  padding: 10px 0;
  font-size: 18px;
  width: 300px;
  margin: 0 5px;
  outline: none;

}

input[type="password"] {
  flex-grow: 1;
}

input[type="text"] {
  flex-grow: 1;
}

.code:focus-within {
  border-bottom: 2px solid green;
}

.email:focus-within {
  border-bottom: 2px solid green;
}

.btn-login {
  width: 50%;
  margin: auto;
}

.btn-login button {
  border: none;
  background-color: dodgerblue;
  width: 100%;
  margin-top: 15px;
  padding: 10px 12px;
  border-radius: 5px;
  color: white;
  font-size: 18px;;
}

.btn-new {
  width: 50%;
  display: flex;
  flex-direction: column;
  margin: 20px auto;
}

.btn-new button {
  padding: 8px 12px;
  margin: 5px auto;
  width: 100%;
  font-weight: bold;
  border-radius: 5px;
  border: none;
  background-color: rgb(235, 225, 225);
  box-shadow: 2px 1px 4px rgb(235, 225, 225);
}
</style>
