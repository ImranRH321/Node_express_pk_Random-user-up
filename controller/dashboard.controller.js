const fs = require("fs");
const path = require("path");

module.exports.dashboardHome = (req, res, next) => {
  res.sendFile(path.join(__dirname + "/../views/dashboard.html"));
};

/* Form*/
// module.exports.dashboardUserSaveForm = (req, res, next) => {
// res.sendFile(path.join(__dirname + "/../views/userSave.html"));
// };

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
