import Head from "next/head";
const MetaHead = (props) => {
  return (
    <Head>
      <title>{props.seo_title}</title>
      <meta name="description" content={props.seo_description} />
      <meta name="keywords" content={props.seo_keyword} />
      <meta property="og:image" content={props.seo_image} />
      <meta property="og:title" content={props.seo_title} />
      <meta property="og:description" content={props.seo_description} />
      <meta name="twitter:title" content={props.seo_title} />
      <meta name="twitter:description" content={props.seo_description} />
      <meta name="twitter:image" content={props.seo_image} />
      <meta name="robots" content="max-image-preview:large" />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default MetaHead;
