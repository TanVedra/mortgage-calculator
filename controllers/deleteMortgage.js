const consql = require('../utils/dataBaseConfig');

module.exports = async (req, res) => {
  try{
    const result = await new Promise((resolve, reject) => {
      const sql = `DELETE FROM mortgage_programs WHERE mortgage_programs.id = ${req.body['id']}`;
      consql.query(sql, (err, data) => {
        if(err) reject(err);
        resolve(data);
      });
    });
    result.affectedRows
      ? res.sendStatus(204)
      : res.status(404).send({message: 'Nothing to delete'});
  } catch(err) {
    res.status(500).send({ message: err });
  }
};
