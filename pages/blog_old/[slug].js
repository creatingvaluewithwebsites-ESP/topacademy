import { getStoryblokApi, StoryblokComponent } from "@storyblok/react";

const MENU_STORY_SLUG = "reusable/headermenu";

export default function BlogPostRoute({ story, menu }) {
  if (!story) return <main style={{ padding: 40 }}>Post not found</main>;

  // story.content.component será "blogpost" y StoryblokComponent usará TU BlogPost.js
  return <StoryblokComponent blok={story.content} menu={menu} />;
}

export async function getStaticPaths() {
  const storyblokApi = getStoryblokApi();

  const { data } = await storyblokApi.get("cdn/stories", {
    version: "draft",
    starts_with: "blogposts/",
    is_startpage: false,
    per_page: 100,
  });

  const paths = (data?.stories || []).map((s) => ({
    params: { slug: s.slug.replace(/^blogposts\//, "") },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const storyblokApi = getStoryblokApi();
  const fullSlug = `blogposts/${params.slug}`;

  try {
    const [postRes, menuRes] = await Promise.all([
      storyblokApi.get(`cdn/stories/${fullSlug}`, { version: "draft" }),
      storyblokApi.get(`cdn/stories/${MENU_STORY_SLUG}`, { version: "draft" }),
    ]);

    return {
      props: {
        story: postRes?.data?.story || null,
        menu: menuRes?.data?.story || null, // 👈 lo pasamos entero, tu BlogPost usa menu.content
      },
      revalidate: 60,
    };
  } catch (e) {
    return { notFound: true };
  }
}
