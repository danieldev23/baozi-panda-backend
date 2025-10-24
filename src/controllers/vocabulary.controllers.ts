import { Request, Response } from "express";
import { IVocabulary } from "../interfaces/vocabulary.interfaces";
import VocabularyModel from "../models/vocabulary.models";
import { HandleResponse } from "../types/handle-ressponse.types";
export class VocabularyController {

    async getAll(req: Request, res: Response): Promise<IVocabulary[] | any> {
        try {
            const {limit, page} = req.query;
            const limitNumber = limit ? parseInt(limit as string, 10) : 10;
            const pageNumber = page ? parseInt(page as string, 10) : 1;     
            
            const data = await VocabularyModel.find().limit(limitNumber).skip((pageNumber - 1) * limitNumber);   
            return HandleResponse.sendSuccessResponse(res, data);
        } catch (error) {
            console.error(error);
            return HandleResponse.sendErrorResponse(req, res, "Failed to fetch vocabulary data.");
        }
    }

    async searchByQuery(req: Request, res: Response): Promise<IVocabulary[] | any> {
        try {
            const { q } = req.query;
            const {limit, page} = req.query;
            const limitNumber = limit ? parseInt(limit as string, 10) : 10;
            const pageNumber = page ? parseInt(page as string, 10) : 1;     
            if (!q || typeof q !== "string") {
                return HandleResponse.sendErrorResponse(req, res, "Query parameter 'q' is required and must be a string.");
            }

            const regex = new RegExp(q, "i");
            const data = await VocabularyModel.find({
                $or: [
                    { trad: regex },
                    { simp: regex },
                    { pinyin: regex },
                    { meaning: regex },
                ],

            }).limit(limitNumber).skip((pageNumber - 1) * limitNumber);

            return HandleResponse.sendSuccessResponse(res, data);
        } catch (error) {
            console.error(error);
            return HandleResponse.sendErrorResponse(req, res, "Failed to search vocabulary data.");
        }
    }  
    
    async text2Speech(req: Request, res: Response): Promise<any> {
        const text = req.query.text as string;
        const voice = (req.query.voice as string) || "zh-CN-XiaoxiaoNeural";
        const rate = parseInt(req.query.rate as string) || 0; 
        const volume = parseInt(req.query.volume as string) || 0;
      
        if (!text) return res.status(400).json({ error: "Missing 'text' query" });
        
        console.log(`TTS Request: ${text}, Voice: ${voice}, Rate: ${rate}`);
        
        try {
          const BASE_API_URL = process.env.TTS_BASE_API_URL || '';
          const response = await fetch(BASE_API_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              text,
              voice,
              rate,
              volume,
            }),
          });
      
          if (!response.ok) {
            const errorText = await response.text();
            return res.status(response.status).json({ error: errorText });
          }
      
          const audioBuffer = Buffer.from(await response.arrayBuffer());
      
          res.set({
            "Content-Type": "audio/mpeg",
            "Content-Disposition": `inline; filename="speech.mp3"`,
          });
          res.send(audioBuffer);
        } catch (err) {
          return HandleResponse.sendErrorResponse(req, res, `TTS generation failed. ${String(err)}`);
        }
      }
}