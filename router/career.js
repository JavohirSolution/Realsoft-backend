const router = require("express").Router();
const Career = require("../model/career");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer")
//add
router.post("/", upload.single("icon"), async (req, res) => {
    try {

        // upload image
        const result = await cloudinary.uploader.upload(req.file.path);
        // create career
        const career = new Career({
            icon: result.secure_url,
            icon_id: result.public_id,
            job: req.body.job,
            heading: req.body.heading,
            salary: req.body.salary,
            experience: req.body.experience,
            operatingMode: req.body.operatingMode
        });
        await career.save();

        res.send({
            message: "New career created successfully",
            success: true,
            data: career
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false
        })
    }
})
//Get all Teams
router.get("/", async (req, res) => {
    try {
        const getCareer = await Career.find({})
        res.status(200).send({
            message: "olindi",
            success: true,
            data: getCareer
        })
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false
        })
    }
})
//delete 
router.delete("/:id", async (req, res) => {
    try {
        //check if career exists
        const careerExist = await Career.findOne({ _id: req.params.id })
        if (!careerExist) {
            return res.status(500).send({
                message: "Career doesn't exists",
                success: false
            })
        }
        // Find career by id
        let career = await Career.findById(req.params.id);
        // Delete image from cloudinary
        await cloudinary.uploader.destroy(career.icon_id);
        // Delete career from db
        await career.deleteOne();
        res.json({
            message: "Career deleted successfully",
            success: true,
            data: career
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false
        });
    }
});
//update
router.put("/:id/update", upload.single("icon"), async (req, res) => {
    try {
        //check if career exists
        const careerExist = await Career.findOne({ _id: req.params.id })
        if (!careerExist) {
            return res.status(500).send({
                message: "Career doesn't exists",
                success: false
            })
        }
        let career = await Career.findById(req.params.id);
        // Delete image from cloudinary
        await cloudinary.uploader.destroy(career.icon_id);
        // Upload image to cloudinary
        let result;
        if (req.file) {
            result = await cloudinary.uploader.upload(req.file.path);
        }
        const data = {
            icon: result.secure_url || career.icon,
            icon_id: result.public_id || career.icon_id,
            job: req.body.job || career.job,
            heading: req.body.heading || career.heading,
            salary: req.body.salary || career.salary,
            experience: req.body.experience || career.experience,
            operatingMode: req.body.operatingMode || career.operatingMode
        };
        career = await Career.findByIdAndUpdate(req.params.id, data, { new: true });
        res.json({
            message: "Career updated successfully",
            success: true,
            data: career
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,

        })
    }
});
module.exports = router