/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('money').truncate()
  await knex('money').insert([
    {id: 1, money: 100000}
    
    
  ]);
};
