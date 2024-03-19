function index(req, res) {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM users', (err, users) => {
            if (err) {
                res.json(err);
            }
            res.render('users/index', { users });
        });
    });
}

function create(req, res) {

    res.render('users/create');
}

function store(req, res) {
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO users SET ?', [data], (err, rows) => {
            res.redirect('/users');
        });
    });
}

function destroy(req, res) {
    const id = req.body.id;

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM users WHERE id = ?', [id], (err, rows) => {
            res.redirect('/users');
        });
    })
}

function edit(req, res) {
    const id = req.params.id;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM users WHERE id = ?', [id], (err, users) => {
            if (err) {
                res.json(err);
            }
            res.render('users/edit', { users });
        });
    });
}

function update(req, res) {
    const id = req.params.id;
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('UPDATE users SET ? WHERE id = ?', [data, id], (err, rows) => {
            res.redirect('/users');
        });
    });
}

//Agregar metodos al exports
module.exports = {
    index: index,
    create: create,
    store: store,
    destroy: destroy,
    edit: edit,
    update: update,
}