import React, {useState } from 'react';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
 
export const InfoDialog = () => {
    const [displayResponsive, setDisplayResponsive] = useState(false);

    const dialogFuncMap = {
        'displayResponsive': setDisplayResponsive
    }

    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);
 
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }

    const renderFooter = (name) => {
        return (
            <div>
                 <Button label="اغلاق"  onClick={() => onHide(name)} autoFocus />
            </div>
        );
    }

    return (<>
                   <Button label="تعليمات" icon="pi pi-info" onClick={() => onClick('displayResponsive')} />
                <Dialog header="Header" visible={displayResponsive} onHide={() => onHide('displayResponsive')} 
                breakpoints={{'960px': '75vw'}} style={{width: '50vw'}} footer={renderFooter('displayResponsive')}>
                    <p> 
                    يرجى الضغط على زر خطأ في حال كانت الصورة لا تعبر عن العبارة المكتوبة 
                    والضغط على زر صحيح في حال تطابق الصورة مع العبارة 

                    </p>
                </Dialog>
                </>
    )
}

export default InfoDialog;