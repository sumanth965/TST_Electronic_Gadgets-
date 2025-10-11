import React, { useRef, useState, useEffect } from 'react';
import './Carousel.css'; // Ensure styles are similar to your original style.css
const Carousel = () => {
    const [isDetailVisible, setDetailVisible] = useState(false);
    const listRef = useRef(null);
    const nextButtonRef = useRef(null);
    const prevButtonRef = useRef(null);
    let unAcceptClickTimeout;

    // Automatically change slide every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            showSlider('next');
        }, 5000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    const handleNext = () => {
        showSlider('next');
    };

    const handlePrev = () => {
        showSlider('prev');
    };

    const showSlider = (type) => {
        if (nextButtonRef.current && prevButtonRef.current) {
            nextButtonRef.current.style.pointerEvents = 'none';
            prevButtonRef.current.style.pointerEvents = 'none';
        }

        const items = listRef.current.querySelectorAll('.item');
        if (type === 'next') {
            listRef.current.appendChild(items[0]);
        } else {
            listRef.current.prepend(items[items.length - 1]);
        }

        clearTimeout(unAcceptClickTimeout);
        unAcceptClickTimeout = setTimeout(() => {
            if (nextButtonRef.current && prevButtonRef.current) {
                nextButtonRef.current.style.pointerEvents = 'auto';
                prevButtonRef.current.style.pointerEvents = 'auto';
            }
        }, 2000);
    };

    const handleSeeMore = () => {
        setDetailVisible(true);
    };

    const handleBack = () => {
        setDetailVisible(false);
    };

    return (
        <div className="carousel">

            <div ref={listRef} className={`list ${isDetailVisible ? 'showDetail' : ''}`}>
                {[1, 2, 3, 4, 5, 6].map((_, index) => (
                    <div key={index} className="item">
                        <img src={`uploadss/img${index + 1}.png`} alt={`Slide ${index + 1}`} />
                        <div className="introduce">
                            <div className="title">Welcome to</div>
                            <div className="topic">TST Electronics</div>
                            <div className="des">
                                Empowering your Tech Journey-Discover, Choose, Connnect
                            </div>

                        </div>
                        <div className="detail">
                            <div className="title">Aerphone GHTK</div>
                            <div className="des">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, reiciendis suscipit nobis nulla
                                animi, modi explicabo quod corrupti impedit illo, accusantium in eaque nam quia adipisci aut distinctio
                                porro eligendi.
                            </div>
                            <div className="specifications">
                                <div>
                                    <p>Used Time</p>
                                    <p>6 hours</p>
                                </div>
                                <div>
                                    <p>Charging port</p>
                                    <p>Type-C</p>
                                </div>
                                <div>
                                    <p>Compatible</p>
                                    <p>Android</p>
                                </div>
                                <div>
                                    <p>Bluetooth</p>
                                    <p>5.3</p>
                                </div>
                                <div>
                                    <p>Controlled</p>
                                    <p>Touch</p>
                                </div>
                            </div>
                            <div className="checkout">
                                <button>ADD TO CART</button>
                                <button>CHECKOUT</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="arrows">
                <button id="prev" ref={prevButtonRef} onClick={handlePrev}>
                    &lt;
                </button>
                <button id="next" ref={nextButtonRef} onClick={handleNext}>
                    &gt;
                </button>

            </div>
        </div>
    );
};

export default Carousel;
