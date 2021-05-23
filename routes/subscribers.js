const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')

//Getting all
router.get('/', async(req, res) => {
        // res.send('hello world')
        try {
            const subscribers = await Subscriber.find()
            res.json(subscribers)
        } catch (err) {
            res.status(500).json({ massage: err.massage })
        }
    })
    //Getting one
router.get('/:id', getSubscriber, (req, res) => {
    res.json(res.subscriber)
})

//Creating one //16:18 min in the YouTube video ///Im here
router.post('/', async(req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })

    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//updating one
router.patch('/:id', getSubscriber, (req, res) => {

})

//Deleting one
router.delete('/:id', getSubscriber, async(req, res) => {
    try {
        await res.subscriber.remove()
        res.json({ message: 'Delete Subscriber' })
    } catch (err) {
        res.status(500).json({ message: err.message })

    }
})

async function getSubscriber(req, res, next) {
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null) {
            return res.status(404).json({ message: 'Cannot find subscriber' })

        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.subscriber = subscriber
    next()
}

module.exports = router