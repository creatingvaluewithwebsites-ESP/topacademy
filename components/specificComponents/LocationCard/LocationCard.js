
import React, { Component } from "react";
import css from "./LocationCard.module.scss";
import { storyblokEditable } from "@storyblok/react";

export default class LocationCard extends Component {
  render() {
    const { blok } = this.props;

    return (
      <article {...storyblokEditable(blok)} className={css["location-card"]}>
        {blok.image?.filename && (
          <img
            className={css["location-card__image"]}
            src={blok.image.filename}
            alt={blok.name || "Location"}
          />
        )}

        <div className={css["location-card__content"]}>
          <h3 className={css["location-card__title"]}>{blok.name}</h3>

          {(blok.city || blok.country) && (
            <p className={css["location-card__meta"]}>
              {[blok.city, blok.country].filter(Boolean).join(", ")}
            </p>
          )}

          {blok.description && (
            <p className={css["location-card__desc"]}>{blok.description}</p>
          )}

          {blok.link?.url && (
            <a className={css["location-card__link"]} href={blok.link.url}>
              View accommodation
            </a>
          )}
        </div>
      </article>
    );
  }
}