import axios from "axios";

const BASE_URL =
  "http://localhost:8080/api/ai";

export const askAI = async (prompt) => {

  const response = await axios.post(
    `${BASE_URL}/ask`,
    {
      prompt,
    }
  );

  return response.data;
};