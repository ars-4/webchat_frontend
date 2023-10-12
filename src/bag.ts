import Vuex from 'vuex';

export const bag = new Vuex.Store({
    state: {
        user: {
            group_name: localStorage.getItem('group_name') || '',
            username: localStorage.getItem('username') || '',
            token: localStorage.getItem('token') || ''
        },
        is_logged_in: Boolean(localStorage.getItem('is_logged_in')) || false,
        online_users: [],
    },

    mutations: {
        login(state: any, user: any) {
            state.user = user;
            state.is_logged_in = true;
            localStorage.setItem('token', user.token);
            localStorage.setItem('username', user.username);
            localStorage.setItem('group_name', user.group_name);
            localStorage.setItem('is_logged_in', "true");
        },
        logout(state: any) {
            state.user = {
                group_name: '',
                username: '',
                token: ''
            };
            state.is_logged_in = false;
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('group_name');
            localStorage.removeItem('is_logged_in');
        },

        set_online_users(state: any, online_users: any) {
            state.online_users = online_users;
        }

    }

})