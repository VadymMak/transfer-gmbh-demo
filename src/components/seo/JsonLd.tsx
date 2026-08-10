type JsonLdData = Record<string, unknown>;

// Legacy default export: generic JSON-LD (used by ecommerce pages for breadcrumbs/product schema)
export default function JsonLdGeneric({ data }: { data: JsonLdData | JsonLdData[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
