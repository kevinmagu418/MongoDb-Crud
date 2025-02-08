// a function that generatrs a unique code using inbuilt js  math functions

export const generateVerificationcode=async()=>{
//return defines the output
return

Math.floor(100000+Math.random()*900000).toString();



}
// math.random- generates a random no btwn 0 and 1 0 inst clusive 1 exclusive
//*9000 multiply  mat.floor rounds up to the nearerst whole no