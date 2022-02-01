import axios from "axios";

function callAPI(){
  if(localStorage.getItem("exercisedb")===null || Date.now()>localStorage.getItem("expiration")){
    let options = {
      method: 'GET',
      url: 'https://exercisedb.p.rapidapi.com/exercises',
      headers: {
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
        'x-rapidapi-key': 'c830dfa486msh993e6cad3c005d6p1dda60jsnfccb1c6aef35'
      }
    };
    axios.request(options).then(function (response) {
      console.log(response.data);
      localStorage.setItem("exercisedb",JSON.stringify(response.data));
      localStorage.setItem("expiration",Date.now()+(7*(3600*24))*1000);
    }).catch(function (error) {
      console.error(error);
    });
  }else{
    return;
  }

}

export{callAPI}