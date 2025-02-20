import { Request, Response } from "express";
import { JournalServices } from "../services";

export class JournalController {
  generateExcel = async (req: Request, res: Response) => {
    const { startDate, endDate } = req.body;
    const { status, message, data } = await JournalServices.generateExcel(startDate, endDate);

    if (status === 200 && data) {
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename="${data.fileName}"`);
      return res.send(data.file);
    }

    return res.status(status).json({ message });
  };
}