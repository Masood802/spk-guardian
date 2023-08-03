<template>
  <div class="loginpage">
    <div class="pagetop">
      <p class="title">{{ loginstore?.user?.name }}</p>
      <p class="sub-title">{{ loginstore?.user?.person?.phone }}</p>
      <div><img :src="loginstore?.user?.photo" alt="My Image"></div>
    </div>
  </div>
  <div class="studentdata">
    <div  class="student" v-for="student in loginstore.students"
    @click="router.push('student-detail/' + student.id)">
<!--   <router-link :to="{ name: 'StudentDetail', params: { id: student.id } }">-->
        <div>
          <img :src="student.photo" alt="myimage">
        </div>
        <div class="data">
          <p>{{ student?.name }}</p>
          <p>{{ student?.clas?.class }} {{ student?.clas?.session }}</p>
          <p>Roll# {{ student?.roll_num }}</p>
          <p class="enrolled">{{ student.status }}</p>
        </div>
<!--  </router-link>-->
    </div>
  </div>
  <button class="logout" @click="logout">LOGOUT</button>
</template>

<script setup>
import {useRoute, useRouter} from 'vue-router'
import {useloginStore} from '@/store/store'

let loginstore = useloginStore()
let router = useRouter()
let route = useRoute()

function logout() {
  loginstore.logedIn = false;
  localStorage.clear();
  router.push('/')
}

</script>


<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.pagetop {
  width: 80%;
  margin: 0 auto;
  background-color: dodgerblue;
  height: 250px;;
}

.pagetop img {
  width: 150px;
  height: 150px;
  border-radius: 100%;
  margin-top: 40px;
  border: 5px solid white;
  outline: 5px solid dodgerblue;
}

.title {
  padding: 20px;
  color: white;
  font-size: 25px;
  font-weight: bold;

}

.sub-title {
  font-size: 18px;
  color: white;

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
  margin: 100px auto;
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
  margin: 10px auto;

}

.enrolled {
  background-color: lime;
  border-radius: 5px;
  height: 30px;
  text-align: center;
  padding: 5px;
}

.student img {
  width: 150px;
  margin-top: 100px;
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

.logout{
  width: 300px;
  padding: 10px 30px;
  border-radius: 5px;
  background-color: dodgerblue;
  border: none;
  color: white;
  font-weight: bold;
}
</style>
