<template>
  <div>
    <StudentHeader />
    <h1>{{ mydate }}</h1>
  </div>
  <div v-if="!loginstore.isloading">
    <VueDatePicker
      class="date"
      v-model="date"
      month-picker
      position="center"
      format="MM-yyyy"
      :min="student?.clas?.start_date"
      :max="student?.clas?.end_date"
      @update:model-value="getAttendece"
      model-type="yyyy-MM-01"
    />
  </div>
  <div class="summery" v-if="!loginstore.isloading">
    <div>
      <h4 class="P">Presence</h4>
      <span
        >{{ attendence?.summary?.P }}--{{
          (attendence?.summary?.P / attendence?.summary?.total) * 100
        }}%</span
      >
    </div>
    <div>
      <h4 class="A">Absence</h4>
      <span
        >{{ attendence?.summary?.A }}--{{
          (attendence?.summary?.A / attendence?.summary?.total) * 100
        }}%</span
      >
    </div>
    <div>
      <h4 class="L">Leaves</h4>
      <span
        >{{ attendence?.summary?.L }} --{{
          (attendence?.summary?.L / attendence?.summary?.total) * 100
        }}%</span
      >
    </div>
  </div>
  <div v-else>
    <div class="card">
      <img src="../../assets/schoolpk-logo.png" alt="Show Image" />
      <h2>Data is Loading.........</h2>
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
      <span>{{ index + 1 }}</span>
    </div>
  </div>

  <bottomNav />
</template>

<script>
import axios from "axios";
import { useloginStore } from "@/store/store";
import moment from "moment";
import bottomNav from "@/components/bottomNav.vue";
export default {
  components: {
    bottomNav,
  },
  data() {
    return {
      loginstore: useloginStore(),
      student: {},
      days: [],
      attendence: "",
      date: "",
      options: { year: "numeric", month: "long" },
      mydate: "",
    };
  },
  computed: {
    EndDate() {
      return moment(this.date).add(1, "months").format("YYYY-MM-DD");
    },
  },
  created() {
    this.student = this.loginstore.students.find(
      (s) => (s.id = this.$route.params.id)
    );
    this.date = moment
      .min(moment(), moment(this.student.clas.end_date))
      .startOf("month")
      .format("YYYY-MM-DD");
    this.buildDays();
    this.getAttendece();
  },
  methods: {
    async getAttendece() {
      this.loginstore.isloading = true;
      const resp = await axios.get(`students/attendance/${this.student.id}`, {
        params: {
          start_date: this.date,
          end_date: this.EndDate,
        },
      });
      this.loginstore.isloading = false;

      this.attendence = resp.data;
    },
    buildDays() {
      this.days = [];
      let daysInMonth = moment(this.date).daysInMonth();
      for (let i = 1; i <= daysInMonth; i++) {
        this.days.push(moment(this.date).set("date", i).format("YYYY-MM-DD"));
      }
    },
    getStatus(day) {
      if (!this.attendence?.records || !this.attendence?.records[day])
        return "";
      return this.attendence?.records[day]?.status;
    },
    convertDate() {
      let newDate = new Date(this.date);
      this.myDate = newDate;
      console.log(newDate);
      console.log(this.mydate);
    },
  },
  watch: {
    date(date) {
      this.convertDate();
      if (date) {
        this.buildDays();
        this.getAttendece();
      }
    },
  },
};
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
  margin: 20px auto;
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
  margin: 0 auto;
}

.calender div {
  background-color: rgb(247, 249, 252);
  border-radius: 50%;
  width: 50x;
  height: 50px;
  text-align: center;
  padding: 14px 16px;
  margin: 10px 18px;
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
</style>
