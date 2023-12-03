import browser from "webextension-polyfill";
import {calculateTimeSpentForDomain, getActiveTabDomainFromURL, storeVisitsNumber} from "../popup/Utils";
import {storeTimeSpentSummary} from "../popup/Utils";
import Database from "./Database";

browser.tabs.onActivated.addListener((activeInfo) => {
    browser.tabs.get(activeInfo.tabId).then((tab) => {
        storeTimeSpentSummary(getActiveTabDomainFromURL(tab?.url || "") || "");
    });
});

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status == "complete") {
        const activeDomain = getActiveTabDomainFromURL(tab.url || "");
        storeVisitsNumber(activeDomain);
        storeTimeSpentSummary(activeDomain || "");
    }
});

browser.windows.onFocusChanged.addListener((id) => {
    const windowInactiveID = -1;
    const db = new Database();
    if (id === windowInactiveID) {
        db.readPreviousDomain((domain: string) => {
            calculateTimeSpentForDomain(domain);
            db.writePreviousDomain("");
        });
    } else {
        browser.tabs.query({active: true}).then((tab) => {
            const newFocusedDomain = getActiveTabDomainFromURL(tab[0].url || "");
            db.writeLastActive(newFocusedDomain || "", new Date());
            db.writePreviousDomain(newFocusedDomain || "");
        });
    }
});
