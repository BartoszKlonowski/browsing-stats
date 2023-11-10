import React from "react";
import TestRenderer, {act, ReactTestInstance, ReactTestRenderer} from "react-test-renderer";
import ShrinkedView from "../app/src/popup/subcomponents/ShrinkedView";
import ExpandedView from "../app/src/popup/subcomponents/ExpandedView";
import ViewChangeButton from "../app/src/popup/subcomponents/ViewChangeButton";
import SortingList from "../app/src/popup/subcomponents/SortingList";
import DetailsView from "../app/src/popup/subcomponents/DetailsView";
import {Sort} from "../app/src/popup/Utils";

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
                setSortingOrder={(order) => {
                    order;
                }}
                sorted={Sort.None}
            />
        );
        expect(getChild(expandedView[1], 0).children.length).toBe(3);
    });
});

describe("ViewChangeButton", () => {
    it("renders correctly regarding the snapshot", () => {
        global.browser.i18n.getUILanguage = () => "EN";
        const button = renderElement(
            <ViewChangeButton
                isExpanded={false}
                onClick={(_: boolean) => {
                    _;
                }}
            />
        );
        expect(button).toMatchSnapshot();
    });

    it("is created by a button type", async () => {
        global.browser.i18n.getUILanguage = () => "EN";
        const button = await renderElementAsObject(
            <ViewChangeButton
                isExpanded={false}
                onClick={(_) => {
                    _;
                }}
            />
        );
        expect(button.type).toBe("button");
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
        global.browser.i18n.getUILanguage = () => "EN";
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
        global.browser.i18n.getUILanguage = () => "EN";
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
        global.browser.i18n.getUILanguage = () => "EN";
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
        const detailsView = renderElement(<DetailsView website={""} />);
        expect(detailsView).toMatchSnapshot();
    });
});
