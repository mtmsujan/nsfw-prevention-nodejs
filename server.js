const express = require("express");
const multer = require("multer");
const jpeg = require("jpeg-js");
const sharp = require("sharp");
const jwt = require("jsonwebtoken"); // for token handling

const tf = require("@tensorflow/tfjs-node");
const nsfw = require("./dist/cjs/index");

// Replace with your secret key for token signing
const secretKey = "secretkey";
const app = express();
const upload = multer();
const port = 8080;
const url = `http://localhost:${port}`;

let _model;

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send("Unauthorized");
  }

  const token = authHeader.split(" ")[1];
  if (token === secretKey) {
    next();
  } else {
    return res.status(403).send("Forbidden");
  }
};

const convert = async (img) => {
  // Decoded image in UInt8 Byte array
  const image = await jpeg.decode(img, true);

  const numChannels = 3;
  const numPixels = image.width * image.height;
  const values = new Int32Array(numPixels * numChannels);

  for (let i = 0; i < numPixels; i++)
    for (let c = 0; c < numChannels; ++c)
      values[i * numChannels + c] = image.data[i * 4 + c];

  return tf.tensor3d(values, [image.height, image.width, numChannels], "int32");
};

app.get("/", (req, res, next) => {
  const options = {
    root: "./",
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };
  const fileName = "index.html";
  // res.set("Content-Type", "text/html");
  res.sendFile(fileName, options, (err) => {
    if (err) {
      next(err);
    } else {
      console.log("Sent:", fileName);
    }
  });
  // res.send(
  //   `Hi there, to test the app send post request to ${url}/nsfw with an image`
  // );
});
app.get("/nsfw", verifyToken, async (req, res) => {
  let imageUrl = req.query.image;
  let buffer;

  try {
    // If the URL is a Base64 data URL
    if (imageUrl.startsWith("data:image")) {
      const base64Data = imageUrl.split(";base64,").pop().trim();
      buffer = Buffer.from(base64Data, "base64");
    } else {
      // If the URL is a regular URL
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }
      const imageBuffer = await response.arrayBuffer();
      buffer = Buffer.from(imageBuffer);
    }
    // Convert image to JPEG format
    buffer = await sharp(buffer).jpeg().toBuffer();
    // Convert and send the response
    const image = await convert(buffer);
    const predictions = await _model.classify(image);
    image.dispose();
    res.json(predictions);
  } catch (error) {
    console.error("Error fetching or processing image:", error.message);
    res
      .status(500)
      .send("Error fetching or processing image: " + error.message);
  }
});

// app.post("/nsfw", upload.single("image"), async (req, res) => {
//   if (!req.file) res.sendStatus(400).send("Missing image multipart/form-data");
//   if (req.file.mimetype != "image/jpeg")
//     res.send("Invalid image format. Accepted format is JPG");
//   else {
//     let buffer = req.file.buffer;
//     const image = await convert(buffer);
//     const predictions = await _model.classify(image);
//     image.dispose();
//     res.json(predictions);
//   }
// });

const load_model = async () => {
  _model = await nsfw.load();
};

// Keep the model in memory, make sure it's loaded only once
load_model().then(() =>
  app.listen(port, () => {
    console.log(
      `\n\n\nApp is listening to port ${port}. Open http://localhost:${port}`
    );
  })
);
