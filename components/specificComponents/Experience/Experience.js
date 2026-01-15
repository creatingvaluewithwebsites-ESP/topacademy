import React, { Component } from "react";
import css from "./Experience.module.scss";
import { storyblokEditable } from "@storyblok/react";

export default class Experience extends Component {
    render() {
        return (
            <div {...storyblokEditable(this.props.blok)} className={css["experience-wrapper"]}>
                <div className={css["experience-card"]}>
                    {/* El contenido del texto */}
                    <div className={css["experience-content"]}>
                        {this.props.blok.experience || "No description provided."}
                    </div>
                </div>
            </div>
        );
    }
}