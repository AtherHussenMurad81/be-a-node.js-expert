import path from "path";

// static import

import fs from "fs/promises";
import type { Order } from "../types";

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
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2)); //* code clean rakar jonno null, 2 dewa
  }

  //   ?

  // * GET

  async get() {
    const data = await this.readData();
    return data;
  }
  //   * GET single data by ID

  async getByID(id: string) {
    const data = await this.readData();
    // console.log(data);
    const singleData = data.find((order) => order.id == id);
    // console.log(singleData);
    return singleData;
  }

  //*   create
  async create(order: Omit<Order, "id">) {
    // data niye asa

    const data = await this.readData();
    // * new data create kora
    const newOrder = { ...order, id: String(Math.floor(Math.random() * 100)) };
    // data push kora array er maje push hoy
    data.push(newOrder);

    //  data write korbo

    await this.writeData(data);
  }

  //   * Update data

  async update(
    id: string,
    update: Partial<Omit<Order, "id">>, //all optional korar jonno partial diyesi
  ): Promise<Order | null> {
    const data = await this.readData();
    const i = data.findIndex((order) => order.id === id);
    if (i === -1) return null;

    data[i] = {
      ...data[i],
      ...update,
    } as Order;

    //* write data

    await this.writeData(data);
    return data[i];
  }

  //*  delete

  async delete(id: string) {
    const data = await this.readData();

    const i = data.findIndex((order) => order.id === id);
    if (i === -1) return null;

    data.splice(i, 1);

    await this.writeData(data);

    return true;
  }
}

export const orderService = new OrderService();

// await orderService.create({
//   customer: "ather",
//   food: "bat",
//   price: 100,
//   quantity: 5,
// });

// const rs = await orderService.getByID("ORD-1005");

// console.log(rs);
