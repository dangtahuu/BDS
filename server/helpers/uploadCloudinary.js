const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: "dh4ive3qz",
  api_key: "839422229925918",
  api_secret: "P_MaYU6PEoNfFk_16t8NUzx6DO8",
});

//Email: batdongsan.buitiendat@gmail.com
//Pass: Buitiendat99$

exports.uploadMultiImagesToCloud = async (files, folder) => {
  try {
    const arrayImagesLink = [];
    //upload nhiều file
     for( let file of files){
        const result = await cloudinary.uploader.upload(file.path, {
          folder,
        });
        arrayImagesLink.push(result.secure_url);
        //xóa file ở local
        fs.unlinkSync(file.path)
     }

    return arrayImagesLink;
  } catch (err) {
    return err;
  }
};

exports.uploadSingleImageToCloud = async (file, folder) => {
    const uploadSingle = await cloudinary.uploader.upload(file, {
        folder: folder
    });
    await fs.unlinkSync(file);
    return uploadSingle.secure_url;
}

exports.uploadSingleVideoToCloud = async (file, folder) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder,
      resource_type: "video",
    });

    fs.unlinkSync(file); // Xóa file trong thư mục trên server

    return result.secure_url;
  } catch (err) {
    return err;
  }
};