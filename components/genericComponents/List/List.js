import React, { Component } from "react"; // Asegúrate de importar React
import { storyblokEditable } from "@storyblok/react";
import Element from "../Element/Element"; // Tu componente original
import LocationCard from "../../specificComponents/LocationCard/LocationCard"; // La tarjeta bonita para hoteles
import css from "./List.module.scss";

export default class List extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const elements = this.props.blok.elements || [];
    
    // 1. DETECTOR: Comprobamos si el primer elemento es un Alojamiento
    const firstItem = elements[0];
    const isLocationList = firstItem && (firstItem.content?.component === "location" || firstItem.content?.component === "accommodation");

    // --- CASO A: ES UNA LISTA DE HOTELES (La Excepción) ---
    if (isLocationList) {
      return (
        <section className={css["location-grid"]} {...storyblokEditable(this.props.blok)}>
          {/* Si quieres título en la sección de hoteles, descomenta esto: */}
          {/* <h2 className={css["rich-text-section__title"]}>{this.props.blok.title}</h2> */}
          
          {elements.map((nestedBlok) => (
            <div key={nestedBlok._uid} className={css["location-card-wrapper"]}>
              <LocationCard blok={nestedBlok} />
            </div>
          ))}
        </section>
      );
    }

    // --- CASO B: CUALQUIER OTRA LISTA (Tu código original) ---
    return (
      <section className={css["rich-text-section"]} {...storyblokEditable(this.props.blok)}>
        <h2 className={css["rich-text-section__title"]}>{this.props.blok.title}</h2>
        {elements.map((nestedBlok) => (
          <Element blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </section>
    );
  }
}