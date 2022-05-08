import { Request, Response } from "express";
import { getPingStatus } from "../services/health-check.service";

export const handlePing = (_req: Request, res: Response) => {
    const pingStatus = getPingStatus();
    res.json(pingStatus);
}
