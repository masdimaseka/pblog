import axios from "axios";
import { token, baseUrl } from "./GlobalVariable";

export default async function getAuthor() {
  try {
    const response = await axios.get(baseUrl + "/user", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}
