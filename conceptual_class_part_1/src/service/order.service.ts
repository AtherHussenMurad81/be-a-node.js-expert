import path from "path";
import type { Order } from "../types";
// static import

import fs from "fs/promises";

const DB_PATH = path.join(process.cwd(), "db", "data.json");
// console.log('current cws',DB_PATH);

class OrderService {
  //readData, writeData

  private async readData(): Promise<Order[]> {
    try {
      // import fs from 'fs/promises';

      const data = await fs.readFile(DB_PATH, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  private async writeData(data: Order[]) {
    await fs.writeFile(DB_PATH, JSON.stringify(data));
  }
  // * GET

  async get() {
    const data = await this.readData();
    return data;
  }
  //   create
}

const orderServide = new OrderService();
