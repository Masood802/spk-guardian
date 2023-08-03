import {defineStore} from 'pinia';
import axios from 'axios';
import router from "@/router";

export const useloginStore = defineStore('loginstore', {
    state: () => ({
        user: {},
        form: {
            schoolCode: 'dev',
            email: '',
            password: '',
            otp: '',
            confirm_password: '',
            photo: '../assets/default_user.png',
            id: null
        },
        page: 'login',
        logedIn: false,
        passwrdType: 'password',
        token: '',
        isloading: false
    }),
    getters:{
        students(){
            return this.user?.students
        }
    },
    actions: {
        async login() {
            this.isloading = true
            const res = await axios.post('/login', {
                email: this.form.email,
                password: this.form.password
            })
            if (res.status == 200) {
                this.logedIn = true
                this.isloading = false
                this.user = res.data.user
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('user', JSON.stringify(res.data.user))
                router.push('/home')
            } else
                alert('UserName /Password incorrect')
        },
        async register() {
            const res = await axios.post('/register', {
                email: this.form.email,
                password: this.form.password,
                confirm_password: this.form.confirm_password
            })
            if (res.status == 200) {
                const data = res.data
                console.log(data)
                alert('OTP has Sent to your email Address')
                this.form.otp = data.otp
                this.form.id = data.id
                console.log(this.user.id)
            } else
                alert(res.err)
        },
        async submit() {
            const res = await axios.post(`/${this.user.id}/activate-account`, {
                otp: this.form.otp
            })
            if (res.status == 200) {
                alert('You have successfully registered')
                const data = res
                this.page = 'varify'
                this.$router.push('/')
                console.log(data)
            }
        },
    }
})
