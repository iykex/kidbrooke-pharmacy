import type { JsonLdNode } from "@/lib/types/seo";

const JsonLd = ({ data }: { data: JsonLdNode }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export default JsonLd;
