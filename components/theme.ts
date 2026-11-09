export const THEME_KEY = 'cv-theme';

// inlined in <head>: applies a saved theme before first paint, so it doesn't flash
export const THEME_INIT = `try{var t=localStorage.getItem('${THEME_KEY}');if(t==='dark'||t==='light')document.documentElement.dataset.theme=t}catch(e){}`;
