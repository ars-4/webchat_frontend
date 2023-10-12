<template>
  <div class="main_view" v-if="$bag.state.is_logged_in">
    <div class="header">
      <navigationBar />
    </div>
    <router-view />
  </div>

  <div class="auth_view" v-else>
    <login />
  </div>
</template>

<style>
html {
  scroll-behavior: smooth;
}

:root {
  --primary: #0d6efd;
  --secondary: #6c757d;
  --success: #198754;
  --warning: #ffc107;
  --danger: #dc3545;
  --light: #f8f9fa;
  --dark: #212529;

  --font: 'Roboto', 'Rubik', sans-serif;
  --light-bg: url('./assets/bg-light.png');
  --dark-bg: url('./assets/bg-dark.png');
}

::-webkit-scrollbar {
  width: 2px;
  background-color: var(--dark);
}

::-webkit-scrollbar-thumb {
  background-color: var(--primary);
  border-radius: 4px;
}

*,
body {
  margin: 0;
  padding: 0;
  font-family: var(--font);
}

#app {
  height: 100vh;
  overflow: hidden;
  background: var(--light-bg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: var(--dark);
}
#app.dark {
  background: var(--dark-bg);
  color: var(--light);
}

/* Buttons */
.btn {
  cursor: pointer;
  padding: 8px 12px;
  border: none;
  font-weight: bolder;
  border-radius: 4px;
  margin: 0px 4px;
}

#app.dark .btn {
  background-color: var(--dark);
  color: var(--light);
}

.btn-primary {
  background-color: var(--primary) !important;
  color: white;
}
</style>

<script>
import login from '@/components/auth/login.vue';
import navigationBar from '@/components/bars/NavigationBar.vue'

export default {

  methods: {


    logout: function () {
      this.$bag.commit('logout');
    },

  },

  components: {
    login,
    navigationBar,
  }

}

</script>
