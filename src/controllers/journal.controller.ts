import { Request, Response } from "express";
import { JournalServices } from "../services";

export class JournalController {
  all = async (req: Request, res: Response) => {
    const { status, message, data } = await JournalServices.getAll();
    return res.status(status).json({
      message,
      data,
    });
  };

  one = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message, data } = await JournalServices.getOne(Number(id));
    return res.status(status).json({
      message,
      data,
    });
  };

  create = async (req: Request, res: Response) => {
    const { status, message, data } = await JournalServices.create(req.body);
    return res.status(status).json({
      message,
      data,
    });
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message, data } = await JournalServices.update(
      Number(id),
      req.body
    );
    return res.status(status).json({
      message,
      data,
    });
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, message} = await JournalServices.delete(Number(id));
    return res.status(status).json({
      message,
    });
  };

  getDiaryEntries = async (req: Request, res: Response) => {
    const { status, message, data } = await JournalServices.getDiaryEntries();
    return res.status(status).json({
      message,
      data,
    });
  };

  getBalanceSheet = async (req: Request, res: Response) => {
    const { status, message, data } = await JournalServices.getBalanceSheet();
    return res.status(status).json({
      message,
      data,
    });
  };

  getIncomeStatement = async (req: Request, res: Response) => {
    const { status, message, data } = await JournalServices.getIncomeStatement();
    return res.status(status).json({
      message,
      data,
    });
  };

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