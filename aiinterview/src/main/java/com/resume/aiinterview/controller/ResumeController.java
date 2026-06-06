package com.resume.aiinterview.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.resume.aiinterview.entity.Resume;
import com.resume.aiinterview.service.ResumeService;

@RestController
@RequestMapping("/api/resume")
@CrossOrigin("*")
public class ResumeController {

    @Autowired
    private ResumeService resumeService;

    @PostMapping("/upload")
    public Resume uploadResume(
            @RequestParam("file") MultipartFile file)
            throws Exception {

        return resumeService.uploadResume(file);
    }

    @GetMapping("/all")
    public List<Resume> getAllResumes() {

        return resumeService.getAllResumes();
    }
}