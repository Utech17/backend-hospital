import * as fs from "fs";

async function waitFile(filename: string): Promise<void> {
  return new Promise(async (resolve, reject) => {
    if (!fs.existsSync(filename)) {
      await delay(3000);
      await waitFile(filename);
      resolve();
    } else {
      resolve();
    }
  });
}

function delay(time: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

const convert64 = (path: string): string => {
  const file = fs.readFileSync(path).toString("base64");
  return file;
}

export { waitFile, convert64 };