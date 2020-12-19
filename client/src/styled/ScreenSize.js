const size = {
 
    mobile: '599px',
    tabletPortrait: '600px',
    tabletLandscape: '900px',
    laptop: '1200px',
    desktop: '1800px'
}


export const device = {
    mobileOnly :  `(max-width: ${size.mobile})`,
    tabletPortraitUp  : `(min-width: ${size.tabletPortrait})`,
    tabletLandscapeUp  : `(min-width: ${size.tabletLandscape})`,
    laptopUp  : `(min-width: ${size.laptop})`,
    desktopUp : `(min-width: ${size.desktop})`,
};



