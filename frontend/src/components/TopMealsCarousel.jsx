import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TopMealItem from "./TopMealItem";

// Carousel Items Data
const carouselItems = [
    {
        id: 1,
        img: "https://plus.unsplash.com/premium_photo-1669742928007-71b99d6ab1dd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTM3fHxjaGlja2VuJTIwd2luZ3N8ZW58MHx8MHx8fDA%3D",
        title: "fried chicken",
    },
    {
        id: 2,
        img: "https://images.unsplash.com/photo-1622001618569-eae18fee3a1a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTU0fHxjaGlja2VuJTIwd2luZ3N8ZW58MHx8MHx8fDA%3D",
        title: "chicken",
    },
    {
        id: 3,
        img: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnVyZ2VyfGVufDB8fDB8fHww",
        title: "burger",
    },
    {
        id: 4,
        img: "https://images.unsplash.com/photo-1565976469782-7c92daebc42e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bm9vZGxlc3xlbnwwfHwwfHx8MA%3D%3D",
        title: "Spaghetti",
    },
    {
        id: 5,
        img: "https://images.unsplash.com/photo-1605888969139-42cca4308aa2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNwYWdoZXR0aXxlbnwwfHwwfHx8MA%3D%3D",
        title: "nuddles",
    },
    {
        id: 6,
        img: "https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBpenphfGVufDB8fDB8fHww",
        title: "pizza",
    },
];

// Carousel Component
const TopMealsCarousel = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            { breakpoint: 1124, settings: { slidesToShow: 3, slidesToScroll: 1 } },
            { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
    };

    return (
        <div style={{ width: "100%", padding: "20px 0" }}>
            <Slider {...settings}>
                {carouselItems.map((item) => (
                    <TopMealItem key={item.id} item={item} />
                ))}
            </Slider>
        </div>
    );
};

export default TopMealsCarousel;
