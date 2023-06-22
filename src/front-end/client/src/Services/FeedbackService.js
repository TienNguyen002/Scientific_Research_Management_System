import { get_api, post_api } from "./Method";

export function sendFeedback(formData){
    return post_api(`https://localhost:7129/api/feedbacks`, formData);
}
