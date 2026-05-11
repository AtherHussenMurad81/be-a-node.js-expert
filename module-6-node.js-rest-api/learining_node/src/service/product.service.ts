import fs from "fs";
import path from "path";

const filepath = path.join(process.cwd(), "./src/database/db.json");

export const readProduct = () => {
  //   console.log(process.cwd());
  //   console.log(filepath);

  const products = fs.readFileSync(filepath, "utf-8"); //* utf-8 means, when i have some buffer data. its will be human readable like to string
  //   console.log(products);  baffer object gives. convert toString
  //   console.log(products.toString());
  //   console.log(products);
  return JSON.parse(products);
};
