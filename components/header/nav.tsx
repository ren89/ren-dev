export function Nav() {
  return (
    <nav className="nav hidden lg:block">
      <ul className="mt-16 w-max">
        <MenuItem item={"About"} href="#about" />
        <MenuItem item={"Experience"} href="#experience" />
        <MenuItem item={"Projects"} href="#projects" />
      </ul>
    </nav>
  );
}

function MenuItem({ item, href }: { item: string; href: string }) {
  return (
    <li>
      <a className="group flex items-center py-3 active" href={href}>
        <span className="nav-indicator mr-4 h-px w-8 bg-[#526283] transition-all group-hover:w-16 group-hover:bg-[#e0e3ea] group-focus-visible:w-16 group-focus-visible:bg-[#e0e3ea] motion-reduce:transition-none"></span>
        <span className="nav-text text-xs font-bold uppercase tracking-widest text-[#526283] group-hover:text-[#e0e3ea] group-focus-visible:text-[#e0e3ea]">
          {item}
        </span>
      </a>
    </li>
  );
}
