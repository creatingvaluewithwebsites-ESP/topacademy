import React, { Component } from "react";
import css from "./LocationCard.module.scss";
import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";
// 1. IMPORTANTE: Importamos el convertidor de texto enriquecido
import { RichTextToHTML } from "../../../functions/storyBlokRichTextRenderer";

export default class LocationCard extends Component {
  render() {
    const { blok } = this.props;
    const content = blok.content || {}; 
    const linkUrl = blok.full_slug ? (blok.full_slug.startsWith('/') ? blok.full_slug : `/${blok.full_slug}`) : "#";

    return (
      <Link href={linkUrl} className={css["location-card-wrapper"]}>
        <article {...storyblokEditable(blok)} className={css["location-card"]}>
          
          <div className={css["location-card__image-container"]}>
            {content.image?.filename && (
              <img
                className={css["location-card__image"]}
                src={content.image.filename}
                alt={content.title || blok.name || "Location"}
              />
            )}
          </div>

          <div className={css["location-card__content"]}>
            <h3 className={css["location-card__title"]}>{content.title || blok.name}</h3>

            {(content.city || content.country) && (
              <p className={css["location-card__meta"]}>
                 {[content.city, content.country].filter(Boolean).join(", ")}
              </p>
            )}
          </div>
          
        </article>
      </Link>
    );
  }
}