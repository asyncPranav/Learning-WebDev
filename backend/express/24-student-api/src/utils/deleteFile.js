import fs from "fs/promises";

const deleteFile = async (filePath) => {
  if (!filePath) return;

  try {
    await fs.unlink(filePath);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("File already deleted");
      return;
    }

    console.error(error);
  }
};

export default deleteFile;
