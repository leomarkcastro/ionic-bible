/*
// Use matchMedia to check the user preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

toggleDarkTheme(prefersDark.matches);

// Listen for changes to the prefers-color-scheme media query
prefersDark.addEventListener("change", (mediaQuery) => toggleDarkTheme(mediaQuery.matches));

*/

const _themeList = {
    "default" : "Default",
    "summer": "Winter",
    "fall": "Fall",
    "cafe": "Spring",
}

const _fontList = {
    "default" : "Default",
    "magic" : "Storybook",
    "round" : "Roundtext",
    "chalk" : "Chalk",
    "print" : "Print",
    "monospace" : "Monospace",
    "cursive" : "Cursive",
    "monospace" : "Monospace",
    "serif" : "Serif",
}

export const themeList = {
    ..._themeList
}

export const fontList = {
    ..._fontList
}

export function isDarkModeDefault(){
    
    return window.matchMedia('(prefers-color-scheme: dark)')

}

export function callDarkMode(){
    
    return true

}


export function toggleDarkMode(shouldAdd){
    
    document.body.classList.toggle('dark', shouldAdd);
    return true

}

export function toggleThemeMode(whatAdd, shouldAdd){
    
    for(let i in _themeList){
        document.body.classList.toggle(i, false);
    }
    document.body.classList.toggle(whatAdd, shouldAdd);
    return true

}

export function toggleFontMode(whatAdd, shouldAdd){
    
    for(let i in _fontList){
        document.body.classList.toggle(`font_${i}`, false);
    }
    document.body.classList.toggle(`font_${whatAdd}`, shouldAdd);
    return true

}

export function setCSSProperty(whatProp, value){
    
    document.body.style.setProperty(whatProp, `${value}`);
    return true

}