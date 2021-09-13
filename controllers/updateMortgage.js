const consql = require('../utils/dataBaseConfig');

module.exports = async (req, res) => {
  try {
    const result = await new Promise((response, reject) => {
      const sql = `
                 UPDATE mortgage_programs 
                 SET 
                     bank_name = '${req.body['bank_name']}',
                     interest_rate = ${req.body['interest_rate']},
                     maximum_loan = ${req.body['maximum_loan']},
                     minimum_down_payment = ${req.body['minimum_down_payment']},
                     loan_term = ${req.body['loan_term']}
                 WHERE mortgage_programs.id = ${req.body['id']}
            `;
      consql.query(sql, (err, result) => {
        if (err) reject(err);
        response(result);
      });
    });
    result.affectedRows
      ? res.status(200).send(JSON.stringify(req.body))
      : res.status(404).send({ message: 'Nothing to update' });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};
