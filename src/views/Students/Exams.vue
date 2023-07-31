<template>
  <StudentHeader />
  <div v-if="!loginstore.isloading">
    <div class="examReport">
      <div>
        <StarCircle />
        <h1>Overall Position : {{ report?.summary?.position }}</h1>
      </div>
      <h3>Test Result of {{ date }}</h3>
      <div class="result">
        <div>Total</div>
        <div>Obtained</div>
        <div>Percentage</div>
      </div>
      <div class="result">
        <div>{{ report?.summary?.total }}</div>
        <div>{{ report?.summary?.score }}</div>
        <div>69%</div>
      </div>
    </div>
    <table>
      <tr>
        <th>#</th>
        <th>Date</th>
        <th>Subject</th>
        <th>Total</th>
        <th>Obtained</th>
      </tr>

      <tr v-for="(test, index) in report.tests">
        <td>{{ index + 1 }}</td>
        <td>{{ test.date }}</td>
        <td>{{ test.title }}</td>
        <td>{{ test.max_marks }}</td>
        <td>{{ test.obtained }}</td>
      </tr>
    </table>
  </div>
  <div v-else>
    <div class="card">
      <img src="../../assets/schoolpk-logo.png" alt="Show Image" />
      <h2>Loading...</h2>
    </div>
  </div>
  <bottomNav />
</template>

<script setup>
import moment from "moment";
import axios from "axios";
import bottomNav from "@/components/bottomNav.vue";
import { useloginStore } from "@/store/store";
import StarCircle from "@/assets/icons/StarCircle.vue";
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";

let loginstore = useloginStore();
let student = ref({});
let date = ref(null);
let report = ref({});
let route = useRoute();

onBeforeMount(() => {
  student.value = loginstore.students.find((s) => (s.id = route.params.id));
  date = moment
    .min(moment(), moment(student.value.clas.end_date))
    .startOf("month")
    .format("YYYY-MM-DD");
  loadExamReport();
  convertdate();
})
function convertdate(){
    date = moment(date).format('MMM-YYYY')
}
async function loadExamReport() {
  loginstore.isloading = true;
  const res = await axios.post(`student-report`, {
    class_id: student?.value.class_id,
    start_date: date,
    end_date: student?.value.clas?.end_date,
    layout: "Portrait",
    individualReport: true,
    roll_num: student.value?.roll_num,
  });
  loginstore.isloading = false;
  report = res.data;
  console.log(report);
  console.log(report?.summary?.position);
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.examReport {
  width: 80%;
  margin: 75px auto 15px auto;
  background-color: dodgerblue;
  padding: 10px;
  border-radius: 10px;
  color: white;
}

h1 {
  margin: 0 5px;
}

.examReport div {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 5px;
}

.result {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: auto;
}

.result div {
  margin: 10px auto;
  font-weight: bold;
}

table {
  width: 80%;
  margin: 0 auto 150px auto;
  border-spacing: 0;
}

tr,
td,
th {
  padding: 10px;
  margin: 0;
}

tr:nth-child(odd) {
  background-color: rgb(241, 234, 234);
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
</style>
