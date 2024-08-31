import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './CarouselIcon.css';

function LessonCarousel({ lessonContent }) {
    const carouselItemStyle = { 
        height: '82vh', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#00ff00',
        borderRadius: '15px',
        margin: '0px 10px'
    };

    return (
        <Carousel
            indicators={false}
            interval={null}
        >
            {lessonContent.map((item, index) => (
            <Carousel.Item key={index}>
            <div style={carouselItemStyle}>
                <div style={{ textAlign: 'center' }}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                </div>
                </div>
            </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default LessonCarousel;
