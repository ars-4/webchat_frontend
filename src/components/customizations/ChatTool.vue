<template>
    <div class="chat_tool">
        <div class="editor">
            <h3>Editor</h3>
            <div class="colors">
                <label>
                    <span class="cube" :style="{ 'background-color': colors.background }"></span>&nbsp;
                    Background Color
                    <input type="color" v-model="colors.background" hidden>
                </label>
                <label>
                    <span class="cube" :style="{ 'background-color': colors.foreground }"></span>&nbsp;
                    Foreground Color
                    <input type="color" v-model="colors.foreground" hidden>
                </label>
                <label>
                    <span class="cube" :style="{ 'background-color': colors.accent }"></span>&nbsp;
                    Accent Color
                    <input type="color" v-model="colors.accent" hidden>
                </label>
            </div>
            <div class="font">
                <input type="text" v-model="font">
                <input type="text" v-model="icon_src">
                <textarea cols="30" rows="10" v-model="special_tags"></textarea>
            </div>
        </div>
        <div class="mainoutput">
            <div class="output_ui">
                <div>
                    <h3>Output UI</h3>
                    <span :style="{ 'font-family': font }">Selected Font: {{ font }}</span>
                </div>
                <div class="container">
                    <div class="form" :style="{ 'background-color': colors.background, 'font-family': font }">
                        <div class="header" :style="{ 'background-color': colors.foreground }">
                            <span class="icon icon-user"></span>
                            <div class="info" :style="{ 'color': colors.background }">
                                <span class="name">Full Name</span>
                                <span class="email">example@example.com</span>
                            </div>
                        </div>
                        <div class="output">
                            <span class="msg user"
                                :style="{ 'background-color': colors.background, 'color': colors.foreground, 'border-color': colors.foreground }">
                                <span :style="{ 'color': colors.accent }">admin:</span> Hello There From Admin
                            </span>
                            <span class="msg"
                                :style="{ 'background-color': colors.foreground, 'color': colors.background, 'border-color': colors.background }">
                                <span :style="{ 'color': colors.accent }">You:</span> Hello There From Client
                            </span>
                        </div>
                        <div class="footer">
                            <div :class="['input-group']">
                                <input type="text" :style="{ 'background': 'transparent', 'color': colors.foreground }"
                                    placeholder="Enter message">
                                <button class="btn"
                                    :style="{ 'background-color': colors.background, 'color': colors.accent }">Send</button>
                            </div>
                        </div>
                    </div>
                    <button class="btn"
                        :style="{ 'background-color': colors.accent, 'color': colors.background, 'transform': 'rotateY(180deg)', 'aspect-ratio': '1', 'border-radius': '100%' }">
                        <img :src="icon_src" alt="chat_icon" style="width:20px">
                    </button>
                </div>
            </div>
            <div class="output_script">
                <h3>Output</h3>
                <div class="clipboard">
                    <span class="copy" @click="copyToClipboard($event)">Copy</span>
                    <code><pre contenteditable="true">{{ special_tags }}</pre></code>
                    <code class="tag">&lt;div class="chat-tool"&gt;&lt;/div&gt;</code>
                    <code class="tag">
                            <pre>&lt;script&gt;
    options = {accent_color: {{ colors.accent }},background_color: {{ colors.background }},foreground_color: {{ colors.foreground }},
    baseUri: '127.0.0.1:8000',imageUrl: '{{ icon_src }}',font: '{{ font }}'};
    &lt;/script&gt;</pre>
                        </code>
                    <code class="tag">&lt;script src="{{ script_src }}"&gt;&lt;/script&gt;</code>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.chat_tool {
    display: flex;
    justify-content: center;
    align-items: flex-start;
}

.chat_tool .editor,
.chat_tool .mainoutput {
    width: 50%;
    height: 80vh;
}

.chat_tool .editor,
.chat_tool .output_ui,
.chat_tool .output_script {
    border: 1px solid #242424;
    padding: 15px;
}

.chat_tool .editor .colors {
    font-size: 13px;
    display: flex;
    justify-content: flex-start;
}

.chat_tool .editor .colors label {
    padding: 8px 12px;
    margin: 4px;
    display: flex;
    align-items: center;
    cursor: pointer;
}

.chat_tool .editor .colors label .cube {
    width: 30px;
    height: 30px;
    border-radius: 4px;
    display: inline-block;
}
.chat_tool .editor .font input,
.chat_tool .editor .font textarea {
    padding: 8px 12px;
    border-radius: 4px;
    outline: none;
    border: 1px solid #242424;
    display: block;
    width: 25%;
    margin: 2px
}

.chat_tool .output_ui {
    height: 50vh;
    border-bottom: none;
}

.chat_tool .output_ui,
.chat_tool .output_ui .container {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
}

.chat_tool .output_ui .container {
    margin-left: 24px;
}

.chat_tool .output_ui .container .form {
    display: flex;
    width: 250px;
    height: 320px;
    border: 1px solid #000;
    margin: 0px 24px;
    flex-direction: column;
    font-size: 12px;
}

.chat_tool .output_ui .container .form .header {
    display: flex;
    padding: 4px;
    align-items: center;
    border-bottom: 1px solid #242424;
}

.chat_tool .output_ui .container .form .header .icon {
    font-size: 20px;
    background-color: #c3c3c3;
    padding-top: 2px;
    font-weight: bolder;
    border-radius: 4px;
}

.chat_tool .output_ui .container .form .header .info span {
    font-size: 8px;
    display: block;
    margin-left: 4px;
}

.chat_tool .output_ui .container .form .output {
    height: 230px;
    margin: 4px;
    display: flex;
    flex-direction: column;
}

.chat_tool .output_ui .container .form .output .msg {
    padding: 4px;
    border: 1px solid #000;
    width: 50%;
    margin: 2px;
    margin-left: 44%;
    font-size: 8px;
    border-radius: 4px;
}

.chat_tool .output_ui .container .form .output .msg.user {
    margin-left: 0;
}

.chat_tool .output_ui .container .form .footer {
    display: flex;
    padding: 4px;
    border-top: 1px solid #242424;
    align-items: center;
    justify-content: center;
}

.chat_tool .output_ui .container .form .footer .input-group {
    border: 1px solid #c3c3c3;
    border-radius: 4px;
}

.chat_tool .output_ui .container .form .footer .input-group input {
    border: none;
    outline: none;
    padding: 0px 4px;
}

.chat_tool .output_script {
    height: 25vh;
    overflow-y: scroll;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
}

.chat_tool .output_script .clipboard {
    padding: 10px 15px;
    margin-top: 4px;
    border-radius: 8px;
    border: 1px solid #242424;
    font-size: 12px;
    position: relative;
    overflow-y: scroll;
    overflow-x: hidden;
}

.chat_tool .output_script .clipboard .copy {
    position: absolute;
    right: 8px;
    top: 2px;
    cursor: pointer;
    padding: 4px;
    border: 1px solid #242424;
    border-radius: 4px;
}
</style>

<script>

export default {
    data() {
        return {
            colors: {
                background: '#fff',
                foreground: '#242424',
                accent: '#f44336'
            },
            font: 'Roboto',
            icon_src: "https://www.svgrepo.com/show/435806/chat-bubble.svg",
            script_src: 'https://cdn.jsdelivr.net/gh/ars-4/download-scripts@latest/ES/JS/ChatTool/index.js',
            special_tags: ''
        }
    },
    methods: {
        copyToClipboard: function (e) {
            let code = e.target.parentElement.querySelectorAll('code');
            let text = '';
            for (let i = 0; i < code.length; i++) {
                text += code[i].innerText;
            }
            navigator.clipboard.writeText(text);
            e.target.innerHTML = 'Copied ✔';
            setTimeout(() => {
                e.target.innerHTML = 'Copy';
            }, 1000);
        }
    }
}

</script>