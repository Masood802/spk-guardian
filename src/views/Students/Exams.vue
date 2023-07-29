<template>
   <StudentHeader/>
        <div v-if="!loginstore.isloading">
             <div class="examReport">
                <div><StarCircle/>
                 <h1> Overall Position : {{ report?.summary?.position}} </h1>
                </div>
                <h3> Test Result of {{date}}</h3>
                <div class="result">
                    <div>Total</div><div>Obtained</div><div>Percentage</div></div>
                   <div class="result">
                    <div>{{report?.summary?.total}}</div><div>{{report?.summary?.score}}</div><div>69%</div>
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
                
                <tr v-for="test,index in report.tests">
                    
                    <td>{{index+1}}</td>
                    <td>{{test.date}}</td>
                    <td>{{ test.title }}</td>
                    <td>{{test.max_marks}}</td>
                    <td>{{test.obtained}}</td>
                </tr>
                
               
             </table>
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
import moment from'moment'
import axios from 'axios'
import bottomNav from '@/components/bottomNav.vue'
import {useloginStore} from '@/store/store'
import StarCircle from '@/assets/icons/StarCircle.vue'
    export default {
        components:{
            bottomNav,
            StarCircle
        },
        data(){
                return{
                    loginstore:useloginStore(),
                    student:{},
                    date:null,
                    report:{}
                   
                }
            },
           created(){
               this.student=this.loginstore.students.find(s=>s.id=this.$route.params.id) 
               this.date = moment.min(moment(),moment(this.student.clas.end_date)).startOf('month').format('YYYY-MM-DD');
               this.loadExamReport()
               this.convertdate()
            },
          
            methods:{
                async loadExamReport(){
                    this.loginstore.isloading=true
                    const res= await axios.post(`student-report`,{
                                class_id: this.student.class_id,
                                start_date: this.date,
                                end_date: this.student.clas.end_date,
                                layout: "Portrait",
                                individualReport: true,
                                roll_num: this.student.roll_num
                         })
                         this.loginstore.isloading=false
                         this.report=res.data
                         console.log(this.report)
                         console.log(this.report?.summary?.position)
                },
                convertdate(){
                    this.date=moment(this.date).format('MMM-YYYY')
                }
            }
              
        
    }
</script>

<style scoped>
*{
    box-sizing: border-box;
}
.examReport{
    width:80%;
    margin:75px auto 15px auto;
    background-color: dodgerblue;
    padding:10px;
    border-radius: 10px;
    color:white;

}
h1{
  margin:0 5px;
}
.examReport div{
    display: flex;
    justify-content: center;
    align-items: center;
    margin:10px 5px;
}
.result{
    display:flex;
    justify-content: space-between;
    align-items: center;
    width:100%;
    margin:auto;
}
.result div{
    margin:10px auto;
    font-weight: bold;
}
table{
    width:80%;
    margin: 0 auto 150px auto;
    border-spacing:0;
}
tr,td,th{
    padding:10px;
    margin:0;
   
}
tr:nth-child(odd){
    background-color:rgb(241, 234, 234);
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