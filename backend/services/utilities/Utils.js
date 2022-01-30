// module.exports = {
//     validateObjandTokenEmail,
//     getClientIP,
// };

// function validateObjandTokenEmail (reqObj, decodedToken) {
//     if (reqObj && decodedToken) {
//         if (reqObj.email && decodedToken.email) {
//             if (reqObj.email == decodedToken.email) {
//                 return true;
//             }
//         }
//     }
//     return false;
// }
// function getClientIP (req) {
//     var ip = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() || 
//          req.connection.remoteAddress || 
//          req.socket.remoteAddress || 
//          req.connection.socket.remoteAddress;

//     return ip;         
// }
