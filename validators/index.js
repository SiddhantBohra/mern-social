const createPostValidator = async (req, res, next) => {
        res.locals.body = req.body.body
        res.locals.title = req.body.title  

    //title Validate
    req.check("title", "Write a Title").notEmpty()
    req.check("title", "Title must be between 4 to 150 characters").isLength({
        min: 4,
        max: 150
    })
    //body
    req.check("body", "Write a body").notEmpty()
    req.check("body", "Body must be between 4 to 2000 characters").isLength({
        min: 4,
        max: 2000
    })
    const errors = await req.validationErrors();
     if (errors) {
        const errorMsg = await errors.map(error => error.msg)[0]
        return res.status(400).json({ error: errorMsg })
    }
    next();
};
module.exports = { createPostValidator }
