import { Report } from "../types/Report";

let memoryReports: Report[] = [];

export const reportService = {
  getReports: (): Report[] => {
    return [...memoryReports];
  },
  addReport: (report: Report): void => {
    memoryReports = [report, ...memoryReports];
  },
};
