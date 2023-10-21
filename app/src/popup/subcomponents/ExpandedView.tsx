import React, {useState} from "react";
import {getHours, getMinutes, getSeconds, getWebsiteIconObject} from "../Utils";
// @ts-ignore
import Database from "../../engine/Database";

export const ExpandedView = () => {
    const renderTimeSpentList = () => {
        const db = new Database();
        const [timeSpentTilesData, setTimeSpentTilesData] = useState(new Map<string, number>([]));
        db.readTimeSpent((data: Map<string, number>) => {
            setTimeSpentTilesData(data);
        });
        return (
            <ul className="expanded-view-list">
                {[...timeSpentTilesData].map(([domain, timeSpentInSeconds]) => (
                    <li key={`timeSpentTile-${domain}`}>{renderTimeSpentTile(domain, timeSpentInSeconds)}</li>
                ))}
            </ul>
        );
    };

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
            </div>
        );
    };

    return <div className="expanded-view-list-container">{renderTimeSpentList()}</div>;
};

export default ExpandedView;
