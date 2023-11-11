import React, {useMemo, useState} from "react";
import Database from "../../engine/Database";
import {translate} from "../../engine/i18n";
import {getHours, getMinutes, getSeconds, getWebsiteIconObject, Sort, sortDataEntries} from "../Utils";

interface Props {
    sorted: Sort;
    onEnterClick: (domain: string) => void;
}

export const TimeSpentList = ({sorted, onEnterClick}: Props) => {
    const db = new Database();
    const [timeSpentTilesData, setTimeSpentTilesData] = useState(new Map<string, number>([]));

    useMemo(
        () =>
            db.readTimeSpent((data: number | Map<string, number>) => {
                setTimeSpentTilesData(data as Map<string, number>);
            }),
        []
    );

    const renderTimeSpentTile = (domain: string, timeSpentInSeconds: number) => {
        const icon = getWebsiteIconObject(domain);
        return (
            <div className="expanded-view-tile-container">
                <div className="expanded-view-icon-container">
                    <img className="expanded-view-icon" width={icon.size} height={icon.size} src={icon.src} />
                </div>
                <div className="expanded-view-domain-container">
                    <div
                        className="expanded-view-domain-text"
                        onClick={() => open(`https://www.${domain}/`, Window.name)}>
                        {domain}
                    </div>
                </div>
                <div className="expanded-view-time-spent-text-container">
                    <div className="expanded-view-time-spent-text">
                        {getHours(timeSpentInSeconds)}:{getMinutes(timeSpentInSeconds)}:{getSeconds(timeSpentInSeconds)}
                    </div>
                </div>
                <div
                    className="expanded-view-tile-details-navigation-button"
                    onClick={() => {
                        onEnterClick(domain);
                    }}>
                    {translate("details-button-label")}
                </div>
            </div>
        );
    };

    const data = sortDataEntries(timeSpentTilesData, sorted);
    return (
        <ul className="expanded-view-list">
            {[...data].map(([domain, timeSpentInSeconds]) => (
                <li key={`timeSpentTile-${domain}`}>{renderTimeSpentTile(domain, timeSpentInSeconds)}</li>
            ))}
        </ul>
    );
};

export default TimeSpentList;
