import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup } from "@/components/ui/StaggerGroup";
import { productList, routes } from "@/lib/constants";
import { showcaseInfoChips } from "@/lib/solutions-content";
import { SolutionShowcaseCard } from "./SolutionShowcaseCard";

export function ProductsOverview() {
  return (
    <section
      id="solutions"
      className="scroll-mt-32 bg-white/40 pt-10 pb-10 backdrop-blur-sm sm:pt-10 sm:pb-12 lg:pt-10 lg:pb-14"
    >
      <Container className="flex flex-col gap-8 sm:gap-9">
        <SectionHeading
          eyebrow="Our Solutions"
          title="One Platform. Three Healthcare Solutions."
          description="Choose the healthcare management system you need — or connect multiple Nalam solutions into one unified healthcare platform."
          tone="dark"
        />

        <StaggerGroup
          as="div"
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
          staggerDelay={0.12}
        >
          {productList.map((product, index) => (
            <SolutionShowcaseCard
              key={product.id}
              product={product}
              chips={showcaseInfoChips[product.id]}
              priority={index === 0}
            />
          ))}
        </StaggerGroup>

        <div className="flex justify-center">
          <Button href={routes.solutions} size="lg" variant="secondary" className="w-full sm:w-auto">
            Explore All Healthcare Software Solutions
          </Button>
        </div>
      </Container>
    </section>
  );
}
