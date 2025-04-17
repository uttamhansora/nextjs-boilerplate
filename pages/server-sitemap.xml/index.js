import { getServerSideSitemap } from "next-sitemap";

export const getServerSideProps = async (ctx) => {
    let productResponse = await fetch(`${process.env.BASE_URL}product-all`);
    productResponse = await productResponse.json();
    const products = productResponse.data.map((item) => ({
        loc: `${process.env.FRONTEND_URL}${item.slug}`,
        lastmod: item.updated_at,
        changefreq: 'daily',
        priority: 1,
    }));


    let productTypeResponse = await fetch(`${process.env.BASE_URL}product-type`);
    productTypeResponse = await productTypeResponse.json();
    const productType = productTypeResponse.data.map((item) => ({
        loc: `${process.env.FRONTEND_URL}filter?type=${item.slug}`,
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 0.8,
    }));


    let tagResponse = await fetch(`${process.env.BASE_URL}tags-all`);
    tagResponse = await tagResponse.json();

    let tagUrl = [];
    productTypeResponse.data.forEach(function (typeItem) {
        tagResponse.data.forEach(function (tagItem) {
            tagUrl.push({
                loc: `${process.env.FRONTEND_URL}tags/${tagItem.slug}/${typeItem.id}/${tagItem.id}`,
                lastmod: new Date().toISOString(),
                changefreq: 'daily',
                priority: 0.5,
            });
        });
    });

    const fields = [...products, ...productType, ...tagUrl];

    return getServerSideSitemap(ctx, fields);
};

export default function Sitemap() { }