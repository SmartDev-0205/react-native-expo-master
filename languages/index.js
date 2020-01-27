import LocalizedStrings from 'react-localization';
import en from './en';
import cn from './cn';
 
let strings = new LocalizedStrings({
 en: {...en},
 cn: {...cn}
});

export default strings;