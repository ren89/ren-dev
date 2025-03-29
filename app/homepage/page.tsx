import { Content } from "@/components/header/content";
import { Nav } from "@/components/header/nav";
import { Socials } from "@/components/header/socials";
import { AboutSection } from "@/components/main/AboutSection";
import { ExperienceSection } from "@/components/main/ExperienceSection";
import { ProjectSection } from "@/components/main/ProjectSection";
import { myExperiences, myProjects } from "@/data/data";
import { useUser } from "@/hooks/useUser";
import { logout } from "../auth/actions";

export default async function HomePage() {
  const user = await useUser();
  return (
    <div className="lg:flex lg:justify-between lg:gap-4">
      {user && (
        <form className="w-full bg-teal-400/10 absolute left-0 p-1 text-center">
          <button className="cursor-pointer" type="submit" formAction={logout}>
            <p className="text-teal-300">
              logged in as <b>{user?.email}</b>
            </p>
            <p className="text-teal-300">click to logout</p>
          </button>
        </form>
      )}

      <header className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
        <div>
          <Content />
          <Nav />
        </div>
        <Socials />
      </header>
      <main className="pt-24 lg:w-1/2 lg:py-24">
        <AboutSection />
        <ExperienceSection experiences={myExperiences} />
        <ProjectSection projects={myProjects} />
      </main>
    </div>
  );
}
