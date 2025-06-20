module.exports = {   
  getCsrfToken: function (req, res) { 	
  return res.json({ _csrf: req.csrfToken() }); 
  }

  };  
  