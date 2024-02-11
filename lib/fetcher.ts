import axios from 'axios';

const fetcher = (url: string) => axios.get(url).then((res) => {console.log("fetcher: ", res.data); return res.data});

export default fetcher;