import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectPageShell from "@/components/projects/ProjectPageShell";
import { findProjectDiagrams } from "@/components/projects/diagrams";
import { findProjectBySlug, projectSlugs, resumeData } from "@/lib/resume/data";

// Static export: only the project pages known at build time exist.
export const dynamicParams = false;

export function generateStaticParams() {
  return projectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  return { title: findProjectBySlug(slug)?.title };
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = findProjectBySlug(slug);
  if (!project) notFound();

  const actions = [
    project.githubUrl && { label: "GitHub Repository", href: project.githubUrl, icon: "github" as const },
    project.liveUrl && { label: "Live Demo", href: project.liveUrl, icon: "external" as const },
  ].filter((a): a is { label: string; href: string; icon: "github" | "external" } => Boolean(a));

  return (
    <ProjectPageShell
      eyebrow="Project"
      title={project.title}
      description={project.description ?? ""}
      meta={[
        project.role && { label: "Role", value: project.role },
        project.period && { label: "Timeline", value: project.period },
        project.location && { label: "Location", value: project.location },
      ].filter((m): m is { label: string; value: string } => Boolean(m))}
      actions={actions}
      techStack={project.techStack}
      highlights={project.achievements}
      diagrams={findProjectDiagrams(slug)}
      footerNote={`${project.title} · ${resumeData.personal.name}`}
    />
  );
}
