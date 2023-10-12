<template>
    <div class="create_employee">
        <div class="input-group">
            <input type="text" placeholder="Username" v-model="employee.username">
            <input type="password" placeholder="Password" v-model="employee.password">
        </div>
        <div class="input-group">
            <input type="text" placeholder="First Name" v-model="employee.first_name">
            <input type="text" placeholder="Last Name" v-model="employee.last_name">
        </div>
        <div class="input-group">
            <input type="email" placeholder="Email" v-model="employee.email">
            <input type="text" placeholder="Phone" v-model="employee.phone">
        </div>
        <div class="input-group">
            <input type="text" placeholder="Country" v-model="employee.address">
            <button class="btn btn-primary" @click="add_employee()">+ Create</button>
        </div>
    </div>
</template>

<style>

.create_employee {
    display: block;
}
.create_employee .input-group {
    margin: 4px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}
.create_employee .input-group input {
    padding: 6px 12px;
    border-radius: 4px;
    border: 1px solid #c3c3c3;
    outline: none;
    margin: 0px 4px;
    display: block;
}
.create_employee .input-group .btn {
    width: 48%;
}

</style>

<script>

export default {

    data() {
        return {
            employee: {}
        }
    },

    methods: {
        add_employee: async function() {
            if(!this.employee.username || !this.employee.password || !this.employee.first_name || !this.employee.last_name || !this.employee.email || !this.employee.phone || !this.employee.address) {
                alert("All fields are required");
                return;
            } 
            await fetch(`${this.$baseUri}/chat/api/persons/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(this.employee)
            }).then(res => {
                return res.json()
            }).then(data => {
                console.log(data);
                this.$router.push('/')
                this.employee = {}
                this.$emit('get_employees')
            }).catch(err => {
                console.log(err.message)
            })
        }
        
    }

}

</script>