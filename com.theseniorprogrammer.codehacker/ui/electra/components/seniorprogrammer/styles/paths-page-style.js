import {topicsPageContent, topicIcon, topicLink} from './topics-page-style';

const headerTopPadding = '40px';
const headerLeftPadding = '20px';
const headerRightPadding = '20px';
const headerHeight = '170px';
const headerRadius = '7px';
const pathsPageHeader = {
    position: 'relative',
    width: `calc(100% - ${headerLeftPadding} - ${headerRightPadding})`,
    height: headerHeight,
    top: headerTopPadding,
    left: headerLeftPadding,
    color: 'aliceblue',
    background: '#282831',
    borderRadius: headerRadius
};
export {pathsPageHeader}

/*
const pathsPageContent = {
    position: 'relative',
    top: headerTopPadding,
    left: headerLeftPadding,
    width: `calc(100% - ${headerLeftPadding} - ${headerRightPadding})`
};
*/
const pathsPageContent = topicsPageContent;
export {pathsPageContent}

/*
const pathsIcon = {
    position: 'relative',
    width: '100%',
    height: '120px',
    margin: '20px 0px 20px 0px',
    background: '#262525',
    color: 'aliceblue',
    border: '1px',
    borderRadius: '8px',
    borderStyle: 'solid',
    borderColor: '#FF00A6'
};
*/
const pathsIcon = topicIcon;
export {pathsIcon}

/*
const pathsLink = {
    fontSize: '24px',
    fontStyle: 'normal',
    color: 'aliceblue',
    textDecoration: 'none'
};
*/
const pathsLink = topicLink;
export {pathsLink}
