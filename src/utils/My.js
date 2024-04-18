const { v4: uuidv4 } = require("uuid");


class My {
  static displayJsonContents(jsonObj) {
    const jsonString = JSON.stringify(jsonObj, null, 2); // The third argument (2) adds indentation for readability
    console.log(jsonString);
  }



  static getDefaultAltImgSrc() {
    return "/img/product/beetle-1.jpg";
  }



  static log(msg) {
    console.log(msg);
  }


  static sleep(ms = 1000) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  static generateUuid() {
    return uuidv4();
  }
}


module.exports = My;