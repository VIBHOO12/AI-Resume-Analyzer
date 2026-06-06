package com.resume.aiinterview.service;


import java.io.InputStream;
import java.util.List;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.resume.aiinterview.entity.Resume;
import com.resume.aiinterview.repository.ResumeRepository;

@Service
public class ResumeService {

    @Autowired
    private ResumeRepository resumeRepository;
    public List<Resume> getAllResumes() {

    return resumeRepository.findAll();
}
    public Resume uploadResume(MultipartFile file)
            throws Exception {

        InputStream inputStream =
                file.getInputStream();

        PDDocument document =
                PDDocument.load(inputStream);

        PDFTextStripper pdfStripper =
                new PDFTextStripper();

        String extractedText =
                pdfStripper.getText(document);

        document.close();

        Resume resume = new Resume();

        resume.setFileName(
                file.getOriginalFilename());

        resume.setExtractedText(extractedText);

        return resumeRepository.save(resume);
    }
}