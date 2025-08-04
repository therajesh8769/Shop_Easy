import {Swiper,SwiperSlide} from 'swiper/react';    
import {Autoplay,Pagination, Navigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides=[
    { 
        img: "../images/tees.png",
        link: "/products/offers",
        alt: "Big Summer Sale",
      },
      {
        img: "../images/joggers.png",
        link: "/products/new",
        alt: "New Arrivals",
      },
      {
        img: "../images/beauty.jpeg",
        link: "/products/new",
        alt: "New Arrivals",
      },
      {
        img: "../images/sunglass.jpeg",
        link: "/products/new",
        alt: "New Arrivals",
      },
     
]
const HeroSection = () => {
    return (
        <section className='w-full px-4 md:px-8 my-6'>
            {/* Mobile View: Swiper */}
        
            <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 3000 }}
                loop={true}
                pagination={{ clickable: true }}
                 spaceBetween={16}
                
                 breakpoints={{
                    0:{
                        slidesPerView: 1.2,
                        
                    },
                    768:{
                        slidesPerView: 3.2,
                    }

                 }}
                 
               
                
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index} className="relative">
                            <a href={slide.link} className="block w-full h-full">
                               <div className='bg-white shadow-md rounded-lg overflow-hidden'>
                                 <img src={slide.img} alt={slide.alt} className="w-full h-96 object-cover" />
                               </div>
                            </a>
                        </SwiperSlide>
                    ))}
                </Swiper>
            
               
            </section>
    )
}
export default HeroSection;