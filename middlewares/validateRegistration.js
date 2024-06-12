import db from '../db/index.js';

const validateRegistration = (req, res, next) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ error: 'Användarnamn och lösenord krävs' });
    }
  
    if (username.length < 3 || password.length < 6) {
      return res.status(400).json({ error: 'Användarnamn måste vara minst 3 tecken och lösenord minst 6 tecken långt' });
    }
  
    db.findOne({ username: username }, (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'serverfel' });
      }
  
      if (user) {
        return res.status(409).json({ error: 'Användarnamn finns redan' });
      }
  
      next(); 
    });
  };

  export default validateRegistration;