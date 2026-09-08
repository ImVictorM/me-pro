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

type ProjectContent = {
  title: string;
  description: string;
  role: string;
  subject: string;
};

type ProjectCardProps = ComponentProps<typeof Card> &
  ProjectContent & {
    cover: StaticImageData;
  };

export type ProjectDialogCardProps = {
  project: ProjectData & {
    content: ProjectContent;
  };
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
  project: { cover, content, images, technologies, devYear },
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

      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{content.title}</DialogTitle>

          <DialogDescription>{content.description}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6">
          {images[0] && (
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image
                src={images[0]}
                alt={`${content.title} project preview`}
                className="size-full object-cover"
              />
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {technologies.map((technology) => (
              <Badge key={technology} variant="secondary">
                {technology}
              </Badge>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium">Role</p>
              <p className="text-sm text-muted-foreground">{content.role}</p>
            </div>

            {devYear && (
              <div>
                <p className="text-sm font-medium">Year</p>
                <p className="text-sm text-muted-foreground">{devYear}</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
