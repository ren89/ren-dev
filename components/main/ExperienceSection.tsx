"use client";

import { Experience, Company, CompanyEnum } from "@/lib/types";
import { ChipGroup } from "./chipGroup";
import { Section } from "./section";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ExperienceSection({
  experiences,
}: {
  experiences: Experience[];
}) {
  const [selectedCompany, setSelectedCompany] = useState<Company>(
    experiences[0].company
  );

  const handleButtonClick = (company: Company) => {
    if (selectedCompany !== company) {
      setSelectedCompany(company);
    }
  };

  const selectedExperience = experiences.find(
    (exp) => exp.company === selectedCompany
  );

  return (
    <Section title="Experience">
      <div className="flex flex-col space-x-4 sm:flex-row space-y-4 sm:space-y-0">
        <div className="flex flex-row sm:flex-col w-full">
          {Object.keys(CompanyEnum).map((company) => (
            <motion.button
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              key={company}
              onClick={() => handleButtonClick(company as Company)}
              className={`text-left p-2 border-l-0 border-t-2 sm:border-t-0 sm:border-l-2 ${
                selectedCompany === company
                  ? "border-teal-300 bg-slate-800 text-teal-300"
                  : "border-slate-800 bg-slate-900"
              }`}
            >
              {company}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="popLayout">
          {selectedExperience && (
            <motion.div
              key={selectedExperience.company}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-full">
                <motion.h3
                  initial={{ opacity: 0, x: -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 1 }}
                  className="font-medium leading-snug"
                >
                  <span className="inline-flex items-baseline font-medium text-white leading-tight group/link text-base">
                    {selectedExperience.title} • {selectedExperience.company}
                  </span>
                </motion.h3>
                <motion.h4
                  initial={{ opacity: 0, x: -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 1 }}
                  className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-[#6c7a97] sm:col-span-2"
                >
                  {selectedExperience.date}
                </motion.h4>
                <motion.p
                  initial={{ opacity: 0, x: -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 1 }}
                  className="mt-2 text-sm leading-normal"
                >
                  {selectedExperience.description}
                </motion.p>
                <ChipGroup values={selectedExperience.technologies} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
}
