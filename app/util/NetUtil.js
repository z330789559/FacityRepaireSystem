let NetUtil = {
  postJson(url, data, callback){
        let fetchOptions = {
          method: 'POST',
          headers: {
              'mode':'cors',
              'cache': 'default',
              'Access-Control-Allow-Origin':'*',
              'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
              'Content-Type': 'application/json',
               'credentials': 'credentials'
          },
          body:JSON.stringify(data)//这里我参数只有一个data,大家可以还有更多的参数
        };

        fetch(url, fetchOptions)
        .then((response) => {
            console.log(response);
            return response.json()
        })
        .then((data) => {
         //  callback(JSON.parse(responseText));
           callback(data);
        }).catch((error)=>{
            console.warn(error)
        })
            .done();
  },
    getJson(url,data,callBack){
        url=url+"?"
        Object.keys(data).forEach(function (item) {
            url+=item+"="+data[item]+"&"
        })
        fetch(url).then((response) => response.json())
            .then((data)=>{
                callBack(data)
            })
    }
}
export default NetUtil;
