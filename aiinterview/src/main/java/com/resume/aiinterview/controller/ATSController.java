package com.resume.aiinterview.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.resume.aiinterview.entity.ATSReport;
import com.resume.aiinterview.service.ATSService;

@RestController
@RequestMapping("/api/ats")
@CrossOrigin("*")

public class ATSController {

    @Autowired
    private ATSService atsService;

    @PostMapping("/generate/{resumeId}")
    public ATSReport generateReport(
            @PathVariable Long resumeId) {

        return atsService.generateATSReport(resumeId);
    }
}