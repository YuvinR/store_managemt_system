import React, { Component } from 'react';
import {CommonGet, CommonPost} from "../../config";
import {toast, ToastContainer} from "react-toastify";
import Col from "react-bootstrap/Col";
import {Card, Row} from "react-bootstrap";
import empimg from "../../Images/noimg.jpg";
import CardGroup from "react-bootstrap/CardGroup";
import Carousel from "react-bootstrap/Carousel";
import img1 from "../../Images/img01.jpg";
import img2 from "../../Images/img02.jpg";
import img5 from "../../Images/img00.jpg";

class CategoryRender extends Component {
    constructor(props)
    {
        super(props)
        this.state={
            id:0,
            productSet:[]

        }


    }

    componentDidMount(){
       let id=  sessionStorage.getItem("CatId:");
       console.log("id",id);
        CommonGet('productByCategoryId',id)
            .then(res=>res.json())
            .then(json =>{
                this.setState({
                    isLoaded:true,
                    productSet: json
                })
            });

    }


    addToCart = (product,event) => {

        let formData=
            {
                "cartId": "",
                "productId": product.productId,
                "productName": product.productName,
                "productPrice": product.productPrice,
                "productDiscount": product.productDiscount
            }


        CommonPost('shoppingcart',formData)
            .then(res=>res.json())
            .then(json =>{
                this.setState({
                    isLoaded:true,

                })
            });

        toast("Successfully Added to Your Cart!");

    };

    addToWishList = (product,event) => {

        let formData=
            {
                "wishListId": "",
                "userId": "",
                "productId": product.productId,
                "productName": product.productName,
                "productPrice": product.productPrice,
                "productDiscount": product.productDiscount
            }


        CommonPost('wishListAdd',formData)
            .then(res=>res.json())
            .then(json =>{
                this.setState({
                    isLoaded:true,

                })
            });

        toast("Added to WishList!");

    };
    renderproducts(productset) {
        let tableContent = (productset === undefined || productset === null || productset.length === 0) ? null : (

            productset.map((product) => {
                return (
                    <Col xs="4">
                        <Card>
                            <Card.Img variant="top" src={empimg} rounded />
                            <Card.Body>
                                <Card.Title>{product.productName}</Card.Title>
                                <Card.Text>
                                <p> {product.productDescription}</p>

                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Row>
                                    <Col  xs={8} md={8}>
                                        <Card.Title>Rs.{product.productPrice}</Card.Title>
                                    </Col>
                                    <Col xs={2} md={1}>
                                        {/*<a href="#" className="ml-auto btn btn-info btn-sm"*/}
                                        {/*   onClick={(event) => this.addToCart(product, event)}*/}
                                        {/*>*/}
                                        {/*    <span className="fa fa-shopping-cart"></span>*/}
                                        {/*</a>*/}

                                        <button
                                            type="button"
                                            className="btn btn-outline-success"
                                            onClick={(event) => this.addToCart(product, event)}
                                        ><i className="fa fa-shopping-cart"></i>

                                        </button>
                                    </Col>
                                    &nbsp; &nbsp; &nbsp;
                                    <Col xs={2} md={1}>
                                        {/*<a href="#" className="ml-sm-3 btn btn-danger btn-sm">*/}
                                        {/*    <span className="fa fa-heart-o"></span>*/}
                                        {/*</a>*/}
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger"
                                            onClick={(event) => this.addToWishList(product, event)}
                                        ><i className="fa fa-heart-o"></i>

                                        </button>
                                    </Col>
                                </Row>



                            </Card.Footer>
                        </Card>
                        <br/>
                    </Col>

                );
            }));
        return (

            <CardGroup>
                {tableContent}
            </CardGroup>

        );
    }


    render() {
        let products = this.renderproducts(this.state.productSet);

        return (

            <div>
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 "
                            src={img1}
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>E-Shopping Center</h3>
                            <p class="text-dark">Shopping From Home, Without Wasting Your Time !</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 "
                            src={img2}
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3>Fast Delivery Every Where!</h3>
                            <p class="text-dark">24x7 Island Wide Delivery Service! </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={img5}
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3>Quality Products</h3>
                            <p class="text-dark">World Famouse Top Rated Brands!</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <br/>
                {products}
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                {/* Same as */}

            </div>



        );
    }
}

export default CategoryRender;