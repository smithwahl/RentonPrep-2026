import type { TestimonialsSectionData } from "@/lib/cms/types";

export function TestimonialsSection({
  eyebrow,
  heading,
  intro,
  items,
}: Omit<TestimonialsSectionData, "type">) {
  return (
    <section
      className="section section--alt"
      id="testimonials"
      aria-labelledby="testimonials-heading"
    >
      <div className="container">
        <div className="section-intro section-intro--center">
          <span className="eyebrow eyebrow--muted">{eyebrow}</span>
          <h2 id="testimonials-heading">{heading}</h2>
          <p>{intro}</p>
        </div>
        <div className="testimonials-grid">
          {items.map((q, i) => (
            <figure key={i} className="testimonial-card">
              <blockquote className="testimonial-quote">{q.quote}</blockquote>
              <figcaption className="testimonial-attr">{q.attribution}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
