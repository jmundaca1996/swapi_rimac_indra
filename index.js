const mapp = require('./helper/mapping');

const data = {name : 'luke skywolker' , age : 28};

const getData = async() => {
    const data = await mapp.mapping(data);
    console.log(data);
}



getData();