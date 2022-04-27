import React from "react";
import { Carousel } from "primereact/carousel";
import { Button } from "primereact/button";
import "./CarouselDemo.css";
import { useState } from "react";
import { Answer } from "./answer.model";
import { AnswersService } from "./AnswersService";
import { useSearchParams } from "react-router-dom";

export const MyCarousel = (visitorId) => {
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState([]);
  let startTime = Date.now();
  const anserService = new AnswersService();
  const [searchParams] = useSearchParams();
 
  const images = [
    { id: 1, name: "img1.jpeg", isRight: false },
    { id: 2, name: "img2.jpeg", isRight: false },
    { id: 3, name: "img3.jpeg", isRight: true },
    { id: 4, name: "img4.jpeg", isRight: false },
    { id: 5, name: "img5.jpeg", isRight: false },
    { id: 6, name: "img6.jpeg", isRight: false },
    { id: 7, name: "img7.jpeg", isRight: true },
    { id: 8, name: "img8.jpeg", isRight: false },
    { id: 9, name: "img9.jpeg", isRight: false },
    { id: 10, name: "img10.jpeg", isRight: false }
  ];
  const responsiveOptions = [
    {
      breakpoint: "180px",
      numVisible: 1,
      numScroll: 1,
    },
  ];
  /*
  useEffect(() => {
    setImages(data) ;
}, []); // eslint-disable-line react-hooks/exhaustive-deps
 */
  const doAnswer = (imganswer, userAnswer, imgid, imgName) => { // function called when user click button (right,wrong)
    const timeDiffsEC = (Date.now() - startTime) / 1000; // here we calculate time diffrence between image show and user click
    const answer = new Answer(   imgid, imgName,  imganswer,  userAnswer,  timeDiffsEC, imganswer === userAnswer ? 1 : 0
    ); // prepare answer object to be add to the list 
    console.log("page ",page , "answer  ",answer, "imgid",imgid);
    console.log("answers ",answers  );
    if (page >= images.length-1 ) { // if user finish all images 
      const payload = { visitor_id: visitorId.visitorId, answers: [...answers, answer] , 
        survey_id: searchParams.get("survey_id") }; // payload to be sent to back end 
      anserService.saveResults(payload);  // here we send all answers to our bac end service 
    }
    setAnswers([...answers, answer]);  // prepare list of users answers in order to send to backend

    setPage(page + 1); // move to next photo
 
  };
  const imageemplate = (image) => { // image template to show in image slider
    return (
      <div className="product-item">
        <div className="product-item-content ">
          <div className="mb-3">
            <img
              src={`./${searchParams.get("survey_id")}/${image.name}`}  // load image from local folder (public)
              alt={image.name}
              className="product-image "
            />
          </div>
          <div>
            <div className="car-buttons mt-5">
              <Button   icon="pi pi-check-circle"  className="p-button p-button-rounded mr-2" label="صح"   onClick={(e) =>
                  doAnswer(image.isRight, true, image.id, image.name) // when user click this button we call doAnswer function
                }
              />
              <Button  icon="pi pi-times-circle" className="p-button-danger p-button-rounded" label="خطأ"   onClick={(e) =>
                  doAnswer(image.isRight, false, image.id, image.name)// when user click this button we call doAnswer function
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="carousel-demo">
      <div className="card">
        {page < images.length  ? (  // if the user has not seen all photos we show him next photo 
          <Carousel
            value={images}
            numVisible={1}
            numScroll={1}
            responsiveOptions={responsiveOptions}
            itemTemplate={imageemplate}
            header={
              <h5 className="text-center"> 
              هل تشير هذه اللافتة الى 
              {searchParams.get("survey_id") === "s1"?(<> حزام الأمان اجباري </>)
              :(searchParams.get("survey_id") === "s2"?(<>    عدم استخدام الجوال اثناء القيادة؟</>):
              (searchParams.get("survey_id") === "s3"?(<> عدم استخدام الضوء المبهر </>):
              (searchParams.get("survey_id") === "s4"?<> يجب وضع الاطفال في الكرسي المخصص </>:<></>)
              ))}
              
              </h5>
            }
            page={page}
            onPageChange={() => (startTime = Date.now())} // when the photo showen we set start time = now in order to calculate dif
            indicatorsContentClassName="hidden"
          ></Carousel>
        ) : (  // if user has seen all photos we show him thanks 
          <div className="row">
            <div className="col-12 text-primary text-center text-justif font-medium">
              تم استكمال الاستبيان , شكرا لك
            </div>
            <div className="col-12 text-primary text-center text-justif font-medium"></div>
          </div>
        )}
      </div>
    </div>
  );
};
export default MyCarousel;
