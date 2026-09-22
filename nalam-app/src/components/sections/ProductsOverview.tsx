import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup } from "@/components/ui/StaggerGroup";
import { productList } from "@/lib/constants";
import { ProductCard } from "./ProductCard";

export function ProductsOverview() {
  return (
    <section
      id="solutions"
      className="scroll-mt-32 bg-white/40 pt-14 pb-14 backdrop-blur-sm sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-20"
    >
      <Container className="flex flex-col gap-9">
        <SectionHeading
          eyebrow="Our Solutions"
          title="Healthcare Software Built Around Your Workflow"
          description="Choose the system you need — or connect multiple Nalam solutions into one unified healthcare platform."
          tone="dark"
        />

        <StaggerGroup
          as="div"
          className="grid grid-cols-1 gap-6 lg:grid-cols-3"
          staggerDelay={0.12}
        >
          {productList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
