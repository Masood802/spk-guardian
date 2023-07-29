<template>
    <div class="main">
        <div class="header">
            <img src="../assets/schoolpk-logo.png" alt="Show Image">
            <h1>Gaurdian App</h1>
        </div>
        <div class="email">
            <Email />
            <input type="email" placeholder="Email" v-model="loginstore.user.email">
        </div>
        <div class="logout" @click="forgot"><button>SUBMIT</button></div>
        <div class="logout" @click="$router.push('/')"><button>BACK To LOGIN</button></div>
    </div>
</template>

<script>
import axios from 'axios'
import Email from '../assets/icons/Email.vue'
import { useloginStore } from '@/store/store'
export default {
    components: {
        Email
    },
    data() {
        return {
            loginstore: useloginStore()
        }
    },
    methods: {
        async forgot() {
            const res = await axios.post('/forgot-password', {
                email: this.loginstore.user.email
            })
            if (res.status == 200) {
                alert('Your Password has been sent to your Registerd Email Address')
                this.$router.push('/')
            }
        }
    }
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

input[type="email"] {
    border: none;
    padding: 10px 0;
    font-size: 18px;
    width: 300px;
    margin: 0 5px;
    outline: none;

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

.email {
    width: 50%;
    margin: 20px auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 18px;
    border-bottom: 2px solid gray
}

.logout button {
    width: 330px;
    padding: 10px 30px;
    border-radius: 5px;
    background-color: dodgerblue;
    border: none;
    color: white;
    font-weight: bold;
    margin: 10px auto;
}</style>