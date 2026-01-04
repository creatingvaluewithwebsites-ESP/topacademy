//indexedDB.js
import Link from "next/link";
import { getStoryblokApi } from "@storyblok/react";

export default function BlogIndex({ postsCount, posts }) {
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 50 }}>
      <h1>Blog</h1>

      {postsCount === 0 ? (
        <p>No posts found. (Check that your posts are Content type = BlogPost and saved/published)</p>
      ) : (
        <ul style={{ display: "grid", gap: 16, listStyle: "none", padding: 0 }}>
          {posts.map((post) => {

            const shortSlug = post.slug.replace(/^blogposts\//, "");
            
            return (
              <li
                key={post.uuid}
                style={{ border: "1px solid #ddd", padding: 16, borderRadius: 10 }}
              >
                <h2 style={{ margin: "0 0 8px" }}>
                  {post.content?.title || post.name}
                </h2>

                {post.content?.summary ? (
                  <p style={{ margin: "0 0 12px" }}>{post.content.summary}</p>
                ) : null}

                <Link href={`/blog/${shortSlug}`}>Read more →</Link>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}

export async function getStaticProps() {
  const storyblokApi = getStoryblokApi();

  // 1) Traemos TODOS los blogposts por content_type (lo más fiable)
  const { data } = await storyblokApi.get("cdn/stories", {
    version: "draft",
    content_type: "blogpost", // <-- technical name
    per_page: 50,
    sort_by: "content.date:desc",
  });

  const posts = data?.stories || [];

  return {
    props: {
      postsCount: posts.length,
      posts,
    },
    revalidate: 60,
  };
}
