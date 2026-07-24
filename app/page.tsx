import { myProjects } from "@/data/data";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 py-8 text-slate-200">
      {myProjects.map((project) => (
        <div key={project.name} className="border-b border-slate-700 pb-8">
          <h2 className="text-xl font-semibold">
            {project.href ? (
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                {project.name}
              </a>
            ) : (
              project.name
            )}
          </h2>
          <p className="mt-2 text-slate-400">{project.description}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
