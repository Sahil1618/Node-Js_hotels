const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');


router.post('/', async(req, res)=>{

    try{
      const data = req.body

      const newPerson = new Person(data);
      const response = await newPerson.save();
      console.log('data saved');
      res.status(200).json(response);
    }
    catch(err) {
      console.log(err);
      res.status(500).json({error: 'Internal server error'});
    }
  

})

router.get('/',async(req,res)=>{
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    } catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal server error'});
    }
  })

  router.get('/:workType',async(req, res) =>{
    try{
      const workType = req.params.workType;
      if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
  
          const response = await Person.find({work: workType});
          console.log('response fetched');
          res.status(200).json(response) 
  
      } else {
        res.status(404).json({error: 'Invalid work type'});
      }
  
  
    } catch(err) {
      console.log(err);
      res.status(500).json({error: 'Internal server error'});
    }
  
  })

  router.get('/:id', async(req,res)=>{
    res.send("Got the person")
  })

  router.put('/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        console.log(id)
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(id, updatedPersonData, {
          new: true,
          runValidators: true,
        })

        if (!response) {
          return res.status(404).json({ error: 'Person not found'});
          }
          
        console.log('data updated');
        res.status(200).json(response);

    } catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal server error'});
    }
  })

  router.delete('/:id', async (req, res) => {
    try {
    const personId = req.params.id; // Extract the person's ID
    // from the URL parameter
    // Assuming you have a Person model
    const deletedPerson = await Person.findByIdAndRemove(personId);
    if (!deletedPerson) {
    return res.status(404).json({ error: 'Person not found' });
    }
    // Send a success message as a JSON response
    res.json({ message: 'Person deleted successfully' });
    } catch (error) {
    console.error('Error deleting person:', error);
    res.status(500).json({ error: 'Internal server error' });
    }
    });


  module.exports = router;
