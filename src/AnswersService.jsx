export class AnswersService {
 

    async getAllAnswers() {
        const res = await fetch('https://x1ohur0x73.execute-api.ap-south-1.amazonaws.com/v1/survey', {
            headers: {
                'Accept': '*/*'
            }
        });
        const d = await res.json();
        return d.Items;
    }

    saveResults(data ){
        const payload = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'  },
            body: JSON.stringify(data )
        };
        console.log(payload);
        fetch('https://x1ohur0x73.execute-api.ap-south-1.amazonaws.com/v1/survey', payload)
            .then(response => response.json())
     }
 
}
     