import axios from "axios";

const BASE_URL =
  "http://localhost:8080/api/ats";

export const generateATSReport =
  async (resumeId) => {

    const response =
      await axios.post(
        `${BASE_URL}/generate/${resumeId}`
      );

    return response.data;
  };