import React, {Component} from "react";
import slide1 from '../slides/slide1.slidex';
import slide2 from '../slides/slide2.slidex';
import slide3 from '../slides/slide3.slidex';
import JsxParser from 'react-jsx-parser';
import '../../stylesheets/styles.scss';
const Slide = (props) => {
  return (
    <div className='container'>
      {props.children}
    </div>
  );
}
const Header = (props) => {
  return(
    <h1>{props.children}</h1>
  );
}
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
  handleClick(direction){
    if (this.state.currentSlide < (this.state.slideOrder.length - 1) && direction === 1){
      this.setState({
        currentSlide: this.state.currentSlide + 1
      })
      this.transformFile(this.state.slideOrder[this.state.currentSlide]);
      
    }
    if (direction === 0 && this.state.currentSlide > 0){
      this.setState({
        currentSlide: this.state.currentSlide - 1
      })
      this.transformFile(this.state.slideOrder[this.state.currentSlide]);
    }
  }
  transformFile(file){
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = () =>
    {
      if(rawFile.readyState === 4)
      {
        if(rawFile.status === 200 || rawFile.status === 0)
        {
          var allText = rawFile.responseText;
          console.log(allText);
          this.setState({
            jsxText: allText
          })
        }
      }
    }
    rawFile.send(null);
  }
  componentDidMount(){
    this.transformFile(slide1);
    document.onkeydown = (e) => {
      if (e.keyCode === 39) {
        e.preventDefault();
        this.handleClick(1);
      }
      if (e.keyCode === 37){
        e.preventDefault();
        this.handleClick(0);
      }
    }
  }
  render() {
    return (
      <div>
        <div className='box-green'/>
        <div className="ball-pink" />
        <div className="footer"/>
        <JsxParser 
          jsx={this.state.jsxText}
          components={{Slide, Header}}
        />
      </div>
    );
  }
}
export default HomePage;
