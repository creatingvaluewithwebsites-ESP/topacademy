import React, { Component } from "react";
import css from "./BlogPost.module.scss";
import Headermenu from "../../genericComponents/Headermenu/Headermenu";
import Hero from "../../genericComponents/Hero/Hero";
import { storyblokEditable } from "@storyblok/react";
import { RichTextToHTML } from "../../../functions/storyBlokRichTextRenderer";
import Link from "next/link";

export default class BlogPost extends Component {

    constructor(props) {
        super(props);
        // Formateamos la fecha para que se lea bien (ej: 12 Oct 2024)
        this.prettyDate = new Date(this.props.blok.date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    render() {
        // Logica para el viaje relacionado
        const relatedTrip = this.props.blok.related_trip;
        
        return (
            <div {...storyblokEditable(this.props.blok)}>
                {/* Asumo que 'menu' viene en las props globales */}
                <Headermenu blok={this.props.menu ? this.props.menu.content : null}></Headermenu>

                <main>
                    {/* Usamos tu componente Hero existente. 
                        Asegúrate de que 'blok.image' tenga datos o el Hero fallará */}
                    <Hero blok={this.props.blok} contentTypeTag="blog" />

                    <div className={css["blog-page__main-content"]}>
                        
                        {/* COLUMNA IZQUIERDA: Contenido del artículo */}
                        <div className={css["blog-page__article"]}>
                            <div className={css["meta-info"]}>
                                <span className={css["date"]}>{this.prettyDate}</span>
                            </div>

                            <section className={css["rich-text-section"]}>
                                <div className={css["rich-text-section__rich-text"]}>
                                    {RichTextToHTML({ document: this.props.blok.body })}
                                </div>
                            </section>
                        </div>

                        {/* COLUMNA DERECHA (Sidebar): El Viaje Relacionado */}
                        <aside className={css["blog-page__sidebar"]}>
                            {relatedTrip && (
                                <div className={css["related-trip-card"]}>
                                    <h3>Did you enjoy the story?</h3>
                                    <p>Live the experience yourself.</p>
                                    
                                    {/* Si relatedTrip es un objeto completo (si está resuelto) */}
                                    {relatedTrip?.content ? (

                                        <div className={css["trip-preview"]}>
                                            {/* Aquí podrías poner la foto del viaje si viene en los datos */}
                                            <h4>{relatedTrip.name || "Go to the trip"}</h4>
                                            <Link href={`/${relatedTrip.full_slug || relatedTrip.slug}`}>
                                                <a className={css["btn-book"]}>Explore trip</a>
                                            </Link>

                                        </div>
                                    ) : (
                                        // Si solo llega el ID (caso común sin resolver)
                                        <div className={css["trip-preview"]}>
                                             <p>Este artículo recomienda nuestro viaje estrella.</p>
                                             {/* Necesitarás lógica extra si solo tienes el UUID, 
                                                 pero por ahora dejamos un botón genérico o placeholder */}
                                             <button className={css["btn-book"]}>Ver Disponibilidad</button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </aside>

                    </div>
                </main>
            </div>
        );
    }
}