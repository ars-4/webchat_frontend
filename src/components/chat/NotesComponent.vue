<template>

    <div class="notes_component">

        <div class="header">
            <h3>Notes</h3>
            <button class="btn btn-primary" @click="add_note()">+ Note</button>
        </div>
        <div class="body">
            <div class="notes" v-if="notes.length > 0">

                <div class="note-card" v-for="note in notes" :key="note.id">
                    <textarea rows="10" placeholder="Type a note..."
                    v-model="note.content" :id="note.id" @focusout="save_note(note)"
                    ></textarea>
                    <div class="footer">
                        <span class="user">{{ note.user_name }}</span>
                        <span class="timestamp">{{ note.date_updated.replace('T', ' ').split('.')[0] }}</span>
                    </div>
                </div>

            </div>
        </div>

    </div>

</template>

<style>

.notes_component {
    border-top: 1px solid #c3c3c3;
    margin: 18px 0px;
    border-bottom: 1px solid #c3c3c3;
}
.notes_component .header {
    margin: 8px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0px;
    border-bottom: 1px solid #c3c3c3;
}
.notes_component .body {
    height: 40vh;
    overflow-y: scroll;
}
.notes_component .body .notes .note-card {
    margin: 12px;
    width: 75%;
}
.notes_component .body .notes .note-card textarea {
    width: 100%;
    border-radius: 4px;
    border: 1px solid #c3c3c3;
    outline: none;
    padding: 10px 15px;
    resize: vertical;
}
.notes_component .body .notes .note-card .footer {
    width: 100% !important;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0px 16px;
    font-size: 12px;
}
.notes_component .body .notes .note-card .footer span {
    display: block;
}
</style>

<script>

export default {

    data() {
        return {
            notes: [
                
            ]
        }
    },

    props: {
        room_name: String
    },

    methods: {
        get_notes: async function() {
            await fetch(`${this.$baseUri}/chat/api/notes/?room__name=${this.room_name}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            }).then(res => {
                return res.json()
            }).then(data => {
                this.notes = data;
            }).catch(err => {
                console.log(err.message)
            })
        },

        add_note: async function() {
            console.log(this.room_name)
            await fetch(`${this.$baseUri}/chat/api/notes/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    room: this.room_name,
                    user: localStorage.getItem('username'),
                    content: '_'
                })
            }).then(res => {
                return res.json()
            }).then(data => {
                this.get_notes();
            }).catch(err => {
                console.log(err.message)
            })
        },

        save_note: async function(note) {
            await fetch(`${this.$baseUri}/chat/api/notes/${note.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    content: note.content,
                    room: note.room,
                    user: note.user
                })
            }).then(res => {
                return res.json()
            }).then(data => {
                this.get_notes();
            }).catch(err => {
                console.log(err.message)
            })
        }

    },

    // beforeMount() {
    //     this.get_notes()
    // }

}

</script>