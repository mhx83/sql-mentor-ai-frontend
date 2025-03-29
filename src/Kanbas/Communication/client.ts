import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COMM_API = `${REMOTE_SERVER}/api/messages`;
const USERS_API = `${REMOTE_SERVER}/api/users`;

export const fetchUsersByRole = async (role?: string) => {
    const response = await axiosWithCredentials.get(USERS_API, {
        params: role ? { role } : {},
    });
    return response.data;
};

export const sendMessage = async (message: {
    sender_id: number;
    receiver_id: number;
    subject: string;
    content: string;
}) => {
    const response = await axiosWithCredentials.post(COMM_API, message);
    return response.data;
};

export const fetchReceivedMessages = async (userId: number) => {
    const response = await axiosWithCredentials.get(`${COMM_API}/received/${userId}`);
    return response.data;
};

export const fetchSentMessages = async (userId: number) => {
    const response = await axiosWithCredentials.get(`${COMM_API}/sent/${userId}`);
    return response.data;
};