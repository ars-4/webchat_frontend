<template>
    <div class="chat_tool">
        <div class="editor">
            <h3>Editor</h3>
            <div class="colors">
                <label>
                    <span class="cube" :style="{'background-color':colors.background}"></span>&nbsp;
                    Background Color
                    <input type="color" v-model="colors.background" hidden>
                </label>
                <label>
                    <span class="cube" :style="{'background-color':colors.foreground}"></span>&nbsp;
                    Foreground Color
                    <input type="color" v-model="colors.foreground" hidden>
                </label>
                <label>
                    <span class="cube" :style="{'background-color':colors.accent}"></span>&nbsp;
                    Accent Color
                    <input type="color" v-model="colors.accent" hidden>
                </label>
            </div>
        </div>
        <div class="output">
            <div class="output_ui">
                <h3>Output UI</h3>
            </div>
            <div class="output_script">
                <h3>Output</h3>
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
.chat_tool .output {
    width: 50%;
    height: 70vh;
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

.chat_tool .output_ui {
    height: 45vh;
    border-bottom: none;
}
.chat_tool .output_script {
    height: 20vh;
}
</style>

<script>

export default {
    data() {
        return {
            colors: {
                background: '#fff',
                foreground: '#000',
                accent: '#f44336'
            }
        }
    }
}

</script>