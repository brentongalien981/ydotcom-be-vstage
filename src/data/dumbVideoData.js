const bbdevcomVideoVideoIds = [
  "LsaaQTkiTEPlanmQorV02KLvp3PUveyEvEIhVGXXcrtQ",
  "6WdEeniFbOVMeHO2R01EmIFr1J6eLmuRZhhIrID02u18U",
  "rveCUqQwKgyReeqJmEtQXerqzjU01Bo8G8IGxp02MASOg",
  "rQqdD5BTu01KU5J6qNPciznQ00KWnYqhBbaf4rSHYcclI",
  "eVY6oOR1QEmdtUSc8IF01D8nyShL02zLPy601F00FXbY4f4"
];


function getDumbRandombbdevcomVideoVideoId() {

  // Generates a random number from 0 to the length of bbdevcomVideoVideoIds. 
  const randomNumber = Math.floor(Math.random() * bbdevcomVideoVideoIds.length);

  return bbdevcomVideoVideoIds[randomNumber];
}


module.exports = {
  getDumbRandombbdevcomVideoVideoId
}