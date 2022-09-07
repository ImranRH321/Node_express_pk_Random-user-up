const fs = require("fs");
const path = require("path");

module.exports.dashboardHome = (req, res, next) => {
  res.sendFile(path.join(__dirname + "/../views/dashboard.html"));
};

/* Form*/
// module.exports.dashboardUserSaveForm = (req, res, next) => {
// res.sendFile(path.join(__dirname + "/../views/userSave.html"));
// };


module.exports.dashboardUserAll = (req, res, next) => {
  const allJsonData = fs.readFileSync(__dirname + "/../public/data.json", "utf-8");
  const allParseData = JSON.parse(allJsonData)
  if(allParseData){
    const {limit} = req.query;
    const dataAll = allParseData.slice(0, limit) 
    res.status(200).send({status: 200,  messages: 'success', data: dataAll})
  }else{
    res.status(404).json({
      status: 404,
      messages: 'Id Not Exists try Another id', 
      success: false
  })
  }
}

/* user save done*/
module.exports.dashboardUserSave = (req, res, next) => {
  const { id, name, contact, photoUrl, gender, address } = req.body;
  const oldData = fs.readFileSync(__dirname + "/../public/data.json", "utf-8");
  const oldParseData = JSON.parse(oldData);

  if (id && name && contact && photoUrl && gender && address) {
    const userBody = { id, name, contact, photoUrl, gender, address };
    const idLove = oldParseData.find(el => el.id === id);

    if (idLove === undefined || idLove === null) {
      const newData = [...oldParseData, userBody];
      const clientDataAdd = JSON.stringify(newData);
      fs.writeFileSync(__dirname + "/../public/data.json", clientDataAdd);
      res.status(200).send({
        status: 200,
        messages: 'successfully save data added',
        success: success
      });
    } else {
      res.status(400).send({
        status: 400,
        messages: "exists  data change id then check now ",
        success: false,
        data: idLove,
      });
    }
  } else {
    res.status(404).send({
      status: 404,
      messages: "body  all Require ment data Not found",
      success: false,
    });
  }
};


// update user 
module.exports.dashboardUserUpdate = (req, res, next) => {
  const id = req.params.id 
  const userBody = req.body; 
  const allJsonData = fs.readFileSync(__dirname + "/../public/data.json", "utf-8");
  const allParseData = JSON.parse(allJsonData)
  const filterChecking = allParseData.find(el => el.id === parseInt(id)) 

  if(filterChecking !==undefined) {
    filterChecking.id = userBody.id ?userBody.id : filterChecking.id 
    filterChecking.name = userBody.name ? userBody.name : filterChecking.name 
    filterChecking.gender = userBody.gender ?  userBody.gender : filterChecking.gender
    filterChecking.address = userBody.address ? userBody.address : filterChecking.address
    filterChecking.photoUrl = userBody.photoUrl ?userBody.address:filterChecking.photoUrl
    filterChecking.contact = userBody.address ?userBody.address :filterChecking.contact
    const loveIdAll = allParseData.filter(el => el.id !== parseInt(id)) 
    const newAddPush = [...loveIdAll, filterChecking]
    const stringifyUser = JSON.stringify(newAddPush) 
    fs.writeFileSync(__dirname + "/../public/data.json", stringifyUser);

    res.status(200).json({
      status: 200,
      messages: 'successfully updated data', 
      success: true,
      data: filterChecking
    })
  }else{
    res.status(404).json({
      status: 404,
      messages: 'Id Not Exists try Deference limited id', 
      success: false
    })
  }
}

// bulk-update 
module.exports.dashboardUserBulkUpdate = (req, res, next) => {
  const userArray = req.body;
  const allJsonData = fs.readFileSync(__dirname + "/../public/data.json", "utf-8");
  const allParseData = JSON.parse(allJsonData)
  
  if(Array.isArray(userArray)){
  userArray.map(element => {
  const filterChecking = allParseData.find(el => el.id=== element.id) 
  if(filterChecking){
  filterChecking.id = element.id ?element.id : filterChecking.id 
  filterChecking.name = element.name ? element.name : filterChecking.name 
  filterChecking.gender = element.gender ?  element.gender : filterChecking.gender
  filterChecking.address = element.address ? element.address : filterChecking.address
  filterChecking.photoUrl = element.photoUrl ?element.address:filterChecking.photoUrl
  filterChecking.contact = element.address ?element.address :filterChecking.contact  
 
   const loveIdAll = allParseData.filter(el => el.id !== element.id) 
  const newAddPush = [...loveIdAll, filterChecking]
    const stringifyUser = JSON.stringify(newAddPush) 
  fs.writeFileSync(__dirname + "/../public/data.json", stringifyUser);
  res.status(200).json({
    status: 200,
    messages: 'successfully multiple update data', 
    success: true,
    data: filterChecking
  })
}else{
  res.status(404).json({
    status: 404,
    messages: 'Id Not Exists try Another id', 
    success: false
  })
}
  });
  }else{
    res.status(404).send({success: false, messages: "user require ment array then check"})
  }
} 


// delete user
module.exports.dashboardUserDelete = (req, res, next) => {
  const id = req.params.id 
  const allJsonData = fs.readFileSync(__dirname + "/../public/data.json", "utf-8");
  const allParseData = JSON.parse(allJsonData)
  const exists = allParseData.find(el => el.id=== Number(id)) 
  if(exists){
    const loveIdAll = allParseData.filter(el => el.id !== exists.id) 
    const stringifyUser = JSON.stringify(loveIdAll) 
  fs.writeFileSync(__dirname + "/../public/data.json", stringifyUser);
  res.status(200).json({
    status: 200,
    messages: 'successfully Deleted data', 
    success: true,
    data: exists
  })
  }else{
    res.status(404).json({
      status: 404,
      messages: 'Id Not Exists try Another id', 
      success: false
    })
  }
} 