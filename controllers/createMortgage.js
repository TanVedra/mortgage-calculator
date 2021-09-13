const consql = require('../utils/dataBaseConfig');

module.exports = async (req, res) => {
  try{
    const result = await new Promise((response, reject) => {
      const sql = `
             INSERT INTO mortgage_programs (bank_name, interest_rate, maximum_loan, minimum_down_payment, loan_term)
             VALUES (
                     '${req.body['bank_name']}',
                     ${req.body['interest_rate']},
                     ${req.body['maximum_loan']},
                     ${req.body['minimum_down_payment']},
                     ${req.body['loan_term']}
             );
            `;
      consql.query(sql, (err, result) => {
        if(err) reject(err);
        response(result);
      });
    });
    res.status(201).send(JSON.stringify({...req.body, id: result.insertId}));
  } catch (err) {
    res.status(500).send({ message: err });
  }
};
