<template>
    <div class="navbar">

        <div class="nav-links" v-if="$bag.state.user.group_name == 'admin'">
            <a href="#" class="nav-link">Dashboard</a>
            <a href="/#/chat" class="nav-link">Chats</a>
            <a href="/#/customize" class="nav-link">Customizations</a>
        </div>

        <div class="brand">
            <h1>WebChat</h1>
        </div>

        <div class="user">
            <button class="btn btn-primary"><span class="icon icon-user"></span></button>
            <button class="btn btn-primary" @click="toggleMode()"><span class="icon icon-circle_wavy"></span></button>
            <button class="btn btn-primary" @click="$bag.commit('logout')">Logout</button>
        </div>

    </div>
</template>

<style>

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    background: var(--dark);
    color: var(--light);
}
.navbar .nav-links .nav-link {
    margin: 0 4px;
    text-decoration: none;
    font-size: 12px;
    color: var(--light);
    cursor: pointer;
}

@media screen and (max-width: 768px) {
    .navbar .nav-links {
        display: none;
    }
}

</style>

<script>


export default {

    methods: {

        toggleMode: function () {
            let current_mode = localStorage.getItem('mode') || 'light';
            if (current_mode == 'light') {
                localStorage.setItem('mode', 'dark');
                document.getElementById('app').classList.add('dark');
            } else {
                localStorage.setItem('mode', 'light');
                document.getElementById('app').classList.remove('dark');
            }
        }

    }

}


</script>