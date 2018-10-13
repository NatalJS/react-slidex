import React, { Component } from 'react';
import JsxParser from 'react-jsx-parser';
import slide1 from 'Slides/slide1.slidex';
import slide2 from 'Slides/slide2.slidex';
import slide3 from 'Slides/slide3.slidex';

import 'Stylesheets/styles.scss';

const Slide = ({ children }) => (
  <div className="container">
    {children}
  </div>
);

const Header = ({ children }) => <h1>{children}</h1>;

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jsxText: '',
      slideOrder: [
        slide1,
        slide2,
        slide3
      ],
      currentSlide: 0
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.transformFile(slide1);
    document.onkeydown = (e) => {
      e.preventDefault();
      if (e.keyCode === 39) {
        this.handleClick(1);
      }
      if (e.keyCode === 37) {
        this.handleClick(0);
      }
    }
  }

  handleClick(direction) {
    if (this.state.currentSlide < (this.state.slideOrder.length - 1) && direction === 1) {
      this.setState({
        currentSlide: this.state.currentSlide + 1
      });
      this.transformFile(this.state.slideOrder[this.state.currentSlide]);
    }

    if (direction === 0 && this.state.currentSlide > 0) {
      this.setState({
        currentSlide: this.state.currentSlide - 1
      });
      this.transformFile(this.state.slideOrder[this.state.currentSlide]);
    }
  }

  transformFile(file) {
    const rawFile = new XMLHttpRequest();
    rawFile.open('GET', file, false);
    rawFile.onreadystatechange = () => {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status === 0) {
          const allText = rawFile.responseText;
          this.setState({
            jsxText: allText
          });
        }
      }
    }
    rawFile.send(null);
  }

  render() {
    return (
      <div>
        <div className="box-green" />
        <div className="ball-pink" />
        <div className="footer" />
        <JsxParser
          jsx={this.state.jsxText}
          components={{ Slide, Header }}
        />
      </div>
    );
  }
}

export default HomePage;
