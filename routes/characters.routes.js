const router = require("express").Router();
const axios = require("axios");

/* GET home page */
router.get("/characters", (req, res, next) => {
    axios.get("https://ih-crud-api.herokuapp.com/characters")
    .then(responseFromAPI => {
        // console.log(responseFromAPI)
        res.render("characters/list-characters", { characters: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});

// CREATE 

router.get("/characters/create-character", (req,res) => {
    res.render("characters/create-character");
});

router.post("/characters/create-character", (req, res) => {
    const { name, occupation, weapon, debt } = req.body;
    axios.post("https://ih-crud-api.herokuapp.com/characters", {
        name,
        occupation,
        weapon,
        debt,
      })
      .then((responseFromAPI) => {
        console.log(responseFromAPI);
        res.redirect("/characters");
      })
      .catch((error) => console.log(error));
  });
/// 

// UPDATE

router.get("/characters/:id/edit", (req, res) => {
    const characterId = req.params.id;
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${characterId}`)
      .then((responseFromAPI) => {
        console.log(responseFromAPI);
        res.render("characters/edit-character", { character: responseFromAPI.data });
      })
      .catch((err) => console.error(err));
  });
  
  //UPDATE POST 
  
  router.post("/characters/:id/update", (req, res) => {
    const characterId = req.params.id;
    const characterInfo = req.body;
    axios.put(`https://ih-crud-api.herokuapp.com/characters/${characterId}`,
        characterInfo
      )
      .then((responseFromAPI) => {
        res.redirect(`/characters/${characterId}`);
      })
      .catch((error) => console.log(error));
  });
// // /////////////

router.get("/characters/:id", (req, res, next) => {
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then(responseFromAPI => {
         console.log("details: ", responseFromAPI.data)
        res.render("characters/details-character", { character: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});

///

// DELETE 

router.get("/characters/:id/delete", (req, res) => {
    const characterId = req.params.id;
    console.log("DELETE")
    axios.delete(`https://ih-crud-api.herokuapp.com/characters/${characterId}`)
    .then(() => {
      res.redirect("/characters");
    })
    .catch((err) => console.log(err));

})
module.exports = router;


// https://ih-crud-api.herokuapp.com/characters