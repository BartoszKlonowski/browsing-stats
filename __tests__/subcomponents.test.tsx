import React from "react";
import TestRenderer, {act, ReactTestInstance, ReactTestRenderer} from "react-test-renderer";
import {fireEvent, render, screen} from "@testing-library/react";
import ShrinkedView from "../app/src/popup/subcomponents/ShrinkedView";
import ExpandedView from "../app/src/popup/subcomponents/ExpandedView";
import Button from "../app/src/popup/subcomponents/Button";
import SortingList from "../app/src/popup/subcomponents/SortingList";
import DetailsView from "../app/src/popup/subcomponents/DetailsView";
import {Sort} from "../app/src/popup/Utils";
import {translate} from "../app/src/engine/i18n";

function renderElement(element: JSX.Element): ReactTestRenderer {
    const component = TestRenderer.create(element);
    return component;
}

async function renderElementAsObject(element: JSX.Element): Promise<ReactTestInstance> {
    let component;
    await act(async () => {
        component = TestRenderer.create(element);
    });
    return JSON.parse(JSON.stringify(component.toJSON()));
}

function getChild(renderedObject: ReactTestInstance, childIndex: number): ReactTestInstance {
    const child = renderedObject.children[childIndex] as ReactTestInstance;
    return child;
}

beforeEach(() => {
    global.browser.i18n.getUILanguage = () => "EN";
});

describe("ShrinkedView", () => {
    it("renders correctly according to snapshot", () => {
        const shrinkedView = renderElement(<ShrinkedView />);
        expect(shrinkedView.toJSON()).toMatchSnapshot();
    });

    it("contains the duration header at the beginning of DOM", async () => {
        global.browser.tabs.query = () => {
            return new Promise((resolve) => {
                resolve([{url: ""}]);
            });
        };
        const shrinkedView = await renderElementAsObject(<ShrinkedView />);
        expect(shrinkedView[0].props.className).toBe("duration-header");
    });

    it("renders icon as image with default src when missing icon on website", async () => {
        global.browser.tabs.query = () => {
            return new Promise((resolve) => {
                resolve([{url: ""}]);
            });
        };
        const shrinkedView = await renderElementAsObject(<ShrinkedView />);
        const img = getChild(getChild(shrinkedView[1], 0), 0);
        expect(img).toBeDefined();
        expect(img.type).toBe("img");
        expect(img.props.src).toContain("../resources/missing-website-favicon.png");
    });

    it("renders icon as image with proper src when icon is available on website", async () => {
        global.browser.tabs.query = () => {
            return new Promise((resolve) => {
                resolve([{url: "proper.existing.icon.url"}]);
            });
        };
        const shrinkedView = await renderElementAsObject(<ShrinkedView />);
        const img = getChild(getChild(shrinkedView[1], 0), 0);
        expect(img).toBeDefined();
        expect(img.type).toBe("img");
        expect(img.props.src).toContain("https://icons.duckduckgo.com/ip3/proper.existing.icon.url.ico");
    });

    it("displays 0 time spent for incorrect domain", async () => {
        global.browser.tabs.query = () => {
            return new Promise((resolve) => {
                resolve([{url: ""}]);
            });
        };
        const shrinkedView = await renderElementAsObject(<ShrinkedView />);
        const timeSpentText = getChild(getChild(shrinkedView[1], 1), 0);
        expect(timeSpentText).toBeDefined();
        expect(`${getChild(timeSpentText, 0)}:${getChild(timeSpentText, 2)}:${getChild(timeSpentText, 4)}`).toBe(
            "0:00:00"
        );
    });
});

describe("ExpandedView", () => {
    it("renders correctly according to snapshot", () => {
        const expandedView = renderElement(
            <ExpandedView
                setSortingOrder={(order) => {
                    order;
                }}
                sorted={Sort.None}
            />
        );
        expect(expandedView.toJSON()).toMatchSnapshot();
    });

    it("contains the duration header at the beginning of DOM", async () => {
        global._localStorage.getItem = (key: string) => {
            return key ? `{}` : null;
        };
        const expandedView = await renderElementAsObject(
            <ExpandedView
                setSortingOrder={(order) => {
                    order;
                }}
                sorted={Sort.None}
            />
        );
        expect(expandedView[0].props.className).toBe("duration-header");
    });

    it("contains an empty list when no data in timeSpent storage", async () => {
        global._localStorage.getItem = (key: string) => {
            return key ? `{}` : null;
        };
        const expandedView = await renderElementAsObject(
            <ExpandedView
                setSortingOrder={(order) => {
                    order;
                }}
                sorted={Sort.None}
            />
        );
        expect(expandedView[1]).toBeDefined();
        expect(getChild(expandedView[1], 0).children).toBeNull();
    });

    it("contains a list items of proper type and layout", async () => {
        global._localStorage.getItem = (key: string) => {
            return `[["${key}", 20], ["fake", 20]]`;
        };
        const expandedView = await renderElementAsObject(
            <ExpandedView
                setSortingOrder={(order) => {
                    order;
                }}
                sorted={Sort.None}
            />
        );
        const mainList = getChild(expandedView[1], 0);
        expect(mainList.type).toBe("ul");
        expect(getChild(mainList, 0).type).toBe("li");
        expect(getChild(mainList, 1).type).toBe("li");
    });

    it("contains a list with proper number of items", async () => {
        global._localStorage.getItem = (key: string) => {
            return `[["first item", 10],["second item", 20],["${key}", 30]]`;
        };
        const expandedView = await renderElementAsObject(
            <ExpandedView
                sorted={Sort.None} setDetailsScreenWebsite={jest.fn()}            />
        );
        console.log(expandedView)
        expect(getChild(expandedView[1], 0).children.length).toBe(3);
    });
});

describe("Button", () => {
    it("renders correctly regarding the snapshot", () => {
        const button = renderElement(
            <Button
                label={"test"}
                onClick={() => {
                    "unused";
                }}
            />
        );
        expect(button).toMatchSnapshot();
    });

    it("is created by a button type", async () => {
        const button = await renderElementAsObject(
            <Button
                label={"test"}
                onClick={() => {
                    "unused";
                }}
            />
        );
        expect(button.type).toBe("button");
    });

    it("executes the onClick function when clicked", async () => {
        const mockedOnClick = jest.fn();
        render(<Button label={"test"} onClick={mockedOnClick} />);
        const button = screen.getByRole("button");
        fireEvent.click(button);
        expect(mockedOnClick).toBeCalled();
    });
});

describe("Sorting", () => {
    it("renders correctly according to snapshot", () => {
        const sortList = renderElement(
            <SortingList
                onSelect={(_: Sort): void => {
                    _;
                }}
            />
        );
        expect(sortList).toMatchSnapshot();
    });

    it("initially renders with the option 'None'", async () => {
        const sortList = await renderElementAsObject(
            <SortingList
                onSelect={(_: Sort): void => {
                    _;
                }}
            />
        );
        expect(getChild(getChild(getChild(getChild(sortList, 1), 0), 0), 0)).toBe("None");
    });

    it("does not render the list when not clicked", async () => {
        const sortList = await renderElementAsObject(
            <SortingList
                onSelect={(_: Sort): void => {
                    _;
                }}
            />
        );
        expect(getChild(sortList, 2)).toBeUndefined();
    });

    it("renders the complete list when clicked", async () => {
        const sortList = await renderElementAsObject(
            <SortingList
                onSelect={(_: Sort): void => {
                    _;
                }}
            />
        );
        expect(getChild(sortList, 1)).toBeDefined();
    });
});

describe("DetailsView", () => {
    it("renders correctly according to snapshot", () => {
        global._localStorage.getItem = (key: string) => {
            return `[["test", "invalid-mocked-date"],["${key}", "${new Date(0)}"]]`;
        };
        const detailsView = renderElement(<DetailsView website={"test"} onBackButtonClick={() => undefined} />);
        expect(detailsView).toMatchSnapshot();
    });

    it("contains the back button for back navigation", async () => {
        const detailsView = await renderElementAsObject(
            <DetailsView website="test" onBackButtonClick={() => undefined} />
        );
        expect(getChild(detailsView, 2).props.className).toBe("button");
    });

    it("calls the onBackButton handler when back button is clicked", async () => {
        const mockedBackButtonHandler = jest.fn();
        render(<DetailsView website="test" onBackButtonClick={mockedBackButtonHandler} />);
        const backButton = screen.getByText("Go back");
        fireEvent.click(backButton);
        expect(mockedBackButtonHandler).toBeCalled();
    });

    it("contains the last visited with proper label and value matching storage state", async () => {
        const currentDate = new Date();
        global._localStorage.setItem = jest.fn();
        global._localStorage.getItem = (key: string) => {
            return `[["${key}", "${currentDate}"],["second.domain", "${currentDate}"]]`;
        };
        render(<DetailsView website="test" onBackButtonClick={() => undefined} />);
        const lastVisitedLabel = await screen.findByText(`${translate("details-view-last-visited-label")}:`);
        const lastVisitedValue = await screen.findByText(currentDate.toLocaleString());
        expect(lastVisitedLabel?.textContent).toBe(`${translate("details-view-last-visited-label")}:`);
        expect(lastVisitedValue?.textContent).toBe(currentDate.toLocaleString());
    });

    it("contains the time spent summary with proper label and value matching storage state", async () => {
        global._localStorage.setItem = jest.fn();
        global._localStorage.getItem = (key: string) => {
            return `[["${key}", "120"],["test", "243"]]`;
        };
        render(<DetailsView website="test" onBackButtonClick={() => undefined} />);
        const timeSpentLabel = await screen.findByText(`${translate("duration-header")}:`);
        const timeSpentValue = await screen.findAllByText("0:04:03");
        expect(timeSpentLabel?.textContent).toBe(`${translate("duration-header")}:`);
        expect(timeSpentValue[0].textContent).toBe("0:04:03");
    });

    it("contains the total number of visits with proper label and value matching storage state", async () => {
        global._localStorage.setItem = jest.fn();
        global._localStorage.getItem = (key: string) => {
            return `[["${key}", "120"],["test", "24"]]`;
        };
        render(<DetailsView website="test" onBackButtonClick={() => undefined} />);
        const totalNumberLabel = await screen.findByText(`${translate("details-view-number-of-visits")}:`);
        const totalNumberValue = await screen.findByText("24");
        expect(totalNumberLabel?.textContent).toBe(`${translate("details-view-number-of-visits")}:`);
        expect(totalNumberValue?.textContent).toBe("24");
    });

    it("contains the average time spent daily on the website with proper values", async () => {
        global._localStorage.setItem = jest.fn();
        global._localStorage.getItem = (key: string) => {
            return `[["${key}", "121"],["test", "245"]]`;
        };
        render(<DetailsView website="test" onBackButtonClick={() => undefined} />);
        const avgTimeLabel = await screen.findByText(`${translate("details-view-average-daily-time")}:`);
        expect(avgTimeLabel).toBeDefined();
    });
});
