import React from "react";
import { Carousel } from 'primereact/carousel';
 import { Button } from 'primereact/button';
 import './CarouselDemo.css';
import{useState} from "react"
import { Answer } from "./answer.model";
import { AnswersService } from "./AnswersService";
export const  MyCarousel = (visitorId) => {
  const [page,setPage] = useState(0);
  const [answers,setAnswers] = useState([])
  let startTime =Date.now();
const anserService = new AnswersService();

  const images =[{"id": 1,"name": "img1.jpeg","isRight": false},
  {"id": 2,"name": "img2.jpeg","isRight": false},
  {"id": 3,"name": "img3.jpeg","isRight": false},
  {"id": 4,"name": "img4.jpeg","isRight": false},
  {"id": 5,"name": "img5.jpeg","isRight": false},
  {"id": 6,"name": "img6.jpeg","isRight": false},
  {"id": 7,"name": "img7.jpeg","isRight": false},
  {"id": 8,"name": "img8.jpeg","isRight": true},
  {"id": 9,"name": "img9.jpeg","isRight": true},
  {"id": 10,"name": "img10.jpeg","isRight": true}];
   const responsiveOptions = [
  
      {
          breakpoint: '180px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  /*
  useEffect(() => {
    setImages(data) ;
}, []); // eslint-disable-line react-hooks/exhaustive-deps
 */
const doAnswer = ( imganswer , userAnswer ,imgid ,imgName) =>{
  const timeDiffsEC = (Date.now() - startTime) / 1000;  
console.log('useranswer',userAnswer, 'right answer ',imganswer, 'q id ',imgid , 'timeDiffsEC',timeDiffsEC);
const answer = new Answer(imgid,imgName,imganswer,userAnswer,timeDiffsEC,imganswer===userAnswer?1:0);
setAnswers([...answers,answer]);
 setPage(page+1)
 if(page >= images.length-1){
   const payload ={ id : visitorId.visitorId , answers : answers }
  anserService.saveResults(payload);
}
}
 
const imageemplate = (image) => {
  return (
      <div className="product-item">
          <div className="product-item-content ">
              <div className="mb-3">
                  <img src={`./images/${image.name}`} 
                  alt={image.name} className="product-image " />
              </div>
              <div>
                   <div className="car-buttons mt-5">
                      <Button icon="pi pi-check-circle" className="p-button p-button-rounded mr-2" label="صح" 
                       onClick={(e) => doAnswer(image.isRight , false,image.id,image.name)} />
                       <Button icon="pi pi-times-circle" className="p-button-danger p-button-rounded" label="خطأ"
                         onClick={(e) => doAnswer(image.isRight , false,image.id,image.name)}/>
                  </div>
              </div>
          </div>
      </div>
  );
}
return (
  <div className="carousel-demo">
      <div className="card">
        {page<images.length?
          <Carousel value={images} numVisible={1} numScroll={1} responsiveOptions={responsiveOptions}   
              itemTemplate={imageemplate} header={<h5 className="text-center">
                هل تشير هذه اللافتة الى 
                عدم استخدام الجوال اثناء القيادة؟
              </h5>} page={page}   onPageChange={ () => startTime =Date.now()}
              indicatorsContentClassName="hidden">
                </Carousel>
                : 
                <div className="row">
                <div className="col-12 text-primary text-center text-justif font-medium">
                  تم استكمال الاستبيان 
                ,
                شكرا لك
                  </div>
                    <div className="col-12 text-primary text-center text-justif font-medium">
                                
                      </div>
                  </div>
                }
      </div>

      
  </div>
);
}
 export default MyCarousel;