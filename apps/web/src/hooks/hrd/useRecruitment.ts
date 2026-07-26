'use client';

import { useState } from 'react';
import {
  MOCK_FPTKS,
  MOCK_VACANCIES,
  MOCK_APPLICANTS,
  RequisitionFPTK,
  JobVacancy,
  ApplicantCandidate
} from '@/lib/mock/recruitment';

export function useRecruitment() {
  const [fptks, setFptks] = useState<RequisitionFPTK[]>(MOCK_FPTKS);
  const [vacancies, setVacancies] = useState<JobVacancy[]>(MOCK_VACANCIES);
  const [applicants, setApplicants] = useState<ApplicantCandidate[]>(MOCK_APPLICANTS);

  const approveFptk = (id: string) => {
    setFptks((prev) => prev.map((f) => (f.id === id ? { ...f, status: 'APPROVED' } : f)));
  };

  const scheduleInterview = (id: string, interviewDate: string, notes: string) => {
    setApplicants((prev) =>
      prev.map((app) => {
        if (app.id === id) {
          const logMsg = `[OPENCLAW WA] Undangan Interview Dikirim ke ${app.phone} (${interviewDate})`;
          return {
            ...app,
            status: 'INTERVIEW_SCHEDULED',
            interviewDate,
            interviewNotes: notes,
            waNotificationLog: [...(app.waNotificationLog || []), logMsg]
          };
        }
        return app;
      })
    );
  };

  // Execution of 4 Hiring Scenarios
  const executeHiringScenario = (
    applicantId: string,
    scenarioType: 1 | 2 | 3 | 4,
    offeringSalary: number,
    finalDecision?: 'HIRED' | 'REJECTED'
  ) => {
    setApplicants((prev) =>
      prev.map((app) => {
        if (app.id !== applicantId) return app;

        const logs = [...(app.waNotificationLog || [])];

        if (scenarioType === 1) {
          // Direct verbal offering at interview -> Wait final decision
          logs.push(`[HRD] Offering lisan diberikan di interview (Rp ${offeringSalary.toLocaleString('id-ID')}). Menunggu Keputusan Akhir.`);
          return {
            ...app,
            scenarioType: 1,
            offeringSalary,
            status: finalDecision || 'OFFERING_GIVEN',
            waNotificationLog: logs
          };
        }

        if (scenarioType === 2) {
          // Post-interview WA offering -> Wait candidate confirm -> Wait final decision
          logs.push(`[OPENCLAW WA] Draft Offering Sent via WA (Rp ${offeringSalary.toLocaleString('id-ID')}). Menunggu Konfirmasi Pelamar.`);
          return {
            ...app,
            scenarioType: 2,
            offeringSalary,
            status: 'WA_OFFERING_PENDING',
            waNotificationLog: logs
          };
        }

        if (scenarioType === 3) {
          // Instant offering & Instant Hired / Rejected at interview
          logs.push(`[HRD] Instant Offering & Direct Decision: ${finalDecision || 'HIRED'}`);
          return {
            ...app,
            scenarioType: 3,
            offeringSalary,
            status: finalDecision || 'HIRED',
            waNotificationLog: logs
          };
        }

        // Scenario 4: Post-interview WA offering -> Auto Hired on WA Confirm
        logs.push(`[OPENCLAW WA] Offering Sent via WA. Status: HIRED (Auto-Converted to Employee Master).`);
        return {
          ...app,
          scenarioType: 4,
          offeringSalary,
          status: 'HIRED',
          waNotificationLog: logs
        };
      })
    );
  };

  const newApplicantsCount = applicants.filter((a) => a.status === 'NEW_APPLICANT').length;

  return {
    fptks,
    vacancies,
    applicants,
    newApplicantsCount,
    approveFptk,
    scheduleInterview,
    executeHiringScenario
  };
}
