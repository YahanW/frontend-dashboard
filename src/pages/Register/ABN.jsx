import react,{useEffect,useState} from 'react';
import axios from 'axios';
import XMLParser from 'react-xml-parser';

export default function ABN(){
    const [sString,setsString] = useState("");
    const [hisDetail,setHisDetail] = useState("");
    const [auGuid,setAuGuid] = useState("");

    const getLookUp = () =>{

        axios.get(`https://abr.business.gov.au/ABRXMLSearch/AbrXmlSearch.asmx/SearchByABNv201408?searchString=${sString}&includeHistoricalDetails=${hisDetail}&authenticationGuid=${auGuid}`,{
            headers:{
                'Host': 'abr.business.gov.au',
                'Content-Type': 'text/json',
            }
        }).then(
            (res)=>{
                var xml = new XMLParser().parseFromString(res.data); 
                console.log(xml.children[1])
                console.log(xml.children[1].children[0].name,xml.children[1].children[0].value)
                console.log(xml.children[1].children[1].name,xml.children[1].children[1].value)
                console.log(xml.children[1].children[2].name,xml.children[1].children[2].value)
                console.log(xml.children[1].children[3].name,xml.children[1].children[3].value)
               

            }
        )

    }


    return(
        <div>
            <div className='abn' style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                searchString
                <input type='text' required onChange={(event)=>{setsString(event.target.value)}}/>
                historyDetails
                <input type='text' required onChange={(event)=>{setHisDetail(event.target.value)}}/>
                authGUID
                <input type='text' required onChange={(event)=>{setAuGuid(event.target.value)}}/>
                <button onClick={getLookUp}>submit</button>
            </div>
            
           
        </div>

    )
}