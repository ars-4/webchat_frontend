<template>
    <div class="list-employees">
        <table>
            <tr>
                <th>Username</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
            <tr v-for="employee in employees">
                <td>{{ employee.user_name }}</td>
                <td v-if="employee.status == 'online'">{{ employee.status }}</td>
                <td v-else>offline</td>
                <td>
                    <button class="btn btn-primary">Edit</button>
                    <button class="btn btn-danger">Delete</button>
                </td>
            </tr>
        </table>
    </div>
</template>

<style>

.list-employees table {
    border-collapse: collapse;
    border: 1px solid #ddd;
    width: 100%;
}

.list-employees table tr th,
.list-employees table tr td {
    border-bottom: 1px solid #ddd;
    padding: 8px;
}

</style>

<script>

export default {

    data() {
        return {
            employees: []
        }
    },

    methods: {
        getEmployees: async function () {
            this.employees = [];
            let usrs = this.$bag.state.online_users;
            await fetch(`${this.$baseUri}/chat/api/persons/?user__groups__name=employee`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            }).then(res => {
                return res.json()
            }).then(data => {
                for (let i = 0; i < data.length; i++) {
                    for (let j = 0; j < usrs.length; j++) {
                        if (data[i].user_name == usrs[j]) {
                            data[i].status = 'online';
                            break;
                        } else {
                            data[i].status = 'offline';
                        }
                    }
                    this.employees.push(data[i]);
                }
            }).catch(err => {
                console.log(err.message)
            })
        },

    },

    beforeMount() {
        this.getEmployees();
    },

    // created() {
    //     this.$bag.subscribe((mutation, state) => {
    //         if (mutation.type === 'set_online_users') {
    //             this.employees = []
    //             this.getEmployees();
    //             return;
    //         }
    //     })
    // }

}

</script>