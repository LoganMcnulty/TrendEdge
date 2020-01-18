import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/user";

export function register(user) {
    return http.post(apiEndpoint, {
        email: user.email,
        password: user.password,
        name: "TestUser"
    })
}