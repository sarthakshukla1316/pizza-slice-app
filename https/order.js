import axios from "axios"

export const order = async () => {
    const response = await axios.post('http://192.168.96.154:5000/api/make-order');
    console.log(response);
}