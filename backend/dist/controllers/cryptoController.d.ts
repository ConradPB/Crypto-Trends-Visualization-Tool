import { Request, Response } from 'express';
export declare const getCryptoPrices: (req: Request, res: Response) => Promise<void>;
export declare const getHistoricalData: (req: Request, res: Response) => Promise<void>;
export declare const getTrendingCoins: (_req: Request, res: Response) => Promise<void>;
export declare const getMarketData: (req: Request, res: Response) => Promise<void>;
