<template>
    <StudentHeader/>
    <div v-if="!loginstore.isloading">
        <div class="feesummery">
            <h3>Current Amount Due</h3>
            <h2>PKR {{totalfeedue}}</h2>
        </div>
        <div class="monthfee" v-for="record in vouchers.records">
            <h4>{{record.month}}-{{record.year  }}</h4>
            <span class="danger" v-if="record.payment===null"><Alert-Circle /></span>
            <span class="success"  v-else><CheckCircle/></span> 
            <h3>Due:PKR {{record.total}}</h3>
            
            <div v-for="detail in record.details"> 
            <h4>{{detail.fee_category.category}}</h4><h4>PKR {{detail.amount}}</h4></div>
          
            <h2>PKR {{record.total}}</h2>
        </div>
        </div>
        <div v-else>
                <div class="card">
                    <img src="../../assets/schoolpk-logo.png" alt="Show Image">
                    <h2>Data is Loading.........</h2>

                </div>
            </div>
       <bottomNav/>
    
</template>

<script>
import moment from 'moment'
import axios from 'axios'
import bottomNav from '@/components/bottomNav.vue'
import {useloginStore} from '@/store/store'
import AlertCircle from '../../assets/icons/AlertCircle.vue'
import CheckCircle from '../../assets/icons/CheckCircle.vue'
    export default {
        components:{
            bottomNav,
            AlertCircle,
            CheckCircle
        },
        data(){
                return{
                    loginstore:useloginStore(),
                    student:{},
                    vouchers:{},
                   
                    
                }
            },
           created(){
               this.student=this.loginstore.students.find(s=>s.id=this.$route.params.id)
              
               this.loadVouchers()
            },
            methods:{
                async loadVouchers(){
                    this.loginstore.isloading=true
            const res=await axios.get(`students/vouchers/${this.student.id}`,{
                params: {
                end_date: moment.min(moment(), moment(this.student.clas.end_date)).startOf('month').format('YYYY-MM-DD'),
            }
            })
            this.loginstore.isloading=false
            this.totalfeedue=res.data.summary.total-res.data.summary.totalPaid
            this.vouchers=res.data
            console.log(this.vouchers)
        },
        convertMonth(month){
           month = moment(month).format('MMM')
        }
            } 
                   
    
    }
</script>

<style scoped>
*{
    margin:0;
    padding:0;
    box-sizing: border-box;
}


.feesummery{
    margin:75px auto 0 auto;
    width:76%;
    background-color: rgb(236, 13, 13);
    color:white;
    padding:20px;
    border-radius: 10px;
}
.monthfee{
    width:76%;
    margin:10px auto;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    padding:20px;
    border-radius: 10px;
}
.monthfee div{
    border-bottom: 1px solid rgb(175, 170, 170);
    padding:12px 0;
    margin:10px 0;
    display: flex;
    justify-content: space-between;
}
.success{
    color: green;
}
.danger{
    color: red;
}
.monthfee h2{
    text-align: right;
    margin-right:10px;
}
.monthfee h3{
    font-size: 25px;
}
.monthfee h4{
    padding:8px 0;
    color:rgb(156, 151, 151);
}
.monthfee div h4{
    margin:0 20px;
    color:#2c3e50;
}
.card{
    width:80%;
    box-shadow:0 4px 8px 0 rgba(0,0,0,0.2);
    margin: 30px auto;
    background-color: aliceblue;
    border-radius:10px;
}
img{
    width:30%;
}
</style>