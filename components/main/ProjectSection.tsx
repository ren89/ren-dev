"use client";

import { Project } from "@/lib/types";
import { ChipGroup } from "./chipGroup";
import { Section } from "./section";
import Image from "next/image";
import { Alert } from "../shared/alert";

import { motion } from "framer-motion";
import { SlideShow } from "../shared/SlideShow";
import { SquareArrowOutUpRight } from "lucide-react";

export function ProjectSection({ projects }: { projects: Project[] }) {
  return (
    <Section title="Projects">
      <ol className="group/list">
        {projects.map((project) => (
          <li className="mb-12" key={project.name}>
            <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
              <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>

              <motion.header
                initial={{ opacity: 0, x: -70 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-[#6c7a97] sm:col-span-2"
              >
                {project.image && (
                  <Alert
                    description={
                      <SlideShow
                        images={
                          project.images ?? [
                            { image: project.image, name: "Preview" },
                          ]
                        }
                      />
                    }
                    title={project.name}
                    showCloseButton={true}
                  >
                    <Image
                      src={project.image}
                      alt={project.name}
                      width={200}
                      height={70}
                      quality={100}
                      className="rounded border-2 border-slate-200/10 transition-transform duration-300 ease-in-out transform group-hover:scale-110 sm:order-1 sm:col-span-2 sm:translate-y-1 w-full object-fill"
                    />
                  </Alert>
                )}
              </motion.header>
              <div className="z-10 sm:col-span-6">
                <motion.h3
                  initial={{ opacity: 0, x: -70 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                  className="font-medium leading-snug"
                >
                  <span className="inline-flex items-baseline font-medium text-white leading-tight group/link text-base w-full justify-between mt-8 sm:mt-0">
                    {project.name}
                    {project.href ? (
                      <a
                        href={project.href}
                        target="_blank"
                        className="hover:text-teal-300"
                      >
                        <SquareArrowOutUpRight size={24} />
                      </a>
                    ) : null}
                  </span>
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, x: -70 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                  className="mt-2 text-sm leading-normal"
                >
                  {project.description}
                </motion.p>
                <ChipGroup values={project.technologies} />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
