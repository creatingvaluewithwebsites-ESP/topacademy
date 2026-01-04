
import React from "react";
import { storyblokEditable } from "@storyblok/react";

export default function BlogPostsList({ blok }) {
  return (
    <section {...storyblokEditable(blok)}>
      <h2>{blok?.title || "Blog posts"}</h2>
    </section>
  );
}
