import axios from "axios";

export default axios.create({
    baseURL: "https://github.healthfirst.org/api/v3/",
    headers: {
        Authorization: "Bearer 6a1a414c1bdfb0504e72a77d29841c2c4ea41dbd",
        Accept: "application/vnd.github.v3.raw"
    }
});