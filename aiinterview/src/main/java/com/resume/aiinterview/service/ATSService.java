package com.resume.aiinterview.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.resume.aiinterview.entity.ATSReport;
import com.resume.aiinterview.entity.Resume;
import com.resume.aiinterview.repository.ATSReportRepository;
import com.resume.aiinterview.repository.ResumeRepository;

@Service
public class ATSService {

    @Autowired
    private ResumeRepository resumeRepository;

    @Autowired
    private ATSReportRepository atsReportRepository;

    public ATSReport generateATSReport(Long resumeId) {

        Resume resume =
                resumeRepository.findById(resumeId)
                        .orElseThrow();

        String text =
                resume.getExtractedText().toLowerCase();

        List<String> skills = List.of(
                "java",
                "spring boot",
                "react",
                "mysql",
                "javascript",
                "html",
                "css",
                "tailwind",
                "jwt",
                "rest api"
        );

        int matchedSkills = 0;

        List<String> missingSkills =
                new ArrayList<>();

        for (String skill : skills) {

            if (text.contains(skill)) {

                matchedSkills++;

            } else {

                missingSkills.add(skill);
            }
        }

        int score =
                (matchedSkills * 100) / skills.size();

        ATSReport report = new ATSReport();

        report.setScore(score);

        report.setMissingSkills(
                String.join(", ", missingSkills));

        report.setSuggestions(
                "Add more relevant technical skills and project details.");

        return atsReportRepository.save(report);
    }
}