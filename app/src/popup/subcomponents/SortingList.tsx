import React, {useState} from "react";
import {translate} from "../../engine/i18n";
import {Sort} from "../Utils";

interface Props {
    onSelect: (option: Sort) => void;
}

interface OptionProps {
    label: string;
    selected: () => void;
}

interface OptionsListProps {
    options: {value: Sort; label: string}[];
    onSelected: (value: Sort) => void;
    currentValue: Sort;
}

const Option = ({label, selected}: OptionProps) => {
    return (
        <div
            className="sorting-option-tile-container"
            onClick={() => {
                selected();
            }}>
            <div className="sorting-option-tile-label">{label}</div>
        </div>
    );
};

const OptionsList = ({options, onSelected, currentValue}: OptionsListProps) => {
    const [isExpanded, expand] = useState(false);
    const listToRender = options.filter((option) => option.value !== currentValue);
    return (
        <div className="sorting-options-list-container">
            <Option key={"current-option"} label={translate(currentValue)} selected={() => expand(!isExpanded)} />
            {isExpanded
                ? listToRender.map((option) => {
                      return (
                          <Option
                              key={`option-${option.value}`}
                              label={option.label}
                              selected={() => {
                                  onSelected(option.value);
                                  expand(false);
                              }}
                          />
                      );
                  })
                : null}
        </div>
    );
};

const SortingList = ({onSelect}: Props) => {
    const [currentOption, setCurrentOption] = useState(Sort.None);
    const [isExpanded, setExpand] = useState(false);
    const options = [
        {value: Sort.None, label: translate(Sort.None)},
        {value: Sort.NameAscending, label: translate(Sort.NameAscending)},
        {value: Sort.NameDescending, label: translate(Sort.NameDescending)},
        {value: Sort.TimeAscending, label: translate(Sort.TimeAscending)},
        {value: Sort.TimeDescending, label: translate(Sort.TimeDescending)},
    ];
    return (
        <div className="sorting-container">
            <div className="sorting-options-label">{`${translate("sort-label")}: `}</div>
            <OptionsList
                options={options}
                onSelected={(value) => {
                    setCurrentOption(value);
                    onSelect(value);
                    setExpand(!isExpanded);
                }}
                currentValue={currentOption}
            />
        </div>
    );
};

export default SortingList;
