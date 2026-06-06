package com.resume.aiinterview.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GroqService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${groq.api.key}")
    private String apiKey;

    public String askAI(String prompt) {

        try {

            String url =
                    "https://api.groq.com/openai/v1/chat/completions";

            HttpHeaders headers =
                    new HttpHeaders();

            headers.setBearerAuth(apiKey);

            headers.setContentType(
                    MediaType.APPLICATION_JSON
            );

            String requestBody = """
            {
              "model":"llama-3.3-70b-versatile",
              "messages":[
                {
                  "role":"system",
                  "content":"You are a professional AI Interview Assistant. Answer user questions in detail."
                },
                {
                  "role":"user",
                  "content":"%s"
                }
              ]
            }
            """.formatted(
                    prompt.replace("\"", "\\\"")
            );

            HttpEntity<String> entity =
                    new HttpEntity<>(
                            requestBody,
                            headers
                    );

            Map<String, Object> response =
                    restTemplate.postForObject(
                            url,
                            entity,
                            Map.class
                    );

            List<Map<String, Object>> choices =
                    (List<Map<String, Object>>)
                            response.get("choices");

            if (choices == null ||
                    choices.isEmpty()) {

                return "No response received.";
            }

            Map<String, Object> choice =
                    choices.get(0);

            Map<String, Object> message =
                    (Map<String, Object>)
                            choice.get("message");

            return message.get("content")
                    .toString();

        }
        catch (Exception e) {

            e.printStackTrace();

            return "ERROR : "
                    + e.getMessage();
        }
    }
}