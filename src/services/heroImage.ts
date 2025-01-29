import { client } from "@/sanity/lib/client";

export interface HeroImage {
    _id: string;
    title: string;
    image: {
        asset: {
            url: string;
        };
    };
}

export async function fetchHeroImages() {
    const query = `*[_type == "heroImage"] { _id, title, image { asset -> { url } } }`;
    const images : HeroImage[] = await client.fetch(query);
    return images || [];
}
