<template>
    <div class="chats-bar">

        <h1 class="heading">Chats</h1>

        <input type="text" class="form-control" placeholder="Search" v-model="chat_search" @keyup="filter_chats">

        <div class="chat-cards">

            <div class="chat-card" v-for="chat in filtered_chats" :key="chat.user_name" @click="$emit('chat-click', chat)">
                <div class="info">
                    <div class="picture">
                        <div class="btn btn-primary"><span class="icon icon-user"></span></div>
                    </div>
                    <div class="meta-info">
                        <h4 class="card-title">{{ chat.user_name }}</h4>
                        <span class="country">{{ chat.address }} - {{ chat.ip_address }}</span>
                        <span class="date_created">{{ chat.date_created.replace('T', ' ').split('.')[0] }}</span>
                        <span class="status">{{ chat.status }}</span>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<style>
.chats-bar {
    position: relative;
}

.chats-bar .heading {
    margin: 0px 15px;
}

.chats-bar .form-control {
    margin: 4px 15px;
    width: 80%;
    border: 1px solid #242424;
    border-radius: 4px;
    outline: none;
    padding: 8px 12px;
}

.chats-bar .chat-cards {
    display: flex;
    flex-direction: column;
    height: 70vh;
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 0px 15px;
}

.chats-bar .chat-cards .chat-card {
    display: flex;
    flex-direction: column;
    background: var(--dark);
    color: var(--light);
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    margin: 4px 0px;
}

.chats-bar .chat-cards .chat-card .info {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 3px 0px;
}

.chats-bar .chat-cards .chat-card .info .picture {
    width: 30%;
    aspect-ratio: 1/1;
    overflow: hidden;
    margin: 0 8px 0 0;
    border-radius: 4px;
}

.chats-bar .chat-cards .chat-card .info .picture .btn {
    width: 100%;
    padding: 0;
    margin: 0;
    aspect-ratio: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.chats-bar .chat-cards .chat-card .info .meta-info span {
    display: block;
    font-size: 12px;
}
</style>

<script>

export default {

    data() {
        return {
            chat_search: '',
            chats: [],
            filtered_chats: []
        }
    },

    methods: {
        filter_chats: function () {
            this.filtered_chats = this.chats.filter((chat) => {
                return chat.user_name.toLowerCase().includes(this.chat_search.toLowerCase())
            })
        },

        get_chats: async function () {
            await fetch(`${this.$baseUri}/chat/api/persons/?user__groups__name=client`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            }).then(res => { return res.json() }).then(data => {
                this.chats = data;
                this.filtered_chats = this.chats;
            }).catch(err => {
                console.log(err.message)
            })
        }
    },

    beforeMount() {
        this.get_chats();
    },

}

</script>