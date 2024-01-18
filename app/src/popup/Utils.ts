import Database from "../engine/Database";

export interface Icon {
    size: number;
    src: string;
}

export enum Sort {
    NameAscending = "option-nameascending",
    NameDescending = "option-namedescending",
    TimeAscending = "option-timeascending",
    TimeDescending = "option-timedescending",
    None = "option-none",
}

export const optionEventValueToSortEnum = (optionEvent?: string): Sort => {
    switch (optionEvent) {
        case Sort.NameAscending:
        case Sort.NameDescending:
        case Sort.TimeAscending:
        case Sort.TimeDescending:
            return optionEvent as Sort;
        default:
            return Sort.None;
    }
};

export const getActiveTabDomainFromURL = (URL: string): string | null => {
    let result = URL.replace("https://", "");
    result = result.replace("http://", "");
    result = result.replace("www.", "");
    const results = result.match(/[^ /]+/g);
    return results && !results[0].includes(" ") && results[0].includes(".") ? results[0] : null;
};

export const getWebsiteIconObject = (websiteURL: string | undefined): Icon => {
    const iconDesiredSize = 20;
    const iconSource: string =
        websiteURL && websiteURL.length
            ? `https://icons.duckduckgo.com/ip3/${websiteURL}.ico`
            : "../resources/missing-website-favicon.png";

    const icon: Icon = {
        size: iconDesiredSize,
        src: iconSource,
    };
    return icon;
};

export function storeTimeSpentSummary(currentDomain: string) {
    const db = new Database();
    db.readPreviousDomain((domain: string) => {
        if (!!currentDomain.length && domain !== currentDomain) {
            db.writePreviousDomain(currentDomain);
            db.writeLastActive(currentDomain, new Date());
            db.writeLastVisited(domain, new Date());
            calculateTimeSpentForDomain(domain);
        }
    });
}

export function storeVisitsNumber(domain: string | null) {
    if (!domain) {
        return;
    }
    const db = new Database();
    db.readPreviousDomain((previousDomain) => {
        if (previousDomain !== domain) {
            db.readNumberOfVisits(domain, (numberOfVisits) => {
                db.writeNumberOfVisits(domain, numberOfVisits + 1);
            });
        }
    });
}

export function storeFirstVisitDateForDomain(domain: string): void {
    if (!domain) {
        return;
    }
    const db = new Database();
    db.writeFirstVisitDate(domain, new Date());
}

export const sortDataEntries = (data: Map<string, number>, sortMethod: Sort) => {
    return new Map(
        [...data].sort((entry1: [string, number], entry2: [string, number]) => {
            switch (sortMethod) {
                case Sort.NameAscending:
                    return entry1[0] < entry2[0] ? -1 : 1;
                case Sort.NameDescending:
                    return entry1[0] > entry2[0] ? -1 : 1;
                case Sort.TimeAscending:
                    return entry1[1] - entry2[1];
                case Sort.TimeDescending:
                    return entry2[1] - entry1[1];
                default:
                    return 0;
            }
        })
    );
};

export function calculateTimeSpentForDomain(domain: string) {
    const db = new Database();
    db.readLastActive(domain, (date: Date) => {
        db.readTimeSpent((content: number | Map<string, number>) => {
            db.writeTimeSpent(domain, Math.trunc(Math.abs(Date.now() - date.getTime()) / 1000) + (content as number));
        }, domain);
    });
}

export function calculateAverageTimeSpentPerDay(firstVisitDate: Date, totalVisitTime: number): number {
    const millisecondsSinceFirstVisit = Date.now() - new Date(firstVisitDate).getTime();
    const daysSinceFirstVisit = Math.max(1, Math.trunc(millisecondsSinceFirstVisit / (1000 * 60 * 60 * 24)));
    return Math.round(totalVisitTime / daysSinceFirstVisit);
}

export const howManyHoursInSeconds = (timeInSeconds: number): number => {
    const secondsInOneHour = 60 * 60;
    return (timeInSeconds - (timeInSeconds % secondsInOneHour)) / secondsInOneHour;
};

export const howManyMinutesInSeconds = (timeInSeconds: number): number => {
    const secondsInOneMinute = 60;
    if (timeInSeconds > secondsInOneMinute) {
        return Math.trunc((timeInSeconds / secondsInOneMinute) % secondsInOneMinute);
    } else {
        return 0;
    }
};

export const howManySecondsInSeconds = (timeInSeconds: number): number => {
    const secondsInOneMinute = 60;
    return timeInSeconds % secondsInOneMinute;
};

export const getMinutes = (timeInSeconds: number) => {
    const minutes = howManyMinutesInSeconds(timeInSeconds);
    return minutes < 10 ? `0${minutes}` : minutes.toString();
};

export const getSeconds = (timeInSeconds: number) => {
    const seconds = howManySecondsInSeconds(timeInSeconds);
    return seconds < 10 ? `0${seconds}` : seconds.toString();
};

export const getHours = (timeInSeconds: number) => howManyHoursInSeconds(timeInSeconds);
