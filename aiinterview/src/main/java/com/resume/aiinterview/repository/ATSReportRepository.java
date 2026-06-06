package com.resume.aiinterview.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.resume.aiinterview.entity.ATSReport;

public interface ATSReportRepository
        extends JpaRepository<ATSReport, Long> {
}