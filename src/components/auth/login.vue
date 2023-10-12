<template>
    <div class="login">

        <div class="form">
            <h1>Login</h1>
            <hr>
            <input type="text" placeholder="username" v-model="username" />
            <input type="password" placeholder="password" v-model="password" />
            <button type="submit" class="btn btn-primary" @click="login()">Login</button>
        </div>

    </div>
</template>

<style>
.login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 80vh;
}

.login h1 {
    margin: 10px 0;
    color: #fff;
}

.login .form {
    padding: 20px 40px;
    background-color: #242424;
    color: #fff;
    border-radius: 4px;
    box-shadow: 0px 6px 10px #242424;
}

.login .form input {
    margin: 10px 0;
    display: block;
    outline: none;
    border: none;
    padding: 8px 12px;
    width: 200px;
    border-radius: 4px;
}

.login .form button {
    margin: 0px 0;
}
</style>

<script>

export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },

    methods: {
        login: async function () {
            await fetch(`${this.$baseUri}/chat/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.username,
                    password: this.password
                })
            }).then(res => res.json()).then(data => {
                this.$bag.commit('login', {
                    username: data.data.username,
                    token: data.data.token,
                    group_name: data.data.group
                })
            }).catch(err => {
                console.log(err.message)
            })
        }
    }

}

</script>