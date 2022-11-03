const smilephone = require("../models/smile_phones");

const patientPhone = require("../models/patient_phones");

exports.getPhoneNumber = async (req, res, next) => {
  const clinic = req.body.clinic;
  const phone = req.body.phone;
  const patientData = await patientPhone.findAll({
    where: {
      patient_phone: phone,
      clinic_name: clinic,
    },
  });
  // Checks if the patient have already been to the clinic before.
  if (patientData[0] != undefined) {
    res.json({ smile_phone_number: patientData[0].smile_phone });
    return;
  }
  const patientPhoneData = await patientPhone.findAll({
    attributes: ["smile_phone"],
    where: {
      patient_phone: phone,
    },
  });
  const allBotsPhonesOfPatient = patientPhoneData.map((phone) => {
    return phone.dataValues.smile_phone;
  });
  const smilePhoneData = await smilephone.findAll({
    attributes: ["phone"],
  });
  const allSmilePhones = smilePhoneData.map((smilephone) => {
    return smilephone.dataValues.phone;
  });
  const difference = allSmilePhones.filter(
    (x) => !allBotsPhonesOfPatient.includes(x)
  );
  // Check if there are any bots available.
  if (difference.length > 0) {
    const array = { smile_phone_number: difference[0] };
    patientPhone.create({
      smile_phone: array.smile_phone_number,
      clinic_name: clinic,
      patient_phone: phone,
    });
    res.json({ smile_phone_number: array.smile_phone_number });
  } else {
    res.send("<h1>No Bots Available!</h1>");
  }
};
