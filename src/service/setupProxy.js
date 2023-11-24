const adminMiddleware = (req, res, next) => {
  if (req.user.role === 'admin') {
    next(); // O usuário está autorizado, continue para o próximo middleware
  } else {
    res.redirect('/unauthorized'); // Redirecionar para página não autorizada
  }
}

//  Implementa o middleware em sua rota
app.get('/admin/dashboard', adminMiddleware, (req, res) => {

});