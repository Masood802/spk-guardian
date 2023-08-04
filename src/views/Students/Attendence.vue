<template>
  <div>
    <StudentHeader/>
    <h1>{{ formatedDate(_date) }}</h1>
  </div>
  <h1 v-if="loginstore?.summary===null">No data for this Month</h1>
  <div v-if="!loginstore.isloading">
    <VueDatePicker
        class="date"
        v-model="_date"
        month-picker
        position="center"
        format="MMM-yyyy"
        :min="student?.clas?.start_date"
        :max="student?.clas?.end_date"
        model-type="yyyy-MM-01"
    />
  </div>
  <div :class="loginstore.isloading ? 'blur' : 'summery'" v-if="!loginstore.isloading">
    <div>
      <h4 class="P">Presence</h4>
      <span
      >{{ attendence?.summary?.P }}-</span>
      <span v-if="attendence?.summary?.P!=0">{{
          (attendence?.summary?.P / attendence?.summary?.total) * 100
        }}%</span>
    </div>
    <div>
      <h4 class="A">Absence</h4>
      <span>{{ attendence?.summary?.A }}-</span>
      <span v-if="attendence?.summary?.A!=0">
        {{ (attendence?.summary?.A / attendence?.summary?.total) * 100 }} %</span>
    </div>
    <div>
      <h4 class="L">Leaves</h4>
      <span>{{ attendence?.summary?.L }}-</span>
      <span v-if="attendence?.summary?.L!=0">{{
          (attendence?.summary?.L / attendence?.summary?.total) * 100
        }} %</span>
    </div>
  </div>
  <div class="loading" v-if="loginstore.isloading">
    <h2>Data is Loading.........</h2>
    <div class="box">
      <div class="rectangle"></div>
      <div class="rectangle"></div>
      <div class="rectangle"></div>
    </div>
    <div class="info">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
    <div class="circlebox">
      <div v-for="day in days">
        <span>{{}}</span>
      </div>
    </div>
  </div>

  <div class="calender" v-if="!loginstore.isloading">
    <div
        v-for="(day, index) in days"
        :class="{
        success: getStatus(day) == 'P',
        danger: getStatus(day) == 'A',
        warning: getStatus(day) == 'L',
      }"
    >
      <span>{{ index < 9 ? 0 : '' }}{{ index + 1 }}</span>
    </div>
  </div>

  <bottomNav v-if="!loginstore.isloading"/>
</template>

<script setup>
import axios from "axios";
import {useloginStore} from "@/store/store";
import moment from "moment";
import bottomNav from "@/components/bottomNav.vue";
import {ref, watch, computed, onBeforeMount} from 'vue'
import {useRoute, useRouter} from 'vue-router'

let loginstore = useloginStore()
let student = ref({})
let days = ref({})
let attendence = ref('')
let _date = ref('')
let myDate = ref('')
let route = useRoute()
let n = ref([30])

let EndDate = computed(() => {
  return moment(_date.value).add(1, 'months').format('YYYY-MM-DD')
})
onBeforeMount(() => {
  student.value = loginstore.students.find(
      (s) => (s.id = route.params.id))
  _date.value = moment
      .min(moment(), moment(student?.value?.clas?.end_date))
      .startOf("month")
      .format("YYYY-MM-DD");
  buildDays();
  getAttendece();
})

function formatedDate() {
  return moment(_date.value).format('MMMM-YYYY')
}

async function getAttendece() {
  loginstore.isloading = true;
  console.log(_date.value)
  console.log(EndDate.value)
  const resp = await axios.get(`students/attendance/${student?.value?.id}`, {
    params: {
      start_date: _date.value,
      end_date: EndDate.value
    },
  });
  loginstore.isloading = false;
  attendence.value = resp.data;

}

function buildDays() {
  days = [];
  let daysInMonth = moment(_date.value).daysInMonth();
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(moment(_date.value).set("date", i).format("YYYY-MM-DD"));
  }
}

function getStatus(day) {
  if (!attendence?.value?.records || !attendence?.value?.records[day])
    return "";
  return attendence?.value?.records[day]?.status;
}

function convertDate() {
  let newDate = new Date(_date.value);
  myDate.value = newDate;
}

watch(_date, (date) => {

  convertDate();
  if (date) {
    buildDays();
    getAttendece();
  }
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.date {
  width: 80%;
  margin: 10px auto;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  border: none;
}

h1 {
  margin-top: 50px;
}

.card {
  width: 80%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 30px auto;
  background-color: aliceblue;
  border-radius: 10px;
}

img {
  width: 30%;
}

.summery {
  width: 80%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 60px auto;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  height: 120px;
  border-radius: 5px;
}

.blur {
  filter: blur(8px);
  width: 80%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 60px auto;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  height: 120px;
  border-radius: 5px;
}

.P {
  background-color: rgb(4, 94, 4);
  padding: 12px 16px;
  color: white;
  margin: 12px;
}

.A {
  background-color: rgb(248, 5, 5);
  padding: 12px 16px;
  color: white;
  margin: 12px;
}

.L {
  background-color: rgb(228, 213, 8);
  padding: 12px 16px;
  color: white;
  margin: 12px;
}

span {
  font-weight: bold;

  padding-bottom: 10px;
}

.calender {
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 30px auto 120px auto;
}

.calender div {
  background-color: rgb(237, 238, 241);
  border-radius: 50%;
  width: 3.5em;
  height: 3.5em;
  text-align: center;
  padding: 1.2em 1em;
  margin: .5em .8em;
  font-weight: bold;
}

.danger {
  background-color: red !important;
  color: #fff;
}

.success {
  background-color: green !important;
  color: #fff;
}

.warning {
  background-color: yellow !important;
  color: #fff;
}

.loading {
  width: 80%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 60px auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 120px;
  border-radius: 5px;
}

.box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rectangle {
  width: 50px;
  height: 20px;
  padding: 20px 50px;
  background-color: #ece8e8;
  margin: 20px 30px 0 30px;

}

.info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.line {
  background-color: #ece8e8;
  width: 10px;
  hight: 5px;
  padding: 5px 10px;
  margin: 10px 70px 50px 70px;
}

.circlebox {
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 30px auto 120px auto;
}

.circlebox div {
  width: 3.5em;
  height: 3.5em;
  border-radius: 100%;
  background-color: #e5e1e1;
  margin: 10px;
}

</style>
