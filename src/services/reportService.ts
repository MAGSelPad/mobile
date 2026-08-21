import { Report } from "../types/Report";
import { storageService } from "./storageService";

let memoryReports: Report[] = [];

const REPORTS_STORAGE_KEY = 'campusreport_reports';
const REPORT_RETENTION_DAYS = 30;

export const reportService = {
  init: async (): Promise<void> => {
    const savedReports = await storageService.get<Report[]>(REPORTS_STORAGE_KEY);
    if (savedReports) {
      const now = Date.now();
      const retentionMs = REPORT_RETENTION_DAYS * 24 * 60 * 60 * 1000;
      
      const validReports = savedReports.filter(r => {
        const reportDate = new Date(r.createdAt).getTime();
        return (now - reportDate) <= retentionMs;
      });
      
      memoryReports = validReports;
      
      if (validReports.length !== savedReports.length) {
        await storageService.set(REPORTS_STORAGE_KEY, memoryReports);
      }
    }
  },
  
  getReports: (): Report[] => {
    return [...memoryReports];
  },
  
  addReport: (report: Report): void => {
    memoryReports = [report, ...memoryReports];
    // Guardar asíncronamente en background
    storageService.set(REPORTS_STORAGE_KEY, memoryReports);
  },
};
