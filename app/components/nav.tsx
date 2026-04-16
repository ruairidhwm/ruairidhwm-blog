import { navWhisper } from "app/lib/whimsy";
import { ThemeToggle } from "./theme-toggle";
import { NavPrimary, type NavItem } from "./nav-primary";

const routes: Omit<NavItem, "whisper">[] = [
  { path: "/", name: "home" },
  { path: "/blog", name: "blog" },
];

export function Navbar() {
  const items: NavItem[] = routes.map((route) => ({
    ...route,
    whisper: navWhisper(route.path),
  }));

  return (
    <aside className="mb-16 tracking-tight">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <div className="min-w-0 lg:sticky lg:top-20">
          <NavPrimary items={items} />
        </div>
        <ThemeToggle />
      </div>
    </aside>
  );
}
