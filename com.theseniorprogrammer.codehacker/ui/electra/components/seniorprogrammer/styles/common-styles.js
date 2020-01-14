const senior = {
    'width': '100%',
    'height': '100%',
    'overflow': 'hidden',
    'background': '#18181b',
    'display': 'flex'
}
export {senior}

const leftMenuWidth = '260px';
const leftMenuTopPadding = '0px';
const leftMenuBottomPadding = '0px';
const leftMenuRadius = '1px';
const seniorLeftMenu = {
    'position': 'absolute',
    'top': leftMenuTopPadding,
    'left': leftMenuBottomPadding,
    'width': leftMenuWidth,
    'height': `calc(100% - ${leftMenuTopPadding} - ${leftMenuBottomPadding})`,
    'borderRadius': leftMenuRadius,
    'overflow': 'hidden',
    'background': '#3A97DE'
};
export {seniorLeftMenu, leftMenuWidth}

const contentTopPadding = '0px';
const seniorContent = {
    'position': 'relative',
    'width': `calc(100% - ${leftMenuWidth})`,
    'height': '100%',
    'top': contentTopPadding,
    'left': leftMenuWidth
};
export {seniorContent}

const seniorPageWrapper = {
    position: 'relative',
    left: '10px',
    bottom: '0px',
    width: 'calc(100% - 40px)',
    height: '100%',
    overflowY: 'auto'
};
export {seniorPageWrapper}