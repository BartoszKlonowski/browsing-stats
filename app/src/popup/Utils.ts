// @ts-ignore
import Database from "../engine/Database";

export interface Icon {
    size: number;
    src: string;
}

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
        if (currentDomain.length > 0 && domain !== currentDomain) {
            db.writePreviousDomain(currentDomain);
            db.writeLastActive(currentDomain, new Date());
            calculateTimeSpentForDomain(domain);
        }
    });
}

export function calculateTimeSpentForDomain(domain: string) {
    const db = new Database();
    db.readLastActive(domain, (date: Date) => {
        db.readTimeSpent((timeSpent: number) => {
            db.writeTimeSpent(domain, Math.trunc(Math.abs(Date.now() - date.getTime()) / 1000) + timeSpent);
        }, domain);
    });
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
