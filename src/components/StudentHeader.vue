<template>
    <div>
        <div class="header">
            <div class="back" @click="$router.push('/')">
                <KeyboardBackspace />
            </div>
            <div class="stdheader">
                <p>{{ student.name }}</p>
                <p>{{ student.clas.class }} {{ student.clas.session }}</p>
            </div>
            <div>
                <img :src="student.photo" alt="Student photo">
            </div>
        </div>
    </div>
</template>

<script setup>
import { useloginStore } from '@/store/store'
import KeyboardBackspace from '../assets/icons/KeyboardBackspace.vue'
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';

let loginstore = useloginStore()
let student = ref({})
let route = useRoute()

onBeforeMount(() => {
    console.log(route.params.id)
    student.value = loginstore.students.find(s => s.id = route.params.id)
})

</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.back {
    position: fixed;
    top: 10;
    left: 75;
    margin: 5px;
    color: rgb(247, 242, 242);
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
}

.header {
    width: 80%;
    margin: 0 auto;
    background-color: rgb(78, 81, 85);
    height: 250px;
}

.stdheader p:first-child {
    padding-top: 40px;
    font-size: 20px;
    font-weight: bold;
    color: white;
    line-height: 0.5;
}

.stdheader p:nth-child(2) {
    font-size: 18px;
    margin-top: 25px;
    line-height: .5;
    color: white;
}

img {
    width: 150px;
    height: 150px;
    border-radius: 100%;
    margin: 60px auto;
    border: 5px solid white;
    outline: 5px solid rgb(78, 81, 85);
}

h1 {
    margin-top: 40px;

}</style>