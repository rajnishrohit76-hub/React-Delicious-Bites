import React, { useEffect, useRef } from "react";
import "./Css/PopularDishes.css";
// import clickSound from "./assets/click.mp3"; // 🔊 import sound

function PopularDishes() {
  const trackRef = useRef(null);

  const dishImages = [
    "https://t3.ftcdn.net/jpg/14/96/14/42/240_F_1496144216_SduyFPnkzvQVxiIbL0EBwq58Bc3S4Gco.jpg",
    "https://t3.ftcdn.net/jpg/05/64/02/34/240_F_564023464_RaZb95D8yFPt2DnxbsYLQaQQ5BSrUImO.jpg",
    "https://t3.ftcdn.net/jpg/06/50/79/32/240_F_650793256_Mw3kosB1iWiFyz4OH2aDHJKs7BIwBWTd.jpg",
    "https://t3.ftcdn.net/jpg/01/59/58/78/240_F_159587878_lS33FEMRXSdJBeaCld0wnk5bFTqMGIcr.jpg",
    "https://t3.ftcdn.net/jpg/06/37/00/26/240_F_637002638_p332MyedLnMqHmR6jADAdPTJNz5Wk5U3.jpg",
    "https://t3.ftcdn.net/jpg/15/83/44/98/240_F_1583449871_TAidZR7pDg3Rwtiznrd7Xegz7THQwzXu.jpg",
    "https://t3.ftcdn.net/jpg/14/79/19/76/240_F_1479197657_PcvyPdLbgYskLLBZwIWKwmy6sFbgvjRJ.jpg",
    "https://t4.ftcdn.net/jpg/17/68/32/13/240_F_1768321334_9KXbE53iToOa2DRSIJi0xBwit2HI751s.jpg",
    "https://t3.ftcdn.net/jpg/15/15/46/26/240_F_1515462649_WPco6UKChDpujoXim2CDgIlATLZc4jSe.jpg",
    "https://t3.ftcdn.net/jpg/06/60/93/78/240_F_660937801_OLtFSlOm6bAAEUuS5GS4ctwdl1r57o77.jpg",
    "https://t3.ftcdn.net/jpg/05/94/77/94/240_F_594779428_zOWf1VtQf6tGWggQnilw4zEfFHR2DhN3.jpg",
    "https://t4.ftcdn.net/jpg/05/89/53/11/240_F_589531188_XqgpAokiInroPzT4MxVods57pl1JWTyj.jpg",
    "https://t4.ftcdn.net/jpg/14/38/44/11/240_F_1438441199_EeinbFwxiEruZzHnvogXhAmKAOJeUdCu.jpg",
    "https://t3.ftcdn.net/jpg/06/66/46/96/240_F_666469681_7wquuQND3axRV6tqUCbWITaMrJComYL6.jpg",

  ];

  // 🔁 Clone images for seamless infinite scroll
  useEffect(() => {
    const track = trackRef.current;
    if (track) {
      track.innerHTML += track.innerHTML;
    }
  }, []);

  // 🔊 Play sound on click
  const playSound = () => {
    new Audio(clickSound).play();
  };

  return (
    <div className="container-fluid">
      <h2 className="text-center text-warning p-2 fs-1 fw-bolder">
        Our Popular Dishes
      </h2>

      <div className="marquee-photos">
        <div className="marquee-track" ref={trackRef}>
          {dishImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt="popular dish"
              className="dish-img"
              onClick={playSound} // 🔊
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PopularDishes;
