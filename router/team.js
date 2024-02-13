const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const Team = require("../model/team");
//add team
router.post("/", upload.single('image'), async (req, res) => {
    try {
        //check if team exists
        const teamExist = await Team.findOne({ fullname: req.body.fullname })
        if (teamExist) {
            return res.status(500).send({
                message: "Team already exists",
                success: false
            })
        }
        //upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        //create team people
        const team = await Team.create({
            fullname: req.body.fullname,
            job: req.body.job,
            avatar: result.secure_url,
            cloudinary_id: result.public_id,
        });
        res.status(200).send({
            message: "Team created successfully",
            success: true,
            result: team
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false
        });
    }
});
//Get all Teams
router.get("/", async (req, res) => {
    try {
        const getTeams = await Team.find({})
        res.status(200).send({
            message: "Got All teams",
            success: true,
            data: getTeams
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
        //check if team exists
        const teamExist = await Team.findOne({ _id: req.params.id })
        if (!teamExist) {
            return res.status(500).send({
                message: "Team doesn't exists",
                success: false
            })
        }
        // Find user by id
        let team = await Team.findById(req.params.id);
        console.log(team)
        // Delete image from cloudinary
        await cloudinary.uploader.destroy(team.cloudinary_id);
        // Delete user from db
        await team.deleteOne();
        res.json({
            message: "Team deleted successfully",
            success: true,
            data: team
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
router.put("/:id/update", upload.single("image"), async (req, res) => {
    try {
        //check if team exists
        const teamExist = await Team.findOne({ _id: req.params.id })
        if (!teamExist) {
            return res.status(500).send({
                message: "Team doesn't exists",
                success: false
            })
        }
        let team = await Team.findById(req.params.id);
        // Delete image from cloudinary
        await cloudinary.uploader.destroy(team.cloudinary_id);
        // Upload image to cloudinary
        let result;
        if (req.file) {
            result = await cloudinary.uploader.upload(req.file.path);
        }
        const data = {
            fullname: req.body.fullname || team.fullname,
            job: req.body.job || team.job,
            avatar: result?.secure_url || team.avatar,
            cloudinary_id: result?.public_id || team.cloudinary_id,
        };
        team = await Team.findByIdAndUpdate(req.params.id, data, { new: true });
        res.json({
            message: "Team updated successfully",
            success: true,
            data: team
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,

        })
    }
});
// get by id
router.get("/:id", async (req, res) => {
    try {
        //check if team exists
        const teamExist = await Team.findOne({ _id: req.params.id })
        if (!teamExist) {
            return res.status(500).send({
                message: "Team doesn't exists",
                success: false
            })
        }        // Find user by id
        let team = await Team.findById(req.params.id);
        res.json({
            message: `This user named: ${team.fullname} is brought`,
            success: true,
            data: team,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false
        });
    }
});

module.exports = router