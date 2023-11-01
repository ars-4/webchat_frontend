<template>
    <div class="personal_info">
        <div v-if="user" class="info">
            <input type="text" :value="user.name" @focusout="update_client('user_name', $event.target.value)">
            <input type="text" :value="user.email" @focusout="update_client('email', $event.target.value)">
        </div>

    </div>
</template>

<style>
.personal_info {
    padding-top: 5px;
    border-top: 1px solid #242424;
    margin-top: 5px;
}

.personal_info .info input {
    display: block;
    font-size: 12px;
    border: 1px solid #c3c3c3;
    padding: 5px 8px;
    border-radius: 4px;
    margin: 4px 0px;
}

</style>

<script>

export default {

    props: {
        user: Object
    },

    methods: {
        update_client: async function(key, value) {
            let body;
            if(key == 'user_name') {
                body = {
                    name: value,
                    email: this.user.email,
                    id: this.user.user_id
                }   
            } else {
                body = {
                    name: this.user.name,
                    email: value,
                    id: this.user.user_id
                }
            }
            await fetch(`${this.$baseUri}/chat/api/update_client/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(body)
            }).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err.message)
            })
        }
    }

}

</script>