import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  useProductBySlug,
  useProductImpact,
  useRelatedAnimal,
  useRelatedFarmNeed,
} from "@/hooks/useProducts";
import SanctuaryNavigation from "@/components/SanctuaryNavigation";
import JoinTheRanchList from "@/components/ranch/JoinTheRanchList";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowLeft,
  Check,
  Heart,
  Loader2,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  Sprout,
} from "lucide-react";
import { toast } from "sonner";
import SEO from "@/components/SEO";

const DEFAULT_DISCLAIMER =
  "Each purchase contributes to the overall care of the farm — animal feed, veterinary care, land regeneration, and daily operations.";

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading, error } = useProductBySlug(slug || "");
  const { data: impacts } = useProductImpact(product?.id);
  const { data: relatedAnimal } = useRelatedAnimal(product?.related_animal_id);
  const { data: relatedNeed } = useRelatedFarmNeed(product?.related_farm_need_id);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const handleAddToCart = () => {
    toast.success(`Added ${quantity} × ${product?.name} to cart`, {
      description: "Thank you for supporting the ranch.",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <SanctuaryNavigation />
        <div className="pt-32 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <SanctuaryNavigation />
        <div className="pt-32 text-center px-6">
          <h1 className="font-prairie-display text-3xl text-foreground mb-4">
            Product not found
          </h1>
          <Button asChild variant="outline" className="rounded-none">
            <Link to="/shop">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shop
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const priceDisplay = (product.price_cents / 100).toFixed(2);
  const galleryImages =
    product.images && product.images.length > 0
      ? product.images
      : product.image_url
      ? [product.image_url]
      : ["/placeholder.svg"];

  const hasImpactSection =
    (impacts && impacts.length > 0) ||
    !!product.impact_summary ||
    !!relatedAnimal ||
    !!relatedNeed;

  // Ingredients / materials: prefer ingredient_philosophy, fall back to key_benefits split
  const madeWithCare = product.ingredient_philosophy ?? [];
  const benefits = product.key_benefits ?? [];
  const usage = product.how_to_use ?? [];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${product.name} — Solareinas Ranch`}
        description={
          product.short_description ||
          `${product.name} — small-batch ranch-made goods from Solareinas. Every purchase feeds the farm.`
        }
        path={`/shop/${product.slug}`}
        type="product"
      />
      <SanctuaryNavigation />

      {/* Back link */}
      <div className="max-w-6xl mx-auto px-6 pt-28 pb-4">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 font-label uppercase text-[0.7rem] tracking-[0.22em] text-foreground/70 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Shop
        </Link>
      </div>

      {/* 1. Hero — product first */}
      <section className="pb-12 md:pb-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-14">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-sm bg-secondary/30">
              <img
                src={galleryImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {galleryImages.length > 1 && (
              <div className="flex gap-3 flex-wrap">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-16 h-16 rounded-sm overflow-hidden border transition-colors ${
                      selectedImage === idx
                        ? "border-primary"
                        : "border-border hover:border-foreground/40"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6 md:pt-4">
            {product.category && (
              <p className="font-label uppercase tracking-[0.28em] text-[0.7rem] text-accent">
                {product.category}
              </p>
            )}

            <h1 className="font-prairie-display text-4xl md:text-5xl text-foreground leading-tight">
              {product.name}
            </h1>

            {product.descriptor_line && (
              <p className="font-prairie-body text-lg text-foreground/80 leading-relaxed">
                {product.descriptor_line}
              </p>
            )}

            <div className="font-prairie-display text-3xl text-foreground">
              €{priceDisplay}
              {product.size && (
                <span className="font-prairie-body text-base text-muted-foreground ml-2">
                  / {product.size}
                </span>
              )}
            </div>

            {/* Quantity + Add to Cart */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <span className="font-label uppercase text-[0.72rem] tracking-[0.22em] text-foreground/70">
                  Quantity
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-none border-foreground/30"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </Button>
                  <span className="font-prairie-body text-lg w-8 text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-none border-foreground/30"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full rounded-none font-label uppercase text-[0.78rem] tracking-[0.24em] bg-primary text-primary-foreground hover:bg-primary/90 py-6"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Add to Cart — €{((product.price_cents * quantity) / 100).toFixed(2)}
              </Button>

              {product.impact_summary && (
                <p className="font-prairie-body text-sm text-foreground/70 inline-flex items-center gap-2">
                  <Sprout className="w-4 h-4 text-primary" />
                  {product.impact_summary}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Why You'll Love It — benefits */}
      {benefits.length > 0 && (
        <section className="py-16 md:py-20 px-6 bg-secondary/40">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <p className="font-label uppercase tracking-[0.3em] text-[0.7rem] text-accent mb-3">
                — For you
              </p>
              <h2 className="font-prairie-display text-3xl md:text-4xl text-foreground">
                Why You&rsquo;ll Love It
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((b, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-5 bg-card rounded-sm border border-border"
                >
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-prairie-body text-foreground/85">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. What This Purchase Helps Support */}
      {hasImpactSection && (
        <section className="py-16 md:py-20 px-6 bg-background">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <p className="font-label uppercase tracking-[0.3em] text-[0.7rem] text-accent mb-3">
                — For the farm
              </p>
              <h2 className="font-prairie-display text-3xl md:text-4xl text-foreground">
                What This Purchase Helps Support
              </h2>
            </div>

            <div className="space-y-4">
              {impacts && impacts.length > 0 ? (
                impacts.map((imp) => (
                  <div
                    key={imp.id}
                    className="p-6 bg-card rounded-sm border border-border"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Sprout className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-prairie-body text-foreground/90 leading-relaxed">
                          {imp.impact_statement}
                        </p>
                        {imp.farm_need && (
                          <p className="font-label uppercase tracking-[0.22em] text-[0.66rem] text-accent mt-3">
                            {imp.farm_need.need_title}
                            {imp.farm_need.impact_unit
                              ? ` · ${imp.farm_need.impact_unit}`
                              : ""}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : product.impact_summary ? (
                <div className="p-6 bg-card rounded-sm border border-border">
                  <p className="font-prairie-body text-foreground/90 leading-relaxed">
                    {product.impact_summary}
                  </p>
                </div>
              ) : null}

              {relatedAnimal && (
                <div className="p-6 bg-card rounded-sm border border-border flex flex-col sm:flex-row gap-5 items-start">
                  {relatedAnimal.photo_url && (
                    <img
                      src={relatedAnimal.photo_url}
                      alt={relatedAnimal.name}
                      className="w-24 h-24 object-cover rounded-sm flex-shrink-0"
                    />
                  )}
                  <div className="flex-1">
                    <p className="font-label uppercase tracking-[0.22em] text-[0.66rem] text-accent mb-1">
                      Helps support
                    </p>
                    <h3 className="font-prairie-display text-2xl text-foreground mb-2">
                      {relatedAnimal.name}{" "}
                      <span className="font-prairie-body text-base text-muted-foreground">
                        · {relatedAnimal.species}
                      </span>
                    </h3>
                    <p className="font-prairie-body text-sm text-foreground/80 leading-relaxed">
                      {relatedAnimal.impact_story ||
                        relatedAnimal.current_care_needs ||
                        relatedAnimal.story}
                    </p>
                  </div>
                </div>
              )}

              {relatedNeed && (
                <div className="p-6 bg-card rounded-sm border border-border">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Heart className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex-1">
                      <p className="font-label uppercase tracking-[0.22em] text-[0.66rem] text-accent mb-1">
                        Contributes to
                      </p>
                      <h3 className="font-prairie-display text-xl text-foreground mb-1">
                        {relatedNeed.need_title}
                      </h3>
                      {relatedNeed.description && (
                        <p className="font-prairie-body text-sm text-foreground/80 leading-relaxed">
                          {relatedNeed.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <p className="font-prairie-body text-xs text-muted-foreground text-center italic mt-6 max-w-2xl mx-auto">
              {impacts?.[0]?.impact_disclaimer || DEFAULT_DISCLAIMER}
            </p>
          </div>
        </section>
      )}

      {/* 4. Made With Care — ingredients / materials */}
      {madeWithCare.length > 0 && (
        <section className="py-16 md:py-20 px-6 bg-secondary/40">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <p className="font-label uppercase tracking-[0.3em] text-[0.7rem] text-accent mb-3">
                — Ingredients &amp; materials
              </p>
              <h2 className="font-prairie-display text-3xl md:text-4xl text-foreground">
                Made With Care
              </h2>
            </div>
            <div className="bg-card rounded-sm border border-border p-6 md:p-8">
              <ul className="space-y-3">
                {madeWithCare.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-prairie-body text-foreground/85">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* 5. How to Use */}
      {usage.length > 0 && (
        <section className="py-16 md:py-20 px-6 bg-background">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <p className="font-label uppercase tracking-[0.3em] text-[0.7rem] text-accent mb-3">
                — Daily ritual
              </p>
              <h2 className="font-prairie-display text-3xl md:text-4xl text-foreground">
                How to Use
              </h2>
            </div>
            <div className="space-y-3">
              {usage.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-5 bg-card rounded-sm border border-border"
                >
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-prairie-display text-primary flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className="font-prairie-body text-foreground/85 pt-1">
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ (kept if present) */}
      {product.faq && product.faq.length > 0 && (
        <section className="py-16 px-6 bg-secondary/40">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-prairie-display text-3xl text-foreground mb-6 text-center">
              Questions
            </h2>
            <Accordion type="single" collapsible className="space-y-2">
              {product.faq.map((item, idx) => (
                <AccordionItem
                  key={idx}
                  value={`faq-${idx}`}
                  className="bg-card rounded-sm border border-border px-4"
                >
                  <AccordionTrigger className="text-left font-prairie-body">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="font-prairie-body text-foreground/75">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      {/* 6. Small Batch. Real Purpose. */}
      <section className="py-20 md:py-24 px-6 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-label uppercase tracking-[0.32em] text-[0.7rem] text-primary-foreground/70 mb-5">
            — Our promise
          </p>
          <h2 className="font-prairie-display text-4xl md:text-5xl leading-tight mb-6">
            Small Batch. <span className="italic">Real Purpose.</span>
          </h2>
          <p className="font-prairie-body text-lg text-primary-foreground/90 leading-relaxed">
            No mega-corp mystery. No animal testing. No empty greenwashing. Just
            useful, beautiful goods — and profits that go back into the farm.
          </p>
          <div className="flex items-center justify-center gap-2 mt-8 font-label uppercase text-[0.7rem] tracking-[0.22em] text-primary-foreground/75">
            <Sparkles className="w-3.5 h-3.5" />
            Made on the ranch · Sierra Nevada
            <Sparkles className="w-3.5 h-3.5" />
          </div>
        </div>
      </section>

      {/* 7. Secondary CTA: Join the Ranch List */}
      <JoinTheRanchList />

      {/* Footer */}
      <footer className="py-12 px-6 bg-background border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-prairie-body text-foreground/70 mb-4">
            Made for you. Made for the farm.
          </p>
          <div className="flex flex-wrap justify-center gap-6 font-label uppercase text-[0.72rem] tracking-[0.22em] text-foreground/70">
            <Link to="/shop" className="hover:text-primary">Shop</Link>
            <Link to="/#impact" className="hover:text-primary">Impact</Link>
            <Link to="/sponsor-animal" className="hover:text-primary">Animals</Link>
            <a href="mailto:hello@solareinas.life" className="hover:text-primary">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetailPage;
