<template>

    <div class="dashboard">

        <div class="header">
            <h1>Dashboard</h1>
        </div>

        <div class="main">

            <div class="card">
                <div class="title">
                    <h3>&nbsp;List Employees</h3>
                </div>
                <br>
                <div class="body">
                    <ListEmployees ref="listEmployeesComponent" />
                </div>
            </div>

            <div class="card employee_card">
                <div class="title">
                    <h3>&nbsp;Add Employee</h3>
                </div>
                <br>
                <div class="body">
                    <AddEmployee @get_employees="() => getEmployees()" />
                </div>
            </div>

            <div class="card">
                <div class="title">
                    <h3>&nbsp;Read Employee</h3>
                </div>
                <br>
                <div class="body">
                    <ReadEmployee ref="readEmployeeComponent" />
                </div>
            </div>


        </div>

    </div>

</template>

<style>

.dashboard {
    padding: 0px 20px;
}
.dashboard .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 12px 0px;
}
.dashboard .main {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    align-items: center;
}
.dashboard .main .card {
    padding: 20px;
    background-color: var(--dark);
    color: #fff;
    border-radius: 4px;
    margin: 8px;
}

.dashboard .main .card.employee_card {
    overflow-x: hidden;
}

</style>

<script>

import AddEmployee from '@/components/employee/Create.vue'
import ListEmployees from '@/components/employee/List.vue'
import ReadEmployee from '@/components/employee/Read.vue'

export default {

    data() {
        return {
            counts: ["one", "two", "three", "four", "five"],
        }
    },
    
    components: {
        AddEmployee,
        ListEmployees,
        ReadEmployee
    },

    methods: {

        getEmployees: function() {
            this.$nextTick(() => {
                this.$refs.listEmployeesComponent.getEmployees();
            })
        }

    },

    beforeMount() {
        if(this.$bag.state.user.group_name != 'admin') {
            this.$router.push('/chat');
        }
    }

}

</script>