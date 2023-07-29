import { defineStore } from 'pinia';
import axios from 'axios';

export const useloginStore = defineStore('loginstore', {
    state: () => ({
        user: {
            schoolCode: 'dev',
            email: '08es34+g2@gmail.com', // todo: remove when needed
            password: '123456',
            otp: '',
            confirm_password: '',
            photo: '../assets/default_user.png',
            id: null
        },
        page: 'login',
        logedIn: false,
        passwrdType: 'password',
        // students: [],
        token: '',
        isloading: false
    }),
    getters: {
        students() {
            return this.user.students
        },
    },
    actions: {
        async login() {
            this.isloading = true
            const res = await axios.post('/login', {
                email: this.user.email,
                password: this.user.password
            })
            if (res.status == 200) {
                this.logedIn = true
                this.isloading = false
                this.user = res.data
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('user', JSON.stringify(res.data.user))
                // this.students = this.user.user.students
            }
            else
                alert('UserName /Password incorrect')

        },
        async register() {
            const res = await axios.post('/register', {
                email: this.user.email,
                password: this.user.password,
                confirm_password: this.user.confirm_password
            })
            if (res.status == 200) {
                const data = res.data
                console.log(data)
                alert('OTP has Sent to your email Address')
                this.user.otp = data.otp
                this.user.id = data.id
                console.log(this.user.id)
            }
            else
                alert(res.err)



        },
        async submit() {
            const res = await axios.post(`/${this.user.id}/activate-account`, {
                otp: this.user.otp
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