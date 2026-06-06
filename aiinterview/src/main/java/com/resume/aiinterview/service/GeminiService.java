// // package com.resume.aiinterview.service;

// // import java.util.Map;

// // import org.springframework.beans.factory.annotation.Autowired;
// // import org.springframework.beans.factory.annotation.Value;
// // import org.springframework.http.HttpEntity;
// // import org.springframework.http.HttpHeaders;
// // import org.springframework.http.MediaType;
// // import org.springframework.stereotype.Service;
// // import org.springframework.web.client.RestTemplate;

// // @Service
// // public class GeminiService {

// //     @Autowired
// //     private RestTemplate restTemplate;

// //     @Value("${gemini.api.key}")
// //     private String apiKey;

// //     public String askGemini(String prompt) {

// //         try {

// //           String url =
// // "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key="
// // + apiKey;
// // // String url =
// // // "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key="
// // // + apiKey;
// //             HttpHeaders headers = new HttpHeaders();

// //             headers.setContentType(MediaType.APPLICATION_JSON);

// //             String requestBody = """
// //                     {
// //                       "contents": [
// //                         {
// //                           "parts": [
// //                             {
// //                               "text": "%s"
// //                             }
// //                           ]
// //                         }
// //                       ]
// //                     }
// //                     """.formatted(prompt);

// //             HttpEntity<String> entity =
// //                     new HttpEntity<>(requestBody, headers);

// //             Map response =
// //                     restTemplate.postForObject(
// //                             url,
// //                             entity,
// //                             Map.class
// //                     );

// //             return response.toString();

// //         } catch (Exception e) {

// //             return "ERROR : " + e.getMessage();
// //         }
// //     }
// // }

// package com.resume.aiinterview.service;

// import java.util.List;
// import java.util.Map;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.http.HttpEntity;
// import org.springframework.http.HttpHeaders;
// import org.springframework.http.MediaType;
// import org.springframework.stereotype.Service;
// import org.springframework.web.client.RestTemplate;

// @Service
// public class GeminiService {

//     @Autowired
//     private RestTemplate restTemplate;

//     @Value("${gemini.api.key}")
//     private String apiKey;

//     public String askGemini(String prompt) {

//         try {

//             String url =
// "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key="
// + apiKey;

//             HttpHeaders headers =
//                     new HttpHeaders();

//             headers.setContentType(
//                     MediaType.APPLICATION_JSON
//             );

//             String requestBody = """
//                     {
//                       "contents": [
//                         {
//                           "parts": [
//                             {
//                               "text": "%s"
//                             }
//                           ]
//                         }
//                       ]
//                     }
//                     """.formatted(prompt);

//             HttpEntity<String> entity =
//                     new HttpEntity<>(
//                             requestBody,
//                             headers
//                     );

//             Map response =
//                     restTemplate.postForObject(
//                             url,
//                             entity,
//                             Map.class
//                     );

//             List candidates =
//                     (List) response.get("candidates");

//             if (candidates == null
//                     || candidates.isEmpty()) {

//                 return getMockResponse();
//             }

//             Map candidate =
//                     (Map) candidates.get(0);

//             Map content =
//                     (Map) candidate.get("content");

//             List parts =
//                     (List) content.get("parts");

//             Map part =
//                     (Map) parts.get(0);

//             return part.get("text").toString();

//         } catch (Exception e) {

//             System.out.println(e.getMessage());

//             return getMockResponse();
//         }
//     }

//     private String getMockResponse() {

//         return """
// 1. What is Java?
// 2. Explain OOP concepts.
// 3. What is Spring Boot?
// 4. What is JWT Authentication?
// 5. Difference between SQL and NoSQL?
// 6. Explain REST API.
// 7. What is Hibernate?
// 8. Explain Dependency Injection.
// 9. What is React?
// 10. Explain Microservices architecture.
// """;
//     }
// }

package com.resume.aiinterview.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;

// @Service
public class GeminiService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${gemini.api.key}")
    private String apiKey;

    public String askGemini(String prompt) {

        try {

           String url =
"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-001:generateContent?key="
+ apiKey;

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            String finalPrompt = """
                    You are a professional AI Interview Assistant.

                    Rules:
                    - Answer according to the user's question.
                    - Give detailed explanations.
                    - If interview questions are requested, generate relevant questions.
                    - If answers are requested, provide answers too.
                    - Format the response properly.

                    User Question:
                    """ + prompt;

            String requestBody = """
                    {
                      "contents": [
                        {
                          "parts": [
                            {
                              "text": "%s"
                            }
                          ]
                        }
                      ]
                    }
                    """.formatted(
                    finalPrompt.replace("\"", "\\\"")
            );

            HttpEntity<String> entity =
                    new HttpEntity<>(requestBody, headers);

            Map<String, Object> response =
                    restTemplate.postForObject(
                            url,
                            entity,
                            Map.class
                    );

            System.out.println("Gemini Response:");
            System.out.println(response);

            if (response == null) {
                return "Gemini API returned null response.";
            }

            List<Map<String, Object>> candidates =
                    (List<Map<String, Object>>) response.get("candidates");

            if (candidates == null || candidates.isEmpty()) {
                return "No response received from Gemini API.";
            }

            Map<String, Object> candidate =
                    candidates.get(0);

            Map<String, Object> content =
                    (Map<String, Object>) candidate.get("content");

            if (content == null) {
                return "Content not found in Gemini response.";
            }

            List<Map<String, Object>> parts =
                    (List<Map<String, Object>>) content.get("parts");

            if (parts == null || parts.isEmpty()) {
                return "No text generated by Gemini.";
            }

            return parts.get(0)
                    .get("text")
                    .toString();

        } catch (Exception e) {

            e.printStackTrace();

            return "ERROR: " + e.getMessage();
        }
    }
}