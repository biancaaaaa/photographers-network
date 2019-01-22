import React from "react";
import { initSlider } from "../gallerySlider";

let fakeSlidesData = [
  {
    "image-url":
      "https://images.unsplash.com/photo-1470058869958-2a77ade41c02?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
    "slide-title": "Lonely Wolf, Sweden",
    "slide-author": "James Flinton"
  },
  {
    "image-url":
      "https://images.unsplash.com/photo-1503836474039-37fb1d7a4ce3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
    "slide-title": "Melting Ice in Arctic Ocean2",
    "slide-author": "John Scurm"
  },
  {
    "image-url":
      "https://images.unsplash.com/photo-1503515235263-c699356bfb17?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
    "slide-title": "Frozen Pant",
    "slide-author": "Fiol Nohn"
  },
  {
    "image-url":
      "https://images.unsplash.com/photo-1538831790613-0b65a044c951?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
    "slide-title": "Melting Ice in Arctic Ocean4",
    "slide-author": "Sibo Dingo"
  }
];

export default class GallerySlider extends React.Component {
  componentDidMount() {
    const textBottom = fakeSlidesData.map(el => ({
      "slide-title": el["slide-title"],
      "slide-author": el["slide-title"]
    }));
    initSlider(
      this.listOfBubbles,
      this.sliderWrapper,
      this.listOfSlides,
      textBottom,
      this.bottomTextHolder,
      this.carousel1Title,
      this.carousel1Author
    );
  }
  render() {
    return (
      <div className="gb-image-carousel-1">
        <ul
          ref={node => {
            this.sliderWrapper = node;
          }}
          className="carousel-1-images-list"
        >
          {fakeSlidesData.map((el, idx) => (
            <li
              className={`gallery-slide ${idx === 0 ? "active" : ""}`}
              key={idx}
              ref={node => {
                this.listOfSlides
                  ? this.listOfSlides.push(node)
                  : (this.listOfSlides = [node]);
              }}
            >
              <div
                className="carousel-1-image-item"
                style={{ backgroundImage: `url(${el["image-url"]})` }}
              />
            </li>
          ))}
        </ul>
        <div
          ref={node => {
            this.bottomTextHolder = node;
          }}
          className="carousel-1-about-slide"
        >
          <h2
            ref={node => {
              this.carousel1Title = node;
            }}
            className="carousel-1-slide-title gb-text-black gb-title-medium-large-on-desktop"
          >
            {fakeSlidesData[0]["slide-title"]}
          </h2>
          <a
            ref={node => {
              this.carousel1Author = node;
            }}
            className="carousel-1-slide-author gb-text-black-opacity-50 gb-paragraph-small"
            href="/"
          >
            {fakeSlidesData[0]["slide-author"]}
          </a>
        </div>
        <ul className="carousel-1-pagination">
          {fakeSlidesData.map((el, idx) => (
            <li
              key={idx}
              className={`carousel-1-pagination-buble ${
                idx === 0 ? "active" : ""
              }`}
              ref={node => {
                this.listOfBubbles
                  ? this.listOfBubbles.push(node)
                  : (this.listOfBubbles = [node]);
              }}
              data-index={idx}
            />
          ))}
        </ul>
      </div>
    );
  }
}
