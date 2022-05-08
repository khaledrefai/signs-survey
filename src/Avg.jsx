import React from 'react';
 import 'primereact/resources/themes/saga-green/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'bootstrap/dist/css/bootstrap.rtl.css'; 
import{useState , useEffect} from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useSearchParams } from "react-router-dom";

export const  Avg =()=> {
     const[answers,setAnswers] = useState([]);
    const[totalRecord,setTotalRecord]= useState(0);
    const [searchParams] = useSearchParams();
 

  useEffect(()=>{
    const getAllAnswers = async () => {
        const res = await
         fetch('https://x1ohur0x73.execute-api.ap-south-1.amazonaws.com/v1/survey/'+searchParams.get("survey_id") 
, {
            headers: {
                'Accept': '*/*'
            }
        });
        const d = await res.json();
        const data = d.Items;
        let retData = [];
        console.log("----"+data.length);
        setTotalRecord(data.length); 
        data.forEach(element => {
            element.answers.forEach(e => {
                let id = parseInt(e.imageId-1);
                  if(!retData[id]){
                    retData[id] = {imageId  : e.imageId ,
                         totalMarks : parseInt(e.mark) ,
                         totalTime : parseFloat(e.totalTimeSec) ,
                          imageName :e.imageName};  
                 }else {
                  let totalMarks = parseInt( retData[id].totalMarks + parseInt(e.mark));     
                  let totalTime =  retData[id].totalTime +  parseFloat(e.totalTimeSec) ;  
                   retData[id] = {imageId  : e.imageId , totalMarks :totalMarks ,totalTime :totalTime , imageName :e.imageName};  
                 }
 
            });
            
        }
        );
        
        setAnswers(retData);
   } ;
   getAllAnswers();
},[searchParams]);
 
  const imageBodyTemplate = (rowData) => {
    return <img src={`/${searchParams.get("survey_id")}/${rowData.imageName}`} height={150} onError={(e) =>
         e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className="product-image" />;
}
const marksTemplate = (rowData) => {
    return  rowData.totalMarks/totalRecord*100+"%";
}
const avgTimeTemplate = (rowData) => {
    return  rowData.totalTime/totalRecord
}
 
    return (
      <>
         <div className="row body">
        <div className='col-12'>
             <div className="card text-center">
             <h2 className="text-center"> 
             Is this 
              {searchParams.get("survey_id") ==="s1"?(<>  seat belt traffic sign?     </>)
              :(searchParams.get("survey_id") ==="s2"?(<>   no cellphone while driving traffic sign? </>):
              (searchParams.get("survey_id") ==="s3"?(<>  make the light in regular mode (Normal head lighting) traffic sign? </>):
              (<>   car child seat traffic sign? </>)
              ))}
              
              </h2>
                 <h2>
                    عدد الاشخاص الذين قاموا بالاستبيان : 
                    <red> {totalRecord}</red>
                     </h2>
             </div>
             </div>
             </div>
     <div className="row body">
        <div className='col-12'>
             <div className="card">
                <DataTable value={answers} responsiveLayout="scroll">
                <Column field="imageId"  ></Column>
                    <Column header="" body={imageBodyTemplate}  ></Column>
                    <Column body={marksTemplate} header=" نسبة الاجابات الصحيحة "></Column>
                    <Column body={avgTimeTemplate}   header="  متوسط زمن الاجابة   "></Column>
 
                </DataTable>
            </div>
         </div>
        </div>

        </>
    );
}

export default Avg;