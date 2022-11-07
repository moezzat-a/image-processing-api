import sharp from "sharp";
import express from "express";
import path from "path";
import fs from "fs";

const img = express.Router();

const cached: string[] = [];

const testFolder = path.join(process.cwd(), "assets", "thumb");

fs.readdirSync(testFolder).forEach((file) => {
  cached.push(file.split(".")[0]);
});

async function resizeImage(
  imgPath: string,
  outPath: string,
  width: number,
  height: number
): Promise<void> {
  try {
    await sharp(imgPath)
      .resize({
        width: width || undefined,
        height: height || undefined,
      })
      .toFile(outPath);

    return;
  } catch (error) {
    console.error(error);
    throw new Error(<string>error);
  }
}

img.get(
  "/",
  async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const query = req.query;
      const width = Number(query.width),
        height = Number(query.height),
        img = String(query.img);

      const imgName = path.isAbsolute(String(img))
        ? path.parse(String(img)).name
        : img;

      const imgPath = path.isAbsolute(String(query.img))
        ? img
        : path.join(process.cwd(), "assets", "full", `${img}.jpg`);

      const outPath = path.join(
        process.cwd(),
        "assets",
        "thumb",
        `${imgName}_${width}x${height}.jpg`
      );

      if (width > 5000 || height > 5000) {
        res.status(400).json({ error: "The new size is too big" });
        return;
      }

      if (cached.includes(`${imgName}_${width}x${height}`)) {
        res.status(200).sendFile(outPath);
        return;
      }

      console.log(cached);
      await resizeImage(imgPath, outPath, Number(width), Number(height));
      cached.push(`${imgName}_${width}x${height}`);
      res.sendFile(outPath);
      return;
    } catch (error) {
      res.status(404).json({ error: `Can't find your image: ${error}` });
    }
  }
);

export { img, resizeImage };
