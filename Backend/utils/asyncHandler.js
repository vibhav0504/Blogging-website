// this is mainly for fetching data from database so two method one promise and another try catch
// By Promise method
const asyncHandler=(reqHandler)=>{
   return (req,res,next)=>{
    Promise.resolve(reqHandler(req,res,next))
        .catch((error)=>next(error))
    }
    }
    export default  asyncHandler;
    // By Try & Catch Method
    // const asyncHandler=(fn)=>async (req,res,next)=>{
    //     try {
    //         await fn(req,res,next)
    //     } catch (error) {
    //         res.status(err.code||500).json({
    //             success:false,
    //             message:err.message
    //         })
    //     }
    // }