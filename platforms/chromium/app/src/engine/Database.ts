import browser from "webextension-polyfill";

class Database {
    writeTimeSpent(domain: string, timeSpentInSeconds: number) {
        if (domain?.length === 0) {
            return;
        }
        try {
            browser.storage.local
                .get("timeSpent")
                .then((content) => {
                    if (!!content && Object.keys(content) && Object.keys(content)?.length) {
                        const timeSpentMap = new Map<string, number>(Object.values(content.timeSpent));
                        timeSpentMap.set(domain, timeSpentInSeconds);
                        browser.storage.local.set(
                            JSON.parse(`{"timeSpent":${JSON.stringify(Array.from(timeSpentMap.entries()))}}`)
                        );
                    } else {
                        browser.storage.local.set(
                            JSON.parse(`{"timeSpent":${JSON.stringify(Array.from(new Map([]).entries()))}}`)
                        );
                    }
                })
                .catch((error) => {
                    console.error("writeTimeSpent.browser.storage.local.get.error: ", error);
                });
        } catch (exception) {
            console.error(`ERROR: `, exception);
        }
    }

    readTimeSpent(onResult: (content: number | Map<string, number>) => void, domain?: string) {
        try {
            browser.storage.local.get("timeSpent").then((content) => {
                const timeSpentMap =
                    content && Object.keys(content).length
                        ? new Map<string, number>(Object.values(content.timeSpent))
                        : new Map<string, number>([]);
                onResult(domain ? timeSpentMap.get(domain) || 0 : timeSpentMap);
            });
        } catch (exception) {
            console.error("ERROR: ", exception);
            return 0;
        }
    }

    writePreviousDomain(domain: string) {
        try {
            browser.storage.local.set(JSON.parse(`{"previousDomain":"${domain}"}`)).catch((error) => {
                console.error("writePreviousDomain.set.error: ", error);
            });
        } catch (exception) {
            console.error("ERROR: ", exception);
        }
    }

    readPreviousDomain(onResult: (domain: string) => void) {
        try {
            browser.storage.local
                .get("previousDomain")
                .then((content) => {
                    onResult(content.previousDomain);
                })
                .catch((error) => {
                    console.error("readPreviousDomain.browser.storage.local.get.error: ", error);
                    onResult("");
                });
        } catch (exception) {
            console.error("ERROR: ", exception);
            onResult("");
        }
    }

    writeLastActive(domain: string, date: Date) {
        try {
            browser.storage.local
                .get("lastActive")
                .then((lastActiveObject) => {
                    if (lastActiveObject && Object.keys(lastActiveObject).length) {
                        const content = new Map<string, Date>(Object.values(lastActiveObject.lastActive));
                        content.set(domain, date);
                        browser.storage.local
                            .set(JSON.parse(`{"lastActive":${JSON.stringify(Array.from(content.entries()))}}`))
                            .catch((error) => {
                                console.error("browser.storage.local.set.error: ", error);
                            });
                    } else {
                        browser.storage.local
                            .set(
                                JSON.parse(
                                    `{"lastActive":${JSON.stringify(
                                        Array.from(new Map<string, Date>([[domain, date]]).entries())
                                    )}}`
                                )
                            )
                            .catch((error) => {
                                console.error("browser.storage.local.set.error: ", error);
                            });
                    }
                })
                .catch((error) => {
                    console.error("writeLastActive.ERROR:", error);
                });
        } catch (exception) {
            console.error(`ERROR: `, exception);
        }
    }

    readLastActive(domain: string, onReturn: (date: Date) => void) {
        if (domain.length === 0) {
            return;
        }
        try {
            browser.storage.local.get("lastActive").then((content) => {
                const lastActiveMap =
                    content && Object.keys(content).length
                        ? new Map<string, Date>(Object.entries(content.lastActive))
                        : new Map<string, Date>([]);
                onReturn(new Date(lastActiveMap.get(domain) || new Date()));
            });
        } catch (exception) {
            console.error("ERROR: ", exception);
            onReturn(new Date());
        }
    }
}

export default Database;
