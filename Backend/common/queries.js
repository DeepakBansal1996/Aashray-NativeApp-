const { getColumnsAndValues, getSetCondition } = require("./function");

exports.userSignup = (data) => {
  const reqData = getColumnsAndValues(data);
  return ` insert into Users(${reqData.columns}) values(${reqData.Values}) `;
};

exports.NGOSignup = (data) => {
  const reqData = getColumnsAndValues(data);
  return ` insert into authorities(${reqData.columns}) values(${reqData.Values}) `;
};

exports.updateUserDetails = (data, id) => {
  const setCondition = getSetCondition(data);
  return ` update users set ${setCondition} where id = ${id} `;
};

exports.updateNGODetails = (data, id) => {
  const setCondition = getSetCondition(data);
  return ` update authorities set ${setCondition} where id = ${id} `;
};

exports.updateAddressDetails = (data, id) => {
  const setCondition = getSetCondition(data);
  return ` update addressdetails set ${setCondition} where id = ${id} `;
};

exports.updateVerificationDetails = (data, id) => {
  const setCondition = getSetCondition(data);
  return ` update VerificationDetails set ${setCondition} where id = ${id} `;
};

exports.getUserAddressAndVerificationIds = id => {
  return `select AddressDetailId, VerificationDetailId from users where id = ${id}`;
};

exports.getNGOAddressAndVerificationIds = id => {
  return `select AddressDetailId, VerificationDetailId from authorities where id = ${id}`;
};

exports.listNGO = `select a.id, a.UserTypeId, a.AuthorityName, a.Email, a.Phone1, a.Phone2, a.Phone3,
                  a.isEmailVerified, a.isActive, a.isVerifiedUser, ad.HouseBuilding, ad.AddressLine1, 
                  ad.AddressLine2, ad.City, ad.State , ad.Country , ad.PinCode
                  from authorities as a inner join AddressDetails as ad on a.AddressDetailId = ad.Id
                  where a.UserTypeId = 4 and a.isActive = 1`;

exports.deleteAddressId = addressid => {
  return ` delete from addressdetails where Id=${addressid} `;
};

exports.deleteverificationid = verificationid => {
  return ` delete from VerificationDetails where Id=${verificationid} `;
};

exports.getUserByEmail = email => {
  return `select id, UserTypeId, Password, Email, AddressDetailId, VerificationDetailId, isVerifiedUser from Users where Email = '${email}' 
          select id, UserTypeId, Password, Email, AddressDetailId, VerificationDetailId, isVerifiedUser from authorities where Email = '${email}'`;
};

exports.listPrivateProperties = `select * from helps 
                                inner join AddressDetails on helps.AddressDetailId = AddressDetails.Id 
                                where helps.AccomodationType = 'Private'`;

exports.listGovtShelters = `select * from helps 
                            inner join AddressDetails on helps.AddressDetailId = AddressDetails.Id 
                            where helps.AccomodationType = 'Government_Shelters'`;

exports.userOfferedHelps = id => {
  return `select * from helps where UserId = ${id} and AccomodationType = 'Private'`;
};

exports.insertHelp = data => {
  const reqData = getColumnsAndValues(data);
  return `insert into helps(${reqData.columns}) values(${reqData.Values})`;
};

exports.insertNewAddress = data => {
  const reqData = getColumnsAndValues(data);
  return `insert into addressdetails(${reqData.columns}) values(${reqData.Values}) select SCOPE_IDENTITY() as id`;
};

exports.getUserDetails = id => {
  return `select * from users where id = ${id}`;
}

exports.getAddressDetails = id => {
  return `select * from AddressDetails where id = ${id}`;
};

exports.getVerificationDetails = id => {
  return `select * from VerificationDetails where id = ${id}`;
};

exports.getNGODetails = id => {
  return `select * from Authorities where id = ${id}`;
};

exports.verifyUser = (userId, ngo) => {
  return `update Users set isVerifiedUser = 1, VerifiedBy = '${ngo}' where id = ${userId}`;
}

exports.verifyNGO = (ngoId, user) => {
  return `update Authorities set isVerifiedUser = 1, VerifiedBy = '${user}' where id = ${ngoId}`;
};

exports.deleteUser = email => {
  return `delete from Users where Email = '${email}'`
};

exports.deleteNGO = email => {
  return `delete from Authorities where Email = '${email}'`;
};

exports.getUnverifiedUser = `select * from Users where isVerifiedUser = 0`;

exports.raiseRescueRequest = data => {
  const reqData = getColumnsAndValues(data);
  return `insert into RescueDetails(${reqData.columns}) values(${reqData.Values})`;
};

exports.rescueRequestList = `select * from RescueDetails where isActive = 1`;
