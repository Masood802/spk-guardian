<template>
  <StudentHeader/>
  <div v-if="!loginstore.isloading">
    <h3>Test Result of {{ date }}
      <VueDatePicker
          class="date"
          v-model="date"
          month-picker
          position="center"
          format="MMM-yyyy"
          :min="student?.clas?.start_date"
          :max="student?.clas?.end_date"
          model-type="yyyy-MM-dd"
          value="date"
      />
    </h3>
    <div class="examReport">
      <div>

        <h1 v-if="report?.summary?.score">
          <StarCircle/>
          Overall Position : {{ report?.summary?.position }}
        </h1>
        <h1 v-else> No Test Record for The Month</h1>
      </div>
      <div class="result">
        <div>Total</div>
        <div>Obtained</div>
        <div>Percentage</div>
      </div>
      <div class="result" v-if="report?.summary?.score">
        <div>{{ report?.summary?.total }}</div>
        <div>{{ report?.summary?.score }}</div>
        <div>{{ report?.summary?.score / report?.summary?.total * 100 }}%</div>
      </div>
      <div class="result" v-else>
        <div>-</div>
        <div>-</div>
        <div>-</div>

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
      <img src="../../assets/schoolpk-logo.png" alt="Show Image"/>
      <h2>Loading...</h2>
    </div>
  </div>
  <bottomNav/>
</template>

<script setup>
import moment from "moment";
import axios from "axios";
import bottomNav from "@/components/bottomNav.vue";
import {useloginStore} from "@/store/store";
import StarCircle from "@/assets/icons/StarCircle.vue";
import {computed, onBeforeMount, ref, watch} from "vue";
import {useRoute} from "vue-router";
import VueDatePicker from "@vuepic/vue-datepicker";

let loginstore = useloginStore();
let student = ref({});
let date = ref(null);
let report = ref({});
let route = useRoute();

onBeforeMount(() => {
  student.value = loginstore.students.find((s) => (s.id = route.params.id));
  date.value = moment
      .min(moment(), moment(student.value.clas.end_date))
      .startOf("month")
      .format("YYYY-MM-DD");
  loadExamReport();

})

async function loadExamReport() {
  loginstore.isloading = true;
  const res = await axios.post(`student-report`, {
    class_id: student?.value.class_id,
    start_date: date.value,
    end_date: moment().clone(date.value).endOf('month').format('YYYY-MM-DD'),
    layout: "Portrait",
    individualReport: true,
    roll_num: student.value?.roll_num,
  });
  loginstore.isloading = false;
  report = res.data;
  console.log(report);
  console.log(report?.summary?.position);
}

watch(date, (date) => {
  if (date) {
    loadExamReport();
  }
})
</script>

<style scoped>
* {
  box-sizing: border-box;
}

h3 {
  margin: 60px auto;
  width: 80%;
}

.examReport {
  width: 80%;
  margin: 40px auto 15px auto;
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
