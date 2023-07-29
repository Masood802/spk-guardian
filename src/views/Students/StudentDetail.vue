<template>
    <StudentHeader/>
    <div class="maininfo">
             <div class="info" id="Info">
                <Account/>
                <div class="sub">
                    <h3>{{ student.name }}</h3>
                    <p>Name</p>
                </div>
             </div>
             <div class="info">
                <AccountGroup/>
                <div class="sub">
                    <h3>{{student.class }}{{ student.clas.session }}</h3>
                    <p>class</p>
                </div>
             </div>
             <div class="info">
                <FormateListNumbered/>
                <div class="sub">
                    <h3>{{ student.roll_num }}</h3>
                    <p>Roll Number</p>
                </div>
             </div>
             <div class="info">
                <Flag/>
                <div class="sub">
                    <h3>{{student.status }}</h3>
                    <p>Status</p>
                </div>
             </div>
             <div class="info">
                <CardAccountDetails/>
                <div class="sub">
                    <h3>{{ student.person.cnic }}</h3>
                    <p>CNIC</p>
                </div>
             </div>
             <div class="info">
                <MapMarker/>
                <div class="sub">
                    <h3>{{ student.person.address }}</h3>
                    <p>Address</p>
                </div>
                
             </div>
    </div>
    <bottomNav/>
        
   
</template>

<script>
import {useloginStore} from '@/store/store'
import Account from '../../assets/icons/Account.vue'
import Flag from '../../assets/icons/Flag.vue'
import AccountGroup from '../../assets/icons/AccountGroup.vue'
import FormateListNumbered from '../../assets/icons/FormatListNumbered.vue'
import CardAccountDetails from '../../assets/icons/CardAccountDetails.vue'
import MapMarker from '../../assets/icons/MapMarker.vue'
import bottomNav from '@/components/bottomNav.vue'

    export default {
        components:{
            Account,
            AccountGroup,
            FormateListNumbered,
            Flag,
            CardAccountDetails,
            MapMarker,
           bottomNav,
            

        },
            data(){
                return{
                    loginstore:useloginStore(),
                    student:{},
                    
                }
            },
            created(){

               this.student=this.loginstore.students.find(s=>s.id=this.$route.params.id)
               console.log(this.student)
            }
                   
    }
</script>

<style scoped>
*{
    margin:0;
    padding:0;
    box-sizing: border-box;
}
.maininfo{
    width:80%;
    margin:50px auto;
}
.info{
    display:flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid rgb(226, 226, 226);
    
}
.sub{
    margin-left:30px;
    text-align: left;
   line-height:2;
}
.sub p{
    color:gray;
}
h3{
    font-weight: lighter;
    font-size:18px;
}

</style>