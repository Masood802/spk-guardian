<template>
  <StudentHeader/>
  <div v-if="!loginstore.isloading">
    <div class="feesummery" v-if="totalfeedue!=0">
      <h3>Current Amount Due</h3>
      <h2>PKR {{ totalfeedue }}</h2>
    </div>
    <div v-else class="ack">
      <h3>No Amount Due</h3>
      <h3>Thanks for Paying you dues </h3>
    </div>
    <div class="monthfee" v-for="record in vouchers.records">
      <h4>{{ formatedDate(record.voucher_date) }}</h4>
      <div class="due">
        <span class="danger" v-if="record.payment === null"
        ><Alert-Circle
        /></span>
        <span class="success" v-else><CheckCircle/></span>
        <h3>Due:PKR {{ record.total }}</h3>
      </div>

      <div class="fee" v-for="detail in record.details">
        <h4>{{ detail.fee_category.category }}</h4>
        <h4>PKR {{ detail.amount }}</h4>
      </div>

      <h2>PKR {{ record.total }}</h2>
    </div>
  </div>
  <div v-else>
    <div class="card">
      <img src="../../assets/schoolpk-logo.png" alt="Show Image"/>
      <h2>Data is Loading.........</h2>
    </div>
  </div>
  <bottomNav/>
</template>

<script setup>
import moment from "moment";
import axios from "axios";
import bottomNav from "@/components/bottomNav.vue";
import {useloginStore} from "@/store/store";
import AlertCircle from "../../assets/icons/AlertCircle.vue";
import CheckCircle from "../../assets/icons/CheckCircle.vue";
import {ref} from "vue";
import {useRoute} from "vue-router";
import {onBeforeMount} from "vue";

let loginstore = useloginStore();
let student = ref({});
let vouchers = ref({});
let route = useRoute();
let totalfeedue = ref(0)


onBeforeMount(() => {
  student.value = loginstore.students.find((s) => (s.id = route.params.id));
  loadVouchers();
})

async function loadVouchers() {
  loginstore.isloading = true;
  const res = await axios.get(`students/vouchers/${student.value.id}`, {
    params: {
      end_date: moment
          .min(moment(), moment(student.value.clas.end_date))
          .startOf("month")
          .format("YYYY-MM-DD"),
    },
  })
  loginstore.isloading = false;
  totalfeedue = res?.data?.summary?.total - res?.data?.summary?.totalPaid;
  vouchers = res?.data;


}

function formatedDate(date) {
  return moment(date).format('MMMM-YYYY')
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.feesummery {
  margin: 75px auto 0 auto;
  width: 76%;
  background-color: rgb(236, 13, 13);
  color: white;
  padding: 20px;
  border-radius: 10px;
}

.ack {
  margin: 75px auto 0 auto;
  width: 76%;
  background-color: green;
  color: white;
  padding: 20px;
  border-radius: 10px;
}

.monthfee {
  width: 76%;
  margin: 10px auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 20px;
  border-radius: 10px;
}

.fee {
  border-bottom: 1px solid rgb(175, 170, 170);
  padding: 12px 0;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
}

.due {
  display: flex;
  justify-content: center;
  align-items: center;
}

.success {
  color: green;
}

.danger {
  color: red;
}

.monthfee h2 {
  text-align: right;
  margin-right: 10px;
}

.monthfee h3 {
  font-size: 25px;
}

.monthfee h4 {
  padding: 8px 0;
  color: rgb(156, 151, 151);
}

.monthfee div h4 {
  margin: 0 20px;
  color: #2c3e50;
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
