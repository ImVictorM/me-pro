"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import Image from "next/image";
import type { ProjectData } from "@/data/projects";
import type { StaticImageData } from "next/image";
import { ComponentProps } from "react";
import { DictionaryProjectDetails } from "@/app/[lang]/dictionaries";
import { buttonVariants } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

type ProjectCardContent = {
  title: string;
  description: string;
  role: string;
  subject: string;
};

type ProjectDialogContent = ProjectCardContent & {
  context: string;
  approach: string;
  result: string;
};

type ProjectCardProps = ComponentProps<typeof Card> &
  ProjectCardContent & {
    cover: StaticImageData;
  };

export type ProjectDialogCardProps = {
  project: ProjectData & {
    content: ProjectDialogContent;
  };
  dictionary: DictionaryProjectDetails;
};

function ProjectCard({
  title,
  cover,
  description,
  subject,
  ...props
}: ProjectCardProps) {
  return (
    <Card
      {...props}
      className="h-full border border-border relative mx-auto w-full pt-0 cursor-pointer"
    >
      <div className="relative isolate aspect-video overflow-hidden">
        <Image
          src={cover}
          alt={title}
          className="size-full object-cover contrast-90 grayscale brightness-[0.75] transition-all duration-300 group-hover:scale-[1.08] group-hover:grayscale-0 group-hover:brightness-100"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-primary/30 mix-blend-color transition-all duration-300 group-hover:opacity-0"
        />
      </div>

      <CardHeader className="flex flex-col gap-2">
        <div className="flex flex-col">
          <CardTitle>{title}</CardTitle>

          <CardDescription>{description}</CardDescription>
        </div>

        <CardAction className="flex flex-row gap-2">
          <Badge variant="secondary">{subject}</Badge>
        </CardAction>
      </CardHeader>
    </Card>
  );
}

export default function ProjectDialogCard({
  project: {
    cover,
    content,
    images,
    technologies,
    devYear,
    links,
    inDevelopment,
  },
  dictionary,
}: ProjectDialogCardProps) {
  return (
    <Dialog>
      <DialogTrigger
        nativeButton={false}
        render={
          <ProjectCard
            cover={cover}
            title={content.title}
            role={content.role}
            description={content.description}
            subject={content.subject}
            aria-label={`View details about ${content.title}`}
          />
        }
      />

      <DialogContent className="max-h-[90dvh] overflow-y-auto scrollbar-none sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold dash mb-4">
            {content.title}
          </DialogTitle>

          <DialogDescription className="text-base leading-relaxed text-muted-foreground">
            {content.description}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            {cover && (
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src={cover}
                  alt={`${content.title} project preview`}
                  className="size-full object-cover"
                />
              </div>
            )}

            <p className="text-sm text-muted-foreground">
              <span>{content.subject}</span>, <span>{content.role}</span> -{" "}
              {devYear && <span>{devYear}</span>}
              {inDevelopment && <span>{dictionary.inDevelopment}</span>}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h3 className="text-xs font-medium uppercase tracking-wider">
                {dictionary.context}
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {content.context}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-xs font-medium uppercase tracking-wider">
                {dictionary.approach}
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {content.approach}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-xs font-medium uppercase tracking-wider">
                {dictionary.result}
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {content.result}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {technologies.map((technology) => (
              <Badge key={technology} variant="secondary">
                {technology}
              </Badge>
            ))}
          </div>

          {links && (
            <div className="flex flex-row gap-3">
              {links.demo && (
                <a
                  className={buttonVariants({ variant: "default", size: "lg" })}
                >
                  Visit website {<ArrowUpRight />}
                </a>
              )}
              {links.source && (
                <a
                  className={buttonVariants({
                    variant: "secondary",
                    size: "lg",
                  })}
                >
                  GitHub {<ArrowUpRight />}
                </a>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
