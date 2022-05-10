const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM aspro_turnosextra', (err, customers) => {
     if (err) {
      res.json(err);
     }
     res.render('customers', {
        data: customers
     });
    });
  });
};

controller.save = (req, res) => {
  const data = req.body;
  console.log("save")
  console.log(req.body)
  req.getConnection((err, connection) => {
      const query = connection.query('INSERT INTO aspro_turnosextra set ?', data, (err, customer) => {
      console.log(customer)
      res.redirect('/');
    })
  })
 
};

controller.edit = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM aspro_turnosextra WHERE id = ?", [id], (err, rows) => {
      res.render('customers_edit', {
        data: rows[0]
      })
    });
  });
};

controller.update = (req, res) => {
  const { id } = req.params;
  const newC = req.body;
  req.getConnection((err, conn) => {
   // connection.query('UPDATE users SET ? WHERE UserID = ?', [{ Name: name }, userId])
    conn.query('UPDATE aspro_turnosextra SET ? WHERE id = ?', [newC, id], (err, rows) => {
    res.redirect('/');
  });
  });
};

controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM aspro_turnosextra  WHERE id = ?', [id], (err, rows) => {
      res.redirect('/');
    });
  });
}

module.exports = controller;
