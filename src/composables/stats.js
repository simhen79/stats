import {ref} from "vue";
import axios from "axios";
import moment from "moment";

export default function useStats() {
    const stats = ref([]);
    const date = ref('');
    const topBirdies = ref([]);
    const topGames = ref([]);
    const topRatio = ref([]);

    const getStats = async () => {
        axios.get("./../../data/data.json?timestap=" + Date.now())
            .then((response) => {
            const data = response.data;
            stats.value = [...data.data].sort((a, b) => a.birdies - b.birdies);
            topBirdies.value = [...data.data].sort((a, b) => b.birdies - a.birdies).slice(0, 5);
            topGames.value = [...data.data].sort((a, b) => b.games - a.games).slice(0, 5);
            topRatio.value = [...data.data].sort((a, b) => b.ratio - a.ratio).slice(0, 5);
            date.value = moment(response.data.date).format('LLL');
        });
    }

    return { stats, date, topBirdies, topGames, topRatio, getStats };
}