<template>
    <div>
        <div>UserName: Delphine</div>
        <div>Phone: (775)976-6794</div>
        <div class="login-holder">

            <div class="title-login-holder">
                <h3 class="title-login">Sign in</h3>
            </div>
            <form id="loginform" @submit.prevent="loginHandler">
                <div class="form-group">
                    <label for="user">Username</label>
                    <input placeholder="User name" id="user" type="text" v-model="userName" name="user"/>
                    <span class="imput-error" v-if="isName">{{isName}}</span>
                </div>
                <div class="form-group">
                    <label for="phone">Phone Number</label>
                    <input placeholder="Phone Number" id="phone" type="text" v-model="phoneNumber" name="phone"/>
                    <span class="input-error" v-if="isPhone">{{isPhone}}</span>

                </div>
                <button class="btn-login">Register</button>
                <span class="form-error" v-if="isError">Incorrect username or phone</span>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import {checkName, checkPhone} from '@/util/ValidationCaptcha'

    export default {
        name: "LoginView",
        props: {
            user: {default: Object}
        },
        data() {
            return {
                userName: '',
                phoneNumber: '',
                isError: false
            };
        },
        computed: {
            isPhone() {
                return checkPhone(this.phoneNumber);
            },
            isName() {
                return checkName(this.userName);
            }
        },
        methods: {
            async loginHandler() {
                const users = await this.fetchUsers()
                users.map(user => {
                    let phone = user.phone.split(' ')
                    if (user.username == this.userName && this.phoneNumber == phone[0]) {
                        this.$emit('update:user', user)
                        this.$router.push('/toDo')
                    } else {
                        this.isError = true;
                        setTimeout(() => {
                            this.isError = false
                        }, 5000);
                    }
                })
            },
            async fetchUsers() {
                try {
                    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
                    console.log(response.data);
                    return response.data
                } catch (e) {
                    alert(e)
                }

            }
        }
    };
</script>
<style lang="scss">
    .input-error {
        position: absolute;
        bottom: -5px;
        font-size: 12px;
        color: #9c2424;

    }

    .form-error {
        position: absolute;
        display: flex;
        font-size: 12px;
        color: #9c2424;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        position: relative;

        label {
            font-weight: 400;
            font-size: 15px;
            line-height: 21px;
            letter-spacing: 0.01px;
            color: #5F5F5F;
            margin-bottom: 10px;
        }

        input {
            background: #FFFFFF;
            border-radius: 5px;
            padding: 10px;
            border: 0;
            outline: 0;
            margin-bottom: 14px;

            &:focus {
                outline: none !important;
            }
        }

    }

    .title-login-holder {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 15px 0px;
        background: #A5A5A5;
        border-radius: 5px 5px 0 0;
        margin-bottom: 15px;
    }

    .title-login {
        font-weight: 400;
        font-size: 17px;
        line-height: 15px;
        letter-spacing: -0.025em;
        color: #5F5F5F;
    }

    .login-holder {
        width: 100%;
        max-width: 447px;
        height: fit-content;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        box-shadow: 0 30px 60px 0 rgb(0 0 0 / 30%);
        margin: auto;
        background: #C4C4C4;
        border-radius: 5px;

    }

    #loginform {
        padding: 0 25px 30px;
    }

    .btn-login {
        cursor: pointer;
        margin-top: 11px;
        width: 100%;
        padding: 10px 0;
        text-align: center;
        background: #519945;
        border-radius: 5px;
        font-weight: 600;
        font-size: 17px;
        line-height: 21px;
        letter-spacing: -0.025em;
        color: #FFFFFF;
        border: 0;
        transition: all .3s;

        &:hover {

            background: #2d6824;
        }
    }
</style>
