// package com.resume.aiinterview.controller;

// import java.util.Map;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.resume.aiinterview.service.GeminiService;

// @RestController
// @RequestMapping("/api/ai")
// @CrossOrigin("*")

// public class AIController {

//     @Autowired
//     private GeminiService geminiService;

//     @PostMapping("/ask")
//     public String askAI(
//             @RequestBody Map<String, String> body) {

//         String prompt = body.get("prompt");

//         return geminiService.askGemini(prompt);
//     }
// }

package com.resume.aiinterview.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.resume.aiinterview.service.GroqService;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin("*")
public class AIController {

    @Autowired
    private GroqService groqService;

    @PostMapping("/ask")
    public String askAI(
            @RequestBody Map<String, String> body) {

        String prompt = body.get("prompt");

        return groqService.askAI(prompt);
    }
}