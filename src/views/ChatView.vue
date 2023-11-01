<template>
  <div class="chat">

    <div class="main">
      <div class="left-side-drawer">
        <ChatsBar @chat-click="(chat) => set_active_chat(chat)" ref="chatsBar" />
      </div>
      <div class="mid-drawer">
        <ChatComponent :chat="active_chat_user" @reload_chats="reloadChats()" @change_url="(info) => change_url(info)"
          ref="chatComponent" />
      </div>
      <div class="right-side-drawer" v-if="active_chat_user.user !== 'Menace'">
        <h1>Right</h1>
        <div class="component">
          <personalInfo :user="active_chat_user" />
        </div>
        <div class="component">
          <notesComponent :room_name=active_room_name ref="notesComponent" />
        </div>
        <div class="component">
          <infoComponent v-if="information" :info="information" />
        </div>
      </div>
    </div>

    <div class="footer"></div>
  </div>
</template>

<style>
.chat .main {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0px 15px;
  padding-top: 8px;
}

.chat .main .left-side-drawer,
.chat .main .right-side-drawer {
  width: 20%;
}

.chat .main .mid-drawer {
  width: 60%;
}
</style>

<script>
import ChatsBar from '@/components/bars/ChatsBar.vue'
import ChatComponent from '@/components/chat/ChatComponent.vue'
import infoComponent from '@/components/chat/InfoComponent.vue'
import notesComponent from '@/components/chat/NotesComponent.vue'
import personalInfo from '@/components/chat/PersonalInfo.vue'

export default {

  data() {
    return {
      active_chat_user: {
        user: 'Menace',
        status: 'Online'
      },
      active_room_name: 'global',
      information: {}
    }
  },

  components: {
    ChatsBar,
    ChatComponent,
    infoComponent,
    notesComponent,
    personalInfo
  },

  methods: {

    set_active_chat: function (chat) {
      this.active_chat_user = chat;
      this.active_room_name = this.active_chat_user.user_name.replace('#', '').toLowerCase();
      this.$nextTick(() => {
        this.$refs.notesComponent.get_notes();
      });
    },

    reloadChats: function () {
      this.$refs.chatsBar.get_chats();
    },

    change_url: function (info) {
      this.information = info;
    },

  },


}

</script>