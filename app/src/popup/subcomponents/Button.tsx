import React from "react";
import {translate} from "../../engine/i18n";

interface Props {
    label: string;
    onClick: () => void;
}

export const Button = ({label, onClick}: Props): JSX.Element => {
    return (
        <button className="button" itemType="button" onClick={onClick}>
            <div className="button-text">{translate(label)}</div>
        </button>
    );
};

export default Button;
