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

export const  Admin =()=> {
     const[answers,setAnswers] = useState([]);
     const [searchParams] = useSearchParams();

  useEffect(()=>{
    const getAllAnswers = async () => {
        const res = await fetch('https://x1ohur0x73.execute-api.ap-south-1.amazonaws.com/v1/survey/'+ searchParams.get("survey_id") , {
            headers: {
                'Accept': '*/*'
            }
        });
        const d = await res.json();
        const data = d.Items;
        let retData = [];
        data.forEach(element => {
            element.answers.forEach(e => {
                e.visitor_ID = element.visitor_ID;
                 e.create_date =  element.create_date;
                retData.push(e);
            });
        }
        );
         console.log(retData);
        setAnswers(retData);
   } ;
   getAllAnswers();
},[searchParams]);
 
  const imageBodyTemplate = (rowData) => {
    return <img src={`./${searchParams.get("survey_id")}/${rowData.imageName}`} height={150} onError={(e) =>
         e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className="product-image" />;
}
const userAnswerBodyTemplate = (rowData) => {
    return  rowData.userAnswer?"صحيح":"خطأ";
}
const imgaswerBodyTemplate = (rowData) => {
    return  rowData.imageAnswer?"صحيح":"خطأ";
}
const createDateBodyTemplate = (rowData) => {
    var date = parseInt(rowData.create_date);
    var ndate =    (new Date(date).toUTCString());
    return  ndate;
}
    return (
      <>
        
     <div className="row body">
        <div className='col-12'>
             <div className="card">
                <DataTable value={answers} responsiveLayout="scroll">
                <Column field="visitor_ID" header="رقم المستخدم" sortable></Column>
                     <Column header="image" body={imageBodyTemplate}  ></Column>
                    <Column body={userAnswerBodyTemplate} header="اختيار المستخدم"></Column>
                    <Column body={imgaswerBodyTemplate}   header="الاجابة الصحيحة "></Column>
                    <Column field="mark" header="الدرجة" sortable></Column>
                    <Column field="totalTimeSec" header="زمن الاجابة بالثانية" sortable></Column>
                    <Column body={createDateBodyTemplate} header="التاريخ" sortable></Column>

                </DataTable>
            </div>
         </div>
        </div>

        </>
    );
}

export default Admin;