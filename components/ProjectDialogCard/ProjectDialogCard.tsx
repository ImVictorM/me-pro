"use client";

import { ComponentProps, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import type { ProjectData } from "@/data/projects";
import { DictionaryProjectDetails } from "@/app/[lang]/dictionaries";

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

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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

type ProjectImageCarouselProps = {
  images: StaticImageData[];
  title: string;
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

      <CardHeader className="flex flex-col gap-2 grow">
        <div className="flex flex-col">
          <CardTitle>{title}</CardTitle>

          <CardDescription>{description}</CardDescription>
        </div>

        <CardAction className="flex flex-row gap-2">
          <Badge variant="secondary">{subject}</Badge>
        </CardAction>

        <p className="w-full mt-auto justify-end flex flex-row items-center text-primary gap-1 text-xs">
          Click to see {<ArrowRight size={14} />}
        </p>
      </CardHeader>
    </Card>
  );
}

function ProjectImageCarousel({ images, title }: ProjectImageCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();

  const [loadedSlides, setLoadedSlides] = useState<Set<number>>(
    () => new Set([0]),
  );

  useEffect(() => {
    if (!api) return;

    const loadVisibleSlides = (carouselApi: CarouselApi) => {
      const visibleSlides = carouselApi?.slidesInView();

      setLoadedSlides((curr) => {
        const next = new Set(curr);

        visibleSlides?.forEach((index) => {
          next.add(index);
        });

        return next;
      });
    };

    loadVisibleSlides(api);

    api.on("slidesInView", loadVisibleSlides);

    return () => {
      api.off("slidesInView", loadVisibleSlides);
    };
  }, [api]);

  if (images.length === 0) return;

  return (
    <Carousel
      setApi={setApi}
      className="w-full"
      opts={{ align: "start", loop: images.length > 1 }}
    >
      <CarouselContent>
        {images.map((img, index) => (
          <CarouselItem key={img.src}>
            <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
              {loadedSlides.has(index) ? (
                <Image
                  src={img}
                  alt={`${title} - screenshot ${index + 1}`}
                  className={`size-full ${images.length > 1 ? "object-contain" : "object-cover"}`}
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="size-full animate-pulse bg-muted"
                />
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {images.length > 1 && (
        <>
          <CarouselPrevious variant="secondary" className="left-3" />{" "}
          <CarouselNext variant="secondary" className="right-3" />
        </>
      )}
    </Carousel>
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
  const [open, setOpen] = useState(false);
  const dialogContentRef = useRef<HTMLDivElement>(null);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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

      <DialogContent
        ref={dialogContentRef}
        initialFocus={dialogContentRef}
        className="max-h-[90dvh] overflow-y-auto scrollbar-none sm:max-w-3xl"
      >
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
            {open && (
              <ProjectImageCarousel
                images={[cover, ...images]}
                title={content.title}
              />
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
                <Button
                  nativeButton={false}
                  size="lg"
                  render={
                    <a
                      href={links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                >
                  Visit website {<ArrowUpRight />}
                </Button>
              )}
              {links.source && (
                <Button
                  size="lg"
                  nativeButton={false}
                  variant="outline"
                  render={
                    <a
                      href={links.source}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                >
                  GitHub {<ArrowUpRight />}
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
