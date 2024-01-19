<p align="center">
    <h1 align="center">
        <img align="center" src="./app/icons/mainIcon.png" width="100px" height="100px"/>
        Browsing Stats
    </h1>
</p>
<p align="center">
    Keep the track of all stats regarding your time spent on a website
</p>
<p align="center">
    <a href="https://github.com/BartoszKlonowski/browsing-stats/blob/main/LICENSE">
        <img src="https://img.shields.io/github/license/BartoszKlonowski/browsing-stats?style=plastic" alt="Browsing Stats is released under the GNU GPL v3 license." />
    </a>
    <a href="https://github.com/BartoszKlonowski/browsing-stats/actions/workflows/BrowsingStats-UT.yml">
        <img src="https://img.shields.io/github/actions/workflow/status/BartoszKlonowski/browsing-stats/BrowsingStats-UT.yml?label=Tests&style=plastic" alt="Unit Tests status" />
    </a>
    <a href="https://github.com/BartoszKlonowski/browsing-stats/actions/workflows/BrowsingStats-CI.yml">
        <img src="https://img.shields.io/github/actions/workflow/status/BartoszKlonowski/browsing-stats/BrowsingStats-CI.yml?label=Extension%20verification&style=plastic" alt="Package verification status" />
    </a>
</p>

The purpose of this web-browser's add-on is to allow user to track and gather statistics the time spent on each website.

**How does it work?**

Once you visit a website (no matter if by switching the tab, or entering a URL in the current tab), the extension catches that moment and summarize the time spent on the website you are leaving.
<br/>Please note, that this extension summarizes and shows the time spent for a website in general, not for a certain webpage.
What it means is that, for example of youtube service - this extension will calculate time spent on youtube in general, not the time spent on separate videos.

**Privacy**

This extension does not sends any data to anywhere, but saves the data locally on your machine so that:
<br/>**your data stays with you**.

---
  
## Installation & Usage ##

This extension can be installed by:
* installing it via the Mozilla add-ons market by clicking the button bellow:<br/><a href="https://addons.mozilla.org/pl/firefox/addon/browsing-stats/"><img src="./.github/resources/get-the-addon.png" alt="" /></a>
* downloading it directly from the [Releases page](https://github.com/BartoszKlonowski/browsing-stats/releases) and install it manually in your browser

After successful installation you will see the extension icon in the upper-right corner of your browser.
Popup that appears contains two views:
| | | |
|:-:|:-|:-:|
| **Basic** | Initial view that displays the overall time spent on the currently active website. | <img width="400" height="auto" src=".github/resources/BrowsingStats-example-ShrinkedView.gif" alt="" /> |
| **Extended** | Available after pressing the "More" button. Contains the list of all visited websites and the overall time spent on each of them.<br/>With possibility to sort them by clicking the button with "Sort:" label.<br/><br/>To open the selected website, click on the it's name. | <img width="400" height="auto" src=".github/resources/BrowsingStats-example-ExpandedView.gif" alt="" /> |
| **Detailed** | Available after pressing the "Details" button. Contains more specific information about the statistics of all visits to the selected website.<br/>Click the "Back" button to go back to the list.| <img width="400" height="auto" src=".github/resources/BrowsingStats-example-DetailsView.gif" alt="" /> |

---


## Contributing ##

If you would like to contribute to the *Browsing Stats* project, you are more than welcome!
<br/>Any contribution is to make the project better and to improve the user's experience.
<br/>So if you'd like to contribute, you can do this in one of the following ways:

* Create an [Issue](https://github.com/BartoszKlonowski/browsing-stats/issues/new) and let the author handle it
<br/>Each issue created in the [Issues](https://github.com/BartoszKlonowski/browsing-stats/issues) section gives a chance of improving the project and make it even more useful.
* Create the [Pull Request](https://github.com/BartoszKlonowski/browsing-stats/compare) with the desired changes (please see further for how to develop this extension).

---

## Development ##

If you plan to implement changes to this extension:

1. Clone your fork of this repository
2. Run `npm install` in the root of this repository to install all the dependencies and tools<br/>Please make sure to have the `npm` installed first.
3. Implement your changes and test them:
<br/>Manually by following [these steps](https://extensionworkshop.com/documentation/develop/debugging/)
<br/>Or automatically by running `npm run test` and `npm run build` in the root of your clone

---

## Thank you! ##

Please share an opinion on the platform's market on how you find this add-on.
