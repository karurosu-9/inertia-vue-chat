<script setup>
import { nextTick, ref } from 'vue';

const message = ref('');

const shift = ref(false);

const emit = defineEmits();

const handleEnter = (e) => {
    // メッセージの改行処理
    if (e.shiftKey) {
        const text = message.value;
        const cursor = e.target.selectionStart;

        // カーソルがある行を取り出す
        const lines = text.split("\n");
        const lineIndex = text.slice(0, cursor).split("\n").length - 1;
        const currentLine = lines[lineIndex];

        // 今いる行が空なら、もしくはスペースのみなら改行しない
        if (currentLine.trim().length === 0) {
            return;
        }

        // 文字がある場合は、カーソル位置に改行を入れる
        const end = e.target.selectionEnd;

        message.value =
            text.slice(0, cursor) + "\n" + text.slice(end);

        // 更新後、カーソルを改行の直後へ移動する
        nextTick(() => {
            e.target.setSelectionRange(cursor + 1, cursor + 1);
        });

        return;
    }

    // メッセージの送信の際は、メッセージの内容を親コンポーネントに渡す
    if (message.value.length > 0) {
        emit("valid", message.value);

        message.value = ""
    }
};
</script>

<template>
    <footer
        id="page-footer"
        class="fixed bottom-0 end-0 start-0 items-center border-t border-slate-200/75 bg-white lg:start-80"
    >
        <textarea
            v-model="message"
            v-on:keydown.enter.prevent="handleEnter"
            v-on:keydown.shift="shift = true"
            v-on:keyup="shift = false"
            class="-mx-5 block w-full rounded-lg border-0 px-5 py-4 leading-6 focus:border-indigo-500 focus:ring focus:ring-indigo-500/75"
            placeholder="Type a new message and hit enter.."
        ></textarea>
    </footer>
</template>
