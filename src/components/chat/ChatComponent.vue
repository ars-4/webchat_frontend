<template>
    <div class="chat-component">

        <div class="header" v-if="room_name != 'global'">
            <h2>{{ chat.user_name }}</h2>
            <div class="info">
                <span class="country">{{ chat.address }} - {{ chat.ip_address }}</span>
                <br>
                <span v-if="chat.status && chat.status == 'online'">{{ chat.status }}</span>
                <span v-else>Offline</span>
            </div>
        </div>

        <hr>

        <div class="body" v-if="room_name != 'global'">
            <div class="chat-output" ref="chatOutput">

                <div v-for="message in messages" :key="message">
                    <div :class="{ 'chat-bubble': true, 'user': message.user == $bag.state.user.username }"
                        v-if="!message.message.includes('Welcome to the chat')">
                        <a :href="message.message" target="_blank" class="message"
                            v-if="message.message.includes('http') && is_image(message.message)">
                            <img :src="message.message" style="width: 100%;">
                        </a>
                        <a :href="message.message" class="message" target="_blank"
                            v-else-if="message.message.includes('http')">
                            {{ message.message.split('files/')[1].toLowerCase() }}
                        </a>
                        <span class="message" v-else>{{
                            message.message }}</span>
                        <div class="info">
                            <span class="user">{{ message.user }}</span>
                            -
                            <span class="time">{{ message.timestamp }}</span>
                            <span class="device" v-if="message.ua">{{ message.ua["operating_system"] }}</span>
                        </div>
                    </div>
                </div>

            </div>

            <div class="chat-input">
                <div class="emoji-container hidden" ref="emojiContainer">
                    <span class="emoji" v-for="emoji in emojis" @click="selectEmoji(emoji)">{{ emoji }}</span>
                </div>
                <button class="icon icon-happy" @click="toggleEmojiContainer()"></button>
                <label class="icon icon-attachment">
                    <input type="file" ref="fileInput" @change="selectFile($event)" hidden>
                </label>
                <input type="text" placeholder="Type a message..." v-model="message" @keypress="is_enter_key($event)">
                <button class="icon icon-send_one" @click="sendMessage"></button>
            </div>
        </div>

    </div>
</template>

<style>
.chat-component {
    padding: 0px 15px;
}

.chat-component .header {
    margin-bottom: 8px;
}

.chat-component .header .info {
    font-size: 12px;
}

.chat-component .body .chat-output {
    margin: 8px 0;
    height: 60vh;
    border: 1px solid #c3c3c3;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
}

.chat-component .body .chat-output .chat-bubble {
    padding: 10px 15px;
    border-radius: 4px;
    border: 1px solid #242424;
    width: 45%;
    margin: 2%;
    cursor: pointer;
}

.chat-component .body .chat-output .chat-bubble.user {
    float: right;
    background: #242424;
    color: #fff;
    margin-left: 47%;
}

.chat-component .body .chat-output .chat-bubble .message {
    display: block;
    font-size: 20px;
    font-weight: bold;
    margin: 6px 0px;
}

.chat-component .body .chat-output .chat-bubble .info {
    display: block;
    font-size: 12px;
}

.chat-component .body .chat-output .chat-bubble .info .device {
    float: right;
}

.chat-component .body .chat-output .chat-bubble a {
    text-decoration: none;
    color: var(--primary);
}

.chat-component .body .chat-input {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #242424;
    border-radius: 4px;
    /* overflow-x: hidden; */
    padding: 0px 4px;
    position: relative;
    background-color: #fff;
}

.chat-component .body .chat-input button {
    border: none;
    cursor: pointer;
    padding: 4px 3px;
    width: 3%;
    margin: 0;
    font-size: 20px;
}

.chat-component .body .chat-input .icon-attachment {
    color: #242424;
}

.chat-component .body .chat-input input[type="text"] {
    border: none;
    outline: none;
    width: 85%;
    padding: 8px 6px;
}

.chat-component .body .chat-input .emoji-container {
    width: 235px;
    aspect-ratio: 1/1.2;
    position: absolute;
    background-color: #fff;
    bottom: 30px;
    left: 0.1px;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    z-index: 2 !important;
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
}

.chat-component .body .chat-input .emoji-container .emoji {
    cursor: pointer;
    margin: 2px;
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
}

.chat-component .body .chat-input .emoji-container.hidden {
    display: none;
}
</style>

<script>

export default {

    data() {
        return {
            connection: null,
            message: '',
            messages: [],
            room_name: 'global',
            url: '',
            information: {
                url: '',
                browser: '',
                operating_system: '',
                ip_address: '',
                country: ''
            },
            selectedFile: null,
            selectedFileContent: null,
            imageTypes: [
                'png', 'jpg', 'jpeg', 'gif', 'bmp', "webp", "svg"
            ],
            emojis: [
                "😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉", "😊", "😋", "😎", "😍",
                "😘", "🥰", "😗", "😙", "😚", "🙂", "🤗", "🤩", "🤔", "🤨", "😐", "😑", "😶",
                "🙄", "😏", "😣", "😥", "😮", "🤐", "😯", "😪", "😫", "🥱", "😴", "😌", "😛",
                "😜", "😝", "🤤", "😒", "😓", "😔", "😕", "🙃", "🤑", "😲", "🙁", "😖", "😞",
                "😟", "😤", "😢", "😭", "😦", "😧", "😨", "😩", "🤯", "😬", "😰", "😱", "🥵",
                "🥶", "😳", "🤪", "😵", "🥴",
            ]
        }
    },

    props: {
        chat: Object
    },

    methods: {

        is_enter_key: function (e) {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        },

        is_image: function (url) {
            for (let i = 0; i < this.imageTypes.length; i++) {
                if (url.includes(this.imageTypes[i])) {
                    return true;
                }
            }
        },

        selectEmoji(emoji) {
            this.message += emoji;
        },

        toggleEmojiContainer() {
            this.$refs.emojiContainer.classList.toggle('hidden');;
        },

        selectFile(event) {
            const selectedFile = event.target.files[0];
            if (selectedFile instanceof Blob) {
                this.selectedFile = selectedFile;

                if (this.selectedFile) {
                    const reader = new FileReader();
                    reader.onprogress = (event) => {
                        if (event.lengthComputable) {
                            const percentComplete = (event.loaded / event.total) * 100;
                            this.$notify(`File reading progress: ${percentComplete.toFixed()}%`);
                        }
                    };
                    reader.onload = () => {
                        this.selectedFileContent = reader.result.split(',')[1];
                    };
                    reader.readAsDataURL(this.selectedFile);
                } else {
                    console.log('error');
                }
            } else {
                console.log('error its not Blob');
            }
        },

        sendMessage: function () {
            if (!this.message && !this.selectedFile) {
                return;
            }
            if (this.selectedFile) {
                console.log(this.selectedFile.name);
                const reader = new FileReader();
                reader.onload = () => {
                    this.connection.send(JSON.stringify({
                        message: this.message,
                        user: 'Anonymous',
                        token: localStorage.getItem('token'),
                        url: `${this.$baseUri}/chat/api/messages/${this.room_name}/`,
                        msg_type: 'none',
                        file: {
                            name: this.selectedFile.name,
                            type: this.selectedFile.type,
                            content: this.selectedFileContent,
                        },
                    }));
                    this.message = '';
                    this.selectedFile = null;
                };
                reader.readAsArrayBuffer(this.selectedFile);
            } else {
                this.connection.send(JSON.stringify({
                    message: this.message,
                    user: 'Anonymous',
                    token: localStorage.getItem('token'),
                    url: `${this.$baseUri}/chat/api/messages/${this.room_name}/`,
                    msg_type: 'none',
                }));
                this.message = '';
            }
        },

        init: async function () {
            this.messages = [];
            await this.get_previous_messages();
            let websocket_host = this.$baseUri.split("//")[1];
            this.connection = new WebSocket(`ws://${websocket_host}/ws/chats/${this.room_name}/?token=${localStorage.getItem('token')}`);
            this.connection.onmessage = (e) => {
                let data = JSON.parse(e.data);
                if (data["online_users"]) {
                    this.$bag.commit('set_online_users', data["online_users"]);
                    for (let i = 0; i < data["online_users"].length; i++) {
                        if (data["online_users"][i] == this.chat.user_name) {
                            this.chat.status = 'online';
                            break;
                        } else {
                            this.chat.status = 'offline';
                        }
                    }
                }
                if (data["room"] == this.room_name) {
                    if (data["msg_type"] === "msg") {
                        this.messages.push(JSON.parse(e.data));
                        this.$nextTick(() => {
                            const container = this.$refs.chatOutput;
                            if (container) {
                                container.scrollTop = container.scrollHeight;
                            }
                        });
                    } else {
                        if (data["user"] === this.chat.user_name) {
                            this.information.url = data["url"];
                            let user_agent = JSON.parse(data["ua"]);
                            this.information.browser = user_agent["browser"];
                            this.information.operating_system = user_agent["operating_system"];
                            this.information.ip_address = user_agent["ip_address"];
                            this.information.country = user_agent["country"];
                            this.$emit('change_url', this.information);
                        }
                    }
                } else if (data["user"] != localStorage.getItem('username') && data["room"] != this.room_name && data["msg_type"] == "msg" && data["user"] != this.chat.user_name) {
                    this.$notify(`${data["user"]} sent you a message`);
                    this.reload_chats();
                }
            }
            this.connection.onopen = () => {
                console.log('connected');
            }
            this.connection.onclose = () => {
                console.log('disconnected');
            }
        },

        close_connection: function () {
            this.connection.close();
        },

        reload_chats: function () {
            this.$emit('reload_chats');
        },

        get_previous_messages: async function () {
            await fetch(`${this.$baseUri}/chat/api/messages/${this.room_name}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                },
            }).then(res => {
                return res.json()
            }).then(data => {
                if (data.data && data.data.length > 0) {
                    for (let i = 0; i < data.data.length; i++) {
                        if (data.data[i].timestamp.includes('T')) {
                            data.data[i].timestamp = data.data[i].timestamp.replace('T', ' ').split('.')[0];
                        }
                        this.messages.push(data.data[i]);
                    }
                    this.$nextTick(() => {
                        const container = this.$refs.chatOutput;
                        if (container) {
                            container.scrollTop = container.scrollHeight;
                        }
                    });
                }
            }).catch(err => {
                console.log(err.message)
            })
        },

    },

    beforeMount() {
        this.init();
    },


    created() {
        this.$watch(() => this.chat, () => {
            this.connection.close()
            this.room_name = this.chat.user_name.replace('#', '').toLowerCase();
            this.information = {
                url: '',
                browser: '',
                operating_system: '',
                ip_address: '',
                country: '',
            };
            this.$emit('change_url', this.information);
            this.init();
        })
        this.$watch(() => this.messages, () => {
            console.log("connected");
        })
    }

}

</script>