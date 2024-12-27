import { Component, Inject } from '@angular/core';
import { NavigationEnd, ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'yassh';

  showText: boolean = false; // Flag to control the visibility of all icon texts

  constructor(
    private router: Router,
    private aroute: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.setupNavbarHover();
  }

  reload(): void {
    this.document.location.reload();
  }

  isRouteActive(route: string): boolean {
    this.showText = true;
    return this.router.isActive(route, true);
  }

  private setupNavbarHover(): void {
    const nav = this.document.querySelector("#colorlib-aside:hover") as HTMLElement;

    if (nav) {
      nav.addEventListener("mouseenter", () => {
        nav.classList.add("expanded");
      });

      nav.addEventListener("mousemove", (event: MouseEvent) => {
        const rect = nav.getBoundingClientRect();
        const offsetX = event.clientX - rect.left; // Mouse X position relative to .nav
        const width = rect.width;

        // If the mouse leaves the first 20% of the width
        if (offsetX > width * 0.2) {
          nav.classList.remove("expanded");
        }
      });

      nav.addEventListener("mouseleave", () => {
        nav.classList.remove("expanded");
      });
    }
  }
}
