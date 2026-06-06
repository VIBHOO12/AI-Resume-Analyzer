package com.resume.aiinterview.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.resume.aiinterview.entity.Resume;

public interface ResumeRepository
        extends JpaRepository<Resume, Long> {
}