import {ref} from "vue";

export default function useColors() {
    const colors = [];

    const genColors = (number = 10) => {
        for (let i = 0; i < number; i++) {
            colors.push('#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
        }
    };

    return { colors, genColors };
}