import { componentRegistry, FaqSection } from "@/components/cms/componentRegistry";
import type { PageSection } from "@/lib/cms/types";

export function PageRenderer({ sections }: { sections: PageSection[] }) {
  return (
    <>
      {sections.map((section, i) => {
        if (section.type === "faq") {
          return <FaqSection key={i} />;
        }

        const Component = componentRegistry[section.type];
        if (!Component) return null;

        // The registry key comes from section.type, so props always match the
        // component it resolves to — TS can't correlate that across a lookup table.
        // The extra `type` field is unused by every component; harmless to pass through.
        return <Component key={i} {...section} />;
      })}
    </>
  );
}
