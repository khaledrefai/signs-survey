import React from 'react';
 import 'primereact/resources/themes/saga-green/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'bootstrap/dist/css/bootstrap.rtl.css'; 
import{useState , useEffect} from "react"
import{AnswersService} from './AnswersService'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export const  Admin =()=> {
    const anserService = new AnswersService();
    const[answers,setAnswers] = useState([]);

  useEffect(()=>{
    anserService.getAllAnswers().then(data => {
        let retData =[];
        data.forEach(element => {
            element.answers.forEach(e =>{
                e.visitor_ID = element.visitor_ID;
                retData.push(e);
            })
            
        });
        console.log(retData)

         setAnswers(retData)
        
    });
   },[]);
 
  const imageBodyTemplate = (rowData) => {
    return <img src={`./images/${rowData.imageName}`} height={150} onError={(e) =>
         e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className="product-image" />;
}
const userAnswerBodyTemplate = (rowData) => {
    return  rowData.userAnswer?"صحيح":"خطأ";
}
const imgaswerBodyTemplate = (rowData) => {
    return  rowData.imageAnswer?"صحيح":"خطأ";
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
                </DataTable>
            </div>
         </div>
        </div>

        </>
    );
}

export default Admin;