const headerTopPadding = '40px';
const headerLeftPadding = '20px';
const headerRightPadding = '20px';
const headerHeight = '170px';
const headerRadius = '7px';
const topicsPageHeader = {
    position: 'relative',
    width: `calc(100% - ${headerLeftPadding} - ${headerRightPadding})`,
    height: headerHeight,
    top: headerTopPadding,
    left: headerLeftPadding,
    color: 'aliceblue',
    background: '#282831',
    borderRadius: headerRadius
};
export {topicsPageHeader}

const topicsPageContent = {
    position: 'relative',
    top: headerTopPadding,
    left: headerLeftPadding,
    width: `calc(100% - ${headerLeftPadding} - ${headerRightPadding})`
};
export {topicsPageContent}

const pathIcon = {
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
export {pathIcon}

const pathLink = {
    fontSize: '24px',
    fontStyle: 'normal',
    color: 'aliceblue',
    textDecoration: 'none'
};
export {pathLink}
