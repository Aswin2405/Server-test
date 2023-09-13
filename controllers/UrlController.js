import shortid from "shortid";
import URL from "../models/Url.js"

export const createUrl = async(req,res)=>{
    const body = req.body;
    if(!body.url){
        return res.status(400).json({error:"No URL Found"})
    }
    const shortID = shortid()
    await URL.create({
        shortId:shortID,
        redirectUrl:body.url,
        visitHistory:[]
    })
    return res.status(200).json({id:shortID})
}

export const getShortId = async (req, res) => {
    const {shortId} = req.params

    const entry = await URL.findOneAndUpdate(shortId,{
        $push:{
            visitHistory:{
                timestamp:Date.now()
            }
        }
    })
    res.redirect(entry.redirectUrl)
}

export const getAnalytics = async (req, res) => {
    const {shortId} = req.params
    const result = await URL.findOne(shortId)
    return res.status(200).json({totalClicks:result.visitHistory.length,analytics:result.visitHistory})
}