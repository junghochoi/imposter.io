import { createGlobalStyle } from 'styled-components';
import BitMapFontWoff from './bitmapfont.woff'
import BitMapFontWoff2 from './bitmapfont.woff2';

export default createGlobalStyle`
    @font-face {
        font-family: 'BitMap';
        src: url(${BitMapFontWoff}) format('woff'),
        url(${BitMapFontWoff2}) format('woff2');
        font-weight: 300;
        font-style: normal;
    }
`;