<template>
  <div class="loginpage" v-if="loginstore.logedIn">
            <div class="pagetop">
                <p class="title">{{ loginstore.person.name }}</p>
                <p class="sub-title">{{ loginstore.person.phone }}</p>
                <div><img src="../assets/default_user.png" alt="My Image"></div>
            </div>
        </div> 
        <div v-else>
          Invalid Credentials
          <button @click="$router.push('/')">Back to Login</button>
        </div>       
        
</template>

<script setup>
import {useloginStore} from '@/store/store'

let loginstore = useloginStore()
</script>

<style scoped>
.pagetop{
    width:80%;
 margin:0 auto;
    background-color: dodgerblue;
    height: 250px;;
}
.pagetop img{
    width:150px;
    height: 150px;
    border-radius: 100%;
    margin-top:50px;
    border:5px solid white;
    outline: 5px solid dodgerblue;
}
.title{
    padding-top:50px; 
    color:white;
    font-size:25px;
    font-weight: bold;
    line-height: 0;
}
.sub-title{
font-size: 18px;
line-height: 0;
color:white;
}

</style>
