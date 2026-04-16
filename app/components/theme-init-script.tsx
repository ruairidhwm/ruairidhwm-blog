import { THEME_STORAGE_KEY } from 'app/lib/theme'

const boot = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var t=localStorage.getItem(k);var r=document.documentElement;if(t==="dark")r.classList.add("dark");else if(t==="system"){if(window.matchMedia("(prefers-color-scheme: dark)").matches)r.classList.add("dark");else r.classList.remove("dark");}else{r.classList.remove("dark");}}catch(e){}})();`

export function ThemeInitScript() {
  return (
    <script
      id="theme-init"
      dangerouslySetInnerHTML={{ __html: boot }}
    />
  )
}
