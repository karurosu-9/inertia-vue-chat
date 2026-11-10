import axios from "axios";
import { defineStore } from "pinia";

export const useMessagesStore = defineStore('messages', {
    state: () => {
        return {
            page: 1,
            messages: []
        }
    },
    actions: {
        fetchMessages(roomSlug, page=1) {
            axios.get(`/rooms/${roomSlug}/messages?page=${page}`)
            .then((response) => {
                /**
                 * ...this.messagesで既存のメッセージを展開し、そのメッセージに...response.data.dataで
                 * this.messagesの後ろにメッセージを展開して繋げる
                 **/
                this.messages = [...this.messages, ...response.data.data];
                this.page = response.data.meta.current_page;
            });
        }
    },
    getters: {
        allMessages(state) {
            return state.messages;
        }
    }
});
