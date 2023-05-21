const db = require('./db');

async function getMultiple(){
  const rows = await db.query(
    `SELECT id, node, value, unit, updated_at 
    FROM active_pwr`
  );
  const data = emptyOrRows(rows);

  return {
    data
  }
}

async function create(energyData){
  const result = await db.query(
    `INSERT INTO active_pwr
    (node, value, unit) 
    VALUES 
    (${energyData.node}, ${energyData.value}, "${energyData.unit}")`
  );

  let message = 'Error in creating entry';

  if (result.affectedRows) {
    message = 'Entry added successfully';
  }

  return {message};
}

async function update(id, energyData){
  const result = await db.query(
    `UPDATE active_pwr
    SET node=${energyData.node}, value=${energyData.value}, unit="${energyData.unit}"
    WHERE id=${id}` 
  );

  let message = 'Error in updating data entry';

  if (result.affectedRows) {
    message = 'data entry updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM active_pwr WHERE id=${id}`
  );

  let message = 'Error in deleting data entry';

  if (result.affectedRows) {
    message = 'data entry deleted successfully';
  }

  return {message};
}

function emptyOrRows(rows){
  if (!rows) {
    return [];
  }
  return rows;
}

module.exports = {
    getMultiple,
    create,
    update,
    remove
  }