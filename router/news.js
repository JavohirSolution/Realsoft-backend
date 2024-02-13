const router = require("express").Router();
const News = require("../model/news");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const multer = require("multer");


router.post("/", upload.array("images", ), async (req, res) => {
    console.log(req.files);
    try {
        const newsExists = await News.findOne({ title: req.body.title });
        if (newsExists) {
            return res.send({
                message: "This news have been already used",
                success: false
            });
        }

        // upload image to cloudinary`
        const result1 = await cloudinary.uploader.upload(req.files[0])
        const result2 = await cloudinary.uploader.upload(req.files[1])
        // create news
        const news = new News({
            title: req.body.title,
            icon: result1.secure_url,
            icon_id: result1.public_id,
            date: req.body.date,
            short_content: req.body.short_content,
            content: req.body.content,
            image: result2.secure_url,
            cloudinary_id: result2.public_id
        });
        await news.save();
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false
        });
    }
})

module.exports = router