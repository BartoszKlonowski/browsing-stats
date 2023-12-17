class Database {
    storage: Storage;
    constructor() {
        this.storage = window.localStorage;
    }

    writeTimeSpent(domain: string, timeSpentInSeconds: number): void {
        if (domain.length === 0) {
            return;
        }
        try {
            const timeSpentObject = this.storage.getItem("timeSpent");
            if (timeSpentObject && timeSpentObject.length && timeSpentObject !== "{}") {
                const timeSpentMap = new Map<string, number>(JSON.parse(timeSpentObject));
                timeSpentMap.set(domain, timeSpentInSeconds);
                this.storage.setItem("timeSpent", JSON.stringify(Array.from(timeSpentMap.entries())));
            } else {
                this.storage.setItem(
                    "timeSpent",
                    JSON.stringify(Array.from(new Map([[domain, timeSpentInSeconds]]).entries()))
                );
            }
        } catch (exception) {
            console.error(`ERROR: `, exception);
        }
    }

    readTimeSpent(onResult: (content: number | Map<string, number>) => void, domain?: string): void {
        if (domain !== undefined) {
            try {
                const timeSpentObject = this.storage.getItem("timeSpent");
                const timeSpentMap =
                    timeSpentObject && timeSpentObject !== "{}"
                        ? new Map<string, number>(JSON.parse(timeSpentObject))
                        : new Map<string, number>([]);
                onResult(timeSpentMap.get(domain) || 0);
            } catch (exception) {
                console.error("ERROR: ", exception);
                onResult(0);
            }
        } else {
            try {
                const timeSpentObject = this.storage.getItem("timeSpent");
                const timeSpentMap =
                    timeSpentObject && timeSpentObject !== "{}"
                        ? new Map<string, number>(JSON.parse(timeSpentObject))
                        : new Map<string, number>([]);
                onResult(timeSpentMap);
            } catch (exception) {
                console.error("ERROR: ", exception);
                onResult(new Map<string, number>([]));
            }
        }
    }

    writePreviousDomain(domain: string): void {
        try {
            this.storage.setItem("previousDomain", domain);
        } catch (exception) {
            console.error("ERROR: ", exception);
        }
    }

    readPreviousDomain(onResult: (domain: string) => void): void {
        try {
            onResult(this.storage.getItem("previousDomain") || "");
        } catch (exception) {
            console.error("ERROR: ", exception);
            onResult("");
        }
    }

    writeLastActive(domain: string, date: Date): void {
        try {
            const lastActiveObject = this.storage.getItem("lastActive");
            if (lastActiveObject && lastActiveObject.length && lastActiveObject !== "{}") {
                const lastActiveMap = new Map<string, Date>(JSON.parse(lastActiveObject));
                lastActiveMap.set(domain, date);
                this.storage.setItem("lastActive", JSON.stringify(Array.from(lastActiveMap.entries())));
            } else {
                this.storage.setItem(
                    "lastActive",
                    JSON.stringify(Array.from(new Map<string, Date>([[domain, date]]).entries()))
                );
            }
        } catch (exception) {
            console.error("ERROR: ", exception);
        }
    }

    readLastActive(domain: string, onReturn: (date: Date) => void): void {
        try {
            const lastActiveObject = this.storage.getItem("lastActive");
            const lastActiveMap =
                lastActiveObject && lastActiveObject !== "{}"
                    ? new Map<string, Date>(JSON.parse(lastActiveObject))
                    : new Map<string, Date>([]);
            onReturn(new Date(lastActiveMap.get(domain) || new Date()));
        } catch (exception) {
            console.error("ERROR: ", exception);
            onReturn(new Date());
        }
    }

    readLastVisited(domain: string, onReturn: (date: Date) => void): void {
        try {
            const lastVisitedObject = this.storage.getItem("lastVisited");
            const lastVisitedMap =
                lastVisitedObject && lastVisitedObject !== "{}"
                    ? new Map<string, Date>(JSON.parse(lastVisitedObject))
                    : new Map<string, Date>([]);
            onReturn(new Date(lastVisitedMap.get(domain) || new Date()));
        } catch (exception) {
            console.error("readLastVisited.error", exception);
            onReturn(new Date());
        }
    }

    writeLastVisited(domain: string, date: Date): void {
        try {
            const lastVisitedObject = this.storage.getItem("lastVisited");
            if (lastVisitedObject && lastVisitedObject.length && lastVisitedObject !== "{}") {
                const lastVisitedMap = new Map<string, Date>(JSON.parse(lastVisitedObject));
                lastVisitedMap.set(domain, date);
                this.storage.setItem("lastVisited", JSON.stringify(Array.from(lastVisitedMap.entries())));
            } else {
                this.storage.setItem(
                    "lastVisited",
                    JSON.stringify(Array.from(new Map<string, Date>([[domain, date]]).entries()))
                );
            }
        } catch (error) {
            console.error("writeLastVisited.error: ", error);
        }
    }

    readNumberOfVisits(domain: string, onReturn: (visitsNumber: number) => void): void {
        try {
            const visitsNumberObject = this.storage.getItem("visitsNumber");
            const visitsNumberMap =
                visitsNumberObject && visitsNumberObject !== "{}"
                    ? new Map<string, number>(JSON.parse(visitsNumberObject))
                    : new Map<string, number>([]);
            onReturn(visitsNumberMap.get(domain) || 0);
        } catch (exception) {
            console.error("readNumberOfVisits.error", exception);
            onReturn(0);
        }
    }

    writeNumberOfVisits(domain: string, visitsNumber: number): void {
        try {
            const visitsNumberObject = this.storage.getItem("visitsNumber");
            if (visitsNumberObject && visitsNumberObject.length && visitsNumberObject !== "{}") {
                const visitsNumberMap = new Map<string, number>(JSON.parse(visitsNumberObject));
                visitsNumberMap.set(domain, visitsNumber);
                this.storage.setItem("visitsNumber", JSON.stringify(Array.from(visitsNumberMap.entries())));
            } else {
                this.storage.setItem(
                    "visitsNumber",
                    JSON.stringify(Array.from(new Map<string, number>([[domain, visitsNumber]]).entries()))
                );
            }
        } catch (error) {
            console.error("writeNumberOfVisits.error: ", error);
        }
    }

    writeFirstVisitDate(domain: string, date: Date): void {
        try {
            const firstVisitObject = this.storage.getItem("firstVisit");
            if (firstVisitObject && firstVisitObject.length && firstVisitObject !== "{}") {
                const firstVisitMap = new Map<string, Date>(JSON.parse(firstVisitObject));
                if (!firstVisitMap.has(domain)) {
                    firstVisitMap.set(domain, date);
                    this.storage.setItem("firstVisit", JSON.stringify(Array.from(firstVisitMap.entries())));
                }
            } else {
                this.storage.setItem(
                    "firstVisit",
                    JSON.stringify(Array.from(new Map<string, Date>([[domain, date]]).entries()))
                );
            }
        } catch (error) {
            console.error("writeFirstVisitDate.error: ", error);
        }
    }

    readFirstVisitDate(domain: string, onReturn: (firstVisitDate: Date) => void): void {
        try {
            const firstVisitObject = this.storage.getItem("firstVisit");
            const firstVisitMap =
                firstVisitObject && firstVisitObject !== "{}"
                    ? new Map<string, Date>(JSON.parse(firstVisitObject))
                    : new Map<string, Date>([]);
            onReturn(firstVisitMap.get(domain) || new Date());
        } catch (exception) {
            console.error("readNumberOfVisits.error", exception);
            onReturn(new Date());
        }
    }
}

export default Database;
