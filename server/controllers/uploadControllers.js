const AWS = require('aws-sdk');
const sharp = require('sharp');

const s3 = new AWS.S3();

exports.uploadImage = async (req,res) =>{
    try{
        const resizeImage = await sharp(req.file.buffer)
        .resize({width:800})
        .toFormat('webp')
        .toBuffer();

        const params = {
            Bucket : "Image-name",
            Key: Date.now().toString() + 'webp',
            Body:resizedImage,
            ContentType: 'Image/webp',
            ACL:'public-read'

        };

        s3.upload(params,(error,data)=>{
            if(error){
                return res.status(500).send(error.message);
            }
            res.status(200).send(data);
        });

    }catch(error){
        res.status(500).send(error);
    }
};