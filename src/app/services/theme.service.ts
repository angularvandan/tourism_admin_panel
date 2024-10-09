import { DOCUMENT, isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ThemeService {

    constructor(@Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) private platformId: object) { }
    theme: any
    getStoredTheme() {
        if (isPlatformBrowser(this.platformId)) {
            this.theme = localStorage.getItem('theme') || 'lara-light-blue'
        }
        return this.theme
    }
    changeTheme(theme: string) {
        const themeLink = this.document.getElementById('app-theme') as HTMLLinkElement
        if (themeLink) {
            themeLink.href = theme + '.css'
            if (isPlatformBrowser(this.platformId)) {
                localStorage.setItem('theme', theme);
            }
        }
    }

}