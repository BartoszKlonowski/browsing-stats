import React, {useEffect, useState} from "react";
import {getActiveTabDomainFromURL, getHours, getMinutes, getSeconds, getWebsiteIconObject, Icon} from "../Utils";
import browser from "webextension-polyfill";
import Database from "../../engine/Database";
import DurationHeader from "./DurationHeader";
import Button from "./Button";
import DetailsView from "./DetailsView";

const getCurrentTimeForCurrentDomain = (domain: string, onResult: (content: number | Map<string, number>) => void) => {
    const db = new Database();
    db.readTimeSpent(onResult, domain);
};

interface Props {
    setDetailsScreen: (isDetails: boolean) => void;
}

export const ShrinkedView = ({setDetailsScreen}: Props) => {
    const [icon, setIcon] = useState<Icon>(getWebsiteIconObject(""));
    const [timeInSeconds, setTimeInSeconds] = useState(0);
    const [activeDomain, setActiveDomain] = useState("");
    const [detailsScreenWebsite, setDetailsScreenWebsite] = useState<string | null>();

    useEffect(() => {
        browser.tabs
            .query({active: true})
            .then((result) => {
                const domain = getActiveTabDomainFromURL(result[0].url!) || "";
                setIcon(getWebsiteIconObject(domain));
                getCurrentTimeForCurrentDomain(domain, (result) => {
                    setTimeInSeconds(result as number);
                });
                setActiveDomain(domain);
            })
            .catch((error: Error) => {
                console.error(error.message);
            });
    }, []);

    useEffect(() => {
        return () => {
            const db = new Database();
            db.writeTimeSpent(activeDomain, timeInSeconds);
        };
    }, [activeDomain, timeInSeconds]);

    useEffect(() => {
        const currentTimer = setInterval(() => {
            setTimeInSeconds(timeInSeconds + 1);
        }, 1000);

        return () => clearInterval(currentTimer);
    });

    return (
        <>
            {!detailsScreenWebsite ? <DurationHeader /> : null}
            {detailsScreenWebsite ? (
                <DetailsView
                    website={detailsScreenWebsite}
                    onBackButtonClick={() => {
                        setDetailsScreenWebsite(null);
                        setDetailsScreen(false);
                    }}
                />
            ) : (
                <div className="shrinked-view-container">
                    <div className="shrinked-view-icon-container">
                        <img className="shrinked-view-icon" width={icon.size} height={icon.size} src={icon.src} />
                    </div>
                    <div className="expanded-view-domain-container">
                        <div className="shrinked-view-domain-text">{activeDomain}</div>
                    </div>
                    <div className="shrinked-view-time-spent-text-container">
                        <div className="shrinked-view-time-spent-text">
                            {getHours(timeInSeconds)}:{getMinutes(timeInSeconds)}:{getSeconds(timeInSeconds)}
                        </div>
                    </div>
                    <Button
                        label="details-button-label"
                        onClick={() => {
                            setDetailsScreenWebsite(activeDomain);
                            setDetailsScreen(true);
                        }}
                    />
                </div>
            )}
        </>
    );
};

export default ShrinkedView;
