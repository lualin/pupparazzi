// Require calls
const express = require('express')
const fs = require('fs')
const path = require('path')
const puppiesData = require('./data/data.json')
// const { route } = require('./server')

// Router setting
const router = express.Router()

// Data path setting
const dataPath = path.join(__dirname, '..', '/server/data', 'data.json')

router.post('/add', (req, res) => {
  const newID = puppiesData['puppies'].length + 1
  const newName = req.body.name
  const newBreed = req.body.breed
  const newOwner = req.body.owner
  const newPetObj = {
    id: newID,
    name: newName,
    owner: newOwner,
    image: '',
    breed: newBreed,
    _locals: {},
  }

  try {
    puppiesData['puppies'].push(newPetObj)
    res.redirect('/')
  } catch (error) {
    console.log(error)
  }
})

// '/puppies/:id', id paramter given to find a puppy with same id as the param
router.get('/:id', (req, res) => {
  // Find from puppies json file where the id params matches to puppy id
  const puppyObj = puppiesData['puppies'].find(
    (elem) => elem.id === parseInt(req.params.id)
  )
  res.render('details', puppyObj)
})

// '/puppies/:id/edit, get edit view page to edit the props of puppy
router.get('/:id/edit', async (req, res) => {
  const editObj = puppiesData['puppies'].find(
    (elem) => elem.id === parseInt(req.params.id)
  )
  await res.render('edit', editObj)
})

// When submit buttons is clicked, it updates the props of puppy
router.post('/:id/edit', async (req, res) => {
  const puppyId = parseInt(req.params.id) // parameter to integer
  const updatedName = req.body.name // get name from input
  const updatedBreed = req.body.breed // get breed from input
  const updatedOwner = req.body.owner // get owner from input

  // Find the index of the puppy object in the array
  const puppyIndex = puppiesData['puppies'].findIndex(
    (elem) => elem.id === puppyId // find puppy id that matches the param given
  )

  // Update the puppy object with the new name
  try {
    // console.log changes made
    // pet name change
    console.log('-----------<Name>-----------')
    console.log(`Before: ${puppiesData['puppies'][puppyIndex].name}`)
    puppiesData['puppies'][puppyIndex].name = updatedName // index given and update the puppy name
    console.log(`After: ${updatedName} \n`)

    // pet breed change
    console.log('-----------<Breed>-----------')
    console.log(`Before: ${puppiesData['puppies'][puppyIndex].breed}`)
    puppiesData['puppies'][puppyIndex].breed = updatedBreed // index given and update the puppy breed
    console.log(`After: ${updatedBreed} \n`)

    // pet owner change
    console.log('-----------<Owner>-----------')
    console.log(`Before: ${puppiesData['puppies'][puppyIndex].owner}`)
    puppiesData['puppies'][puppyIndex].owner = updatedOwner // index given and update the puppy owner
    console.log(`After: ${updatedOwner} \n`)

    // Write the updated data back to the file
    fs.writeFile(dataPath, JSON.stringify(puppiesData), (err) => {
      if (err) throw err
      // if error incurs, throw error
      // or console.log successful msg
      console.log('All data updated.')
    })

    // Redirect the user back to the details page for the updated puppy
    await res.redirect(`/puppies/${puppyId}`)
  } catch {
    // if puppy id is not valid, head to 404 error page
    res.status(404).send('Puppy not found')
  }
})

// Module exports
module.exports = router
