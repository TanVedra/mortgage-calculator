const consql = require('../utils/dataBaseConfig');

module.exports = async (req, res) => {
  try{
    const mortgageList = await new Promise((response, reject) => {
      const sql = 'SELECT * FROM mortgage_programs';
      consql.query(sql, (err, mortgageList) => {
        if(err) reject(err);
        response(mortgageList);
      });
    });
    res.status(200).send(JSON.stringify(mortgageList));
  } catch (err) {
    res.status(500).send({ message: err });
  }
};
