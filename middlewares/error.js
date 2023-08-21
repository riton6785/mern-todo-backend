class Errrorhandler extends Error{
    constructor(message,statuscode){
        super(message)
        this.statuscode = statuscode
    }
}

export const errorMiddlware = (err,req,res,next)=>{
    return res.status(err.statuscode || 500).json({
        status: false,
        message: err.message || "Internal server error"
    })
}
export default Errrorhandler