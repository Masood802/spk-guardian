<template>
    <div class="main">
        <div class="header">
            <img src="../assets/schoolpk-logo.png" alt="Show Image">
            <h1>Gaurdian App</h1>
        </div>
        <div class="inputs" v-if="loginstore.logedIn === false">
            <form @submit.prevent="loginstore.login">
                <div class="code">
                    <code-tags />
                    <input type="text" placeholder="School Code" v-model="loginstore.user.schoolCode">
                </div>
                <div class="email">
                    <email />
                    <input type="email" placeholder="Email" v-model="loginstore.user.email">
                </div>
                <div class="password">
                    <lock />
                    <input :type="loginstore.passwrdType" placeholder="Password" v-model="loginstore.user.password">
                    <div id="show" v-if="loginstore.passwrdType === 'password'" @click="TogglePassword"><eye-off /></div>
                    <div id="show" v-else @click="TogglePassword">
                        <eye />
                    </div>
                </div>

                <div class="btn-login">
                    <button type="submit">LOGIN</button>
                </div>
                <div class="btn-new">
                    <button @click="$router.push('/Register')">CREATE A NEW ACCOUNT</button>
                    <button @click="$router.push('/forgot')">FORGOT PASSWORD</button>

                </div>
            </form>

        </div>
    </div>
    <!--------------------------------Showing header after login success---------------->
    <div v-if="!loginstore.isloading">
        <div class="loginpage" v-if="loginstore.logedIn">
            <div class="pagetop">
                <p class="title">{{ loginstore.user.user.name }}</p>
                <p class="sub-title">{{ loginstore.user.user.person.phone }}</p>
                <img :src="loginstore.user.user.photo" alt="myimage">
            </div>
            <!-----------------------------------------Student Details-------------------------->
            <div class="studentdata" v-if="loginstore.students.length">

                <div class="student" v-for="student in loginstore.students" :key="student.id">

                    <router-link :to="{ name: 'StudentDetail', params: { id: student.id } }">
                        <div>
                            <img :src="student.photo" alt="myimage">
                        </div>
                        <div class="data">
                            <p>{{ student.name }}</p>
                            <p>{{ student.clas.class }} {{ student.clas.session }}</p>
                            <p>Roll# {{ student.roll_num }}</p>
                            <p class="enrolled">{{ student.status }}</p>
                        </div>
                    </router-link>
                </div>
                <div class="logout" @click="logout"><button> LOGOUT</button></div>
            </div>
        </div>

    </div>
    <div v-else>
        <div class="card">
            <img src="../assets/schoolpk-logo.png" alt="Show Image">
            <h2>Data is Loading.........</h2>

        </div>
    </div>
</template>

<script setup>
import CodeTags from '../assets/icons/CodeTags.vue'
import Email from '../assets/icons/Email.vue'
import Lock from '../assets/icons/Lock.vue'
import EyeOff from '../assets/icons/EyeOff.vue'
import { useloginStore } from '@/store/store'
import Eye from '../assets/icons/Eye.vue'
import { useRouter } from 'vue-router'

let loginstore = useloginStore()
let router = useRouter()

function logout() {
    loginstore.logedIn = false;
    localStorage.clear();
}

function getDetails() {
    router.push('/studentDetail/id')
}

function TogglePassword() {
    if (loginstore.passwrdType === 'password')
        loginstore.passwrdType = 'text'
    else if (loginstore.passwrdType === 'text')
        loginstore.passwrdType = 'password'
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

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

.code,
.email {
    width: 50%;
    margin: 0 auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 18px;
    border-bottom: 2px solid gray
}

.password {
    width: 50%;
    margin: 0 25%;
    display: flex;
    align-items: center;
    border-bottom: 2px solid gray
}

.password input {
    flex-grow: 1;
}

.pass {
    display: flex;
    align-items: center;
}

input[type="text"],
input[type="email"],
input[type="Password"] {
    border: none;
    padding: 10px 0;
    font-size: 18px;
    width: 300px;
    margin: 0 5px;
    outline: none;

}

.code:focus-within {
    border-bottom: 2px solid green;
}

.email:focus-within {
    border-bottom: 2px solid green;
}

.password:focus-within {
    border-bottom: 2px solid green;
}

.btn-login {
    width: 50%;
    margin: auto;
}

.btn-login button {
    border: none;
    background-color: mediumseagreen;
    width: 100%;
    margin-top: 15px;
    padding: 10px 12px;
    border-radius: 5px;
    color: white;
    font-size: 18px;
    ;
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

.pagetop {
    width: 80%;
    margin: 0 auto;
    background-color: dodgerblue;
    height: 250px;
    ;
}

.pagetop img {
    width: 150px;
    height: 150px;
    border-radius: 100%;
    margin: 50px auto;
    border: 5px solid white;
    outline: 5px solid dodgerblue;
}

.title {
    padding-top: 50px;
    color: white;
    font-size: 25px;
    font-weight: bold;
    line-height: 0;
    margin: 20px;
}

.sub-title {
    font-size: 18px;

    color: white;
    margin: 20px;
}

.student {
    width: 80%;
    margin: 50px auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid rgb(221, 214, 214);
}

.data {
    margin-top: 75px;
    margin-left: 15px;
}

.data p {
    font-size: 18px;

}

.student img {
    width: 150px;
    margin-top: 100px;
}

.enrolled {
    background-color: lime;
    border-radius: 5px;
    height: 30px;
    text-align: center;
    padding: 5px;
}

.logout button {
    width: 300px;
    padding: 10px 30px;
    border-radius: 5px;
    background-color: dodgerblue;
    border: none;
    color: white;
    font-weight: bold;
}

.studentdata {
    cursor: pointer;
}

.studentdata a {
    text-decoration: none;
    display: flex;
    justify-content: baseline;
    align-items: center;
    color: rgb(37, 36, 36)
}

.studentdata a:hover {
    opacity: 95%;
}
</style>
