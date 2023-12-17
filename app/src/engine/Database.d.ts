export default class Database {
    writeTimeSpent(domain: string, timeSpentInSeconds: number): void;

    readTimeSpent(onResult: (content: number | Map<string, number>) => void, domain?: string): void;

    writePreviousDomain(domain: string): void;

    readPreviousDomain(onResult: (domain: string) => void): void;

    writeLastActive(domain: string, date: Date): void;

    readLastActive(domain: string, onReturn: (date: Date) => void): void;

    writeLastVisited(domain: string, date: Date): void;

    readLastVisited(domain: string, onReturn: (date: Date) => void): void;

    writeNumberOfVisits(domain: string, visitsNumber: number): void;

    readNumberOfVisits(domain: string, onReturn: (visitsNumber: number) => void): void;

    writeFirstVisitDate(domain: string, date: Date): void;

    readFirstVisitDate(domain: string, onReturn: (firstVisitDate: Date) => void): void;
}
