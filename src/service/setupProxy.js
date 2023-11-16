const adminMiddleware = (req, res, next) => {
    if (req.user.role === 'admin') {
      next(); // User is authorized, continue to the next middleware
    } else {
      res.redirect('/unauthorized'); // Redirect to unauthorized page
    }
  }
  
  // Implement the middleware in your route
  app.get('/admin/dashboard', adminMiddleware, (req, res) => {
    // Render admin dashboard
  });