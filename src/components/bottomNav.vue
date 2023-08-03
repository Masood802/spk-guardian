<template>
  <div>
    <div class="footer">
      <router-link class="footertabs" :to="{name:'StudentDetail',params:{id:route.params.id}}">
        <AccountCircle/>
        <h3>Basic Info</h3>
      </router-link>
      <router-link class="footertabs" :to="{name:'Attendence',params:{id:route.params.id}}">
        <Calendar/>
        <h3>Attencdence</h3>
      </router-link>
      <router-link class="footertabs" :to="{name:'exams',params:{id:route.params.id}}">
        <Note/>
        <h3>Exams</h3>
      </router-link>
      <router-link class="footertabs" :to="{name:'fees',params:{id:route.params.id}}">
        <Cash/>
        <h3>Fees</h3>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import AccountCircle from '@/assets/icons/AccountCircle.vue'
import Calendar from '@/assets/icons/Calendar.vue'
import Note from '@/assets/icons/Note.vue'
import Cash from '@/assets/icons/Cash.vue'
import {useRoute} from 'vue-router'

let route = useRoute()

</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.footer {
  border-top: 1px solid rgb(226, 226, 226);
  width: 80%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;


}

.footertabs {
  margin-top: 10px;

  cursor: pointer;
}

.footer a {
  text-decoration: none;
  color: rgb(53, 52, 52)
}

.footertabs h3 {
  font-size: 15px;
  font-weight: bold;
}

a.router-link-exact-active {
  color: dodgerblue
}
</style>
