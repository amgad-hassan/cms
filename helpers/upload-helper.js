const path = require('path');

module.exports = {

  uploadDir: path.join(__dirname,'../public/uploads/'),


  isEmpty: function(obj){
      for(let key in obj){
          if(obj.hasOwnProperty){
            return false
          }

      }
      return true;

  }
};