import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import axios from "axios";
import { ThemeProvider } from "react-bootstrap";
import { CircularProgress } from "@material-ui/core";

const cafeApi = "/api/cafe";

if(localStorage.getItem("cafeId") == null){
  localStorage.setItem("cafeId", 0)
}
if(localStorage.getItem("categoryId") == null){
  localStorage.setItem("categoryId", 0)
}
if(localStorage.getItem("conditionId") == null){
  localStorage.setItem("conditionId", "good")
}
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
    };
  }

  componentDidMount() {
    Promise.all([axios.get(cafeApi)])
      .then(([res]) => {
        this.setState({
          Cafe: res.data,
          isLoaded: true,
        });
        // console.log(this.state.Cafe);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleClickHome = value => () => {
    // console.log(value);
    localStorage.setItem("cafeId", 0)
    localStorage.setItem("categoryId", 0)
    localStorage.setItem("conditionId", "good")
    window.location.replace("/")
  }

  handleClick = value => () => {
    // console.log(value);
    localStorage.setItem("cafeId", value)
    window.location.replace("/")
  }

  render() {
    const login = localStorage.getItem('isLogin');
    const { isLoaded } = this.state;

    if (!isLoaded) {
      return (
        <div
          id="loader"
          style={{ position: "absolute", top: "50%", left: "50%" }}
        >
          <CircularProgress />
        </div>
      );
    } else {
      let cafelist = [];
      let cafe = this.state.Cafe;
      for (let i = 0; i < cafe.length; i++) {
        cafelist.push(
          <SwiperSlide>            
            <div onClick={this.handleClick(cafe[i]["cafeId"])}>
              {/* <img
              className="rounded-circle"
              style={{ width: 100, height: 100 }}
              src={list[i]["logoImg"]}
            /> */}
              {cafe[i]["name"]}
            </div>            
          </SwiperSlide>
        );
      }
      return (
        <div>
          <header className="section-header">
            <section className="header-main border-bottom">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-lg-2 col-4">
                    <Link to="/home" className="brand-wrap" onClick={this.handleClickHome()}>
                      <img 
                        src = "https://cdn.dribbble.com/users/4078256/screenshots/7165484/ohcaffe-dribbble_4x.png"
                        style={{width:160, height:120}}
                        />
                    </Link>
                      
                  </div>
                  <div className="col-lg-6 col-sm-12">
                    <img 
                      src = "https://www.ohmyzip.com/images2017/sub/banner_ohcafevisual.jpg"
                      style={{width:548, height:120}}
                      />
                  </div>
                  <div className="col-lg-4 col-sm-6 col-12">
                    <div className="widgets-wrap float-md-right">
                      <div className="widget-header  mr-3">
                        <a
                          href="#"
                          className="icon icon-sm rounded-circle border"
                        >
                          <i className="fa fa-shopping-cart"></i>
                        </a>
                        <span className="badge badge-pill badge-danger notify">
                          0
                        </span>
                      </div>
                      <div className="widget-header icontext">
                        <Link
                          to="/formPage"
                          className="icon icon-sm rounded-circle border"
                        >
                          <i className="fa fa-user"></i>
                        </Link>
                        <div className="text">
                          <span className="text-muted">Welcome!</span>
                          <div>
                            <Link to = 
                            {login === true?
                              "/signout": "/signin"
                            }/>
                            <Link to = {login === true? "/signout" : "/signin"}> 
                                      {login === true? "signout" : "signin"}</Link>
                            |<Link to="./register"> Register</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </header>

          <section className="section-pagetop bg">
            <div className="container">
              <nav className="mt-4" aria-label="Page navigation sample">
                <Swiper
                  // spaceBetween={0}
                  slidesPerView={6}
                >
                  <SwiperSlide>                  
                      <div onClick={this.handleClick(0)}>
                        {/* <img
                        className="rounded-circle"
                        style={{ width: 100, height: 100 }}
                        src={list[i]["logoImg"]}
                      /> */}
                        모든카페                     
                      </div>                    
                  </SwiperSlide>
                  {cafelist}
                </Swiper>
              </nav>
            </div>
          </section>
        </div>
      );
    }
  }
}

export default Header;