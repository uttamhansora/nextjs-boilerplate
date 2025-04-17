import Link from "next/link";

const RelatedTags = ({ relatedTags, product_type_id }) => {
  return (
    <section className="related__area mt-30">
      <h2 className="tag-title">Tags</h2>
      <div className="related__tags">
        <ul className="tags-list">
          {relatedTags.map(({ id, tag }) => (
            <li key={id}>
              <Link
                href="/tags/[slug]/[type_id]/[id]"
                as={`/tags/${tag.slug}/${product_type_id}/${tag.id}`}
              >
                {tag.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default RelatedTags;
