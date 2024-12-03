import paytmchecksum from '../paytm/PaytmChecksum.js';

import { paytmParams,paytmMerchantKey } from '../index.js';
//import formidable from 'formidable';
import https from 'https';
import { Formidable } from 'formidable'; // Update import

export const addPaymentGateway=async(request,response)=>{

    try{
        
      let paytmCheckSum=await paytmchecksum.generateSignature(paytmParams,paytmMerchantKey);

      let params={

        ...paytmParams,'CHECKSUMHASH':paytmCheckSum
      }

      response.status(200).json(params);

    }catch(error)
    {
       response.status(500).json({error:error.message});
    }
};


/*export const PaytmResponse=async(request,response)=>{

    try{


        const form=new formidable.IncomingForm();
        let paytmcheckSum=request.body.CHECKSUMHASH;
        delete request.body.CHECKSUMHASH;
        
        let isVerifySignature=paytmchecksum.verifySignature(request.body,paytmMerchantKey,paytmcheckSum);

        if(isVerifySignature)
        {

            let paytmParams={};
            paytmParams['MID']=request.body.MID;
            paytmParams['ORDERID']=request.body.ORDERID;


            paytmchecksum.generateSignature(paytmParams,paytmMerchantKey).then(function(checksum){

                paytmParams['CHECKSUMHASH']=checksum;
                let post_data=json.stringify(paytmParams);

                let options={
                    hostname:'securegw-stage.paytm.in',
                    port:443,
                    path:'/order/status',
                    header:{
                        'Content-Type':'application/json',
                        'Content-Length':post_data.length
                    }
                }

               let res="";

               let post_req= https.request(options,function(post_res){

                post_res.on('data', function(chunk){

                    res+=chunk;
                });

                  post_res.on('end',function(){
                    
                    let result=JSON.parse(res);
                    response.redirect('http://localhost:3000/')
                })

              })

              post_req.write(post_data);
              post_req.end();
          })
      }
        
        else{
            console.log("checksum mismatched");
        }

    }catch(error)
    {
        response.status(500).json({error:error.message});
    }
}*/




  export const PaytmResponse = async (req, res) => {
    try {
        const form = new Formidable(); // Use Formidable class
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(500).json({ error: 'Error parsing form data' });
            }

            let paytmcheckSum = fields.CHECKSUMHASH[0];
            delete fields.CHECKSUMHASH;

            let isVerifySignature = paytmchecksum.verifySignature(fields, paytmMerchantKey, paytmcheckSum);

            if (isVerifySignature) {
                let paytmParams = {
                    'MID': fields.MID[0],
                    'ORDERID': fields.ORDERID[0]
                };

                let checksum = await paytmchecksum.generateSignature(paytmParams, paytmMerchantKey);
                paytmParams['CHECKSUMHASH'] = checksum;
                let post_data = JSON.stringify(paytmParams);

                let options = {
                    hostname: 'securegw-stage.paytm.in',
                    port: 443,
                    path: '/order/status',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': Buffer.byteLength(post_data)
                    }
                };

                let responseData = '';

                let post_req = https.request(options, (post_res) => {
                    post_res.on('data', (chunk) => {
                        responseData += chunk;
                    });

                    post_res.on('end', () => {
                        let result = JSON.parse(responseData);
                        // Handle the result as needed
                        res.redirect('http://localhost:3000/'); // Adjust the URL as needed
                    });
                });

                post_req.on('error', (e) => {
                    console.error('Request error:', e.message);
                    res.status(500).json({ error: 'Request failed' });
                });

                post_req.write(post_data);
                post_req.end();
            } else {
                console.log("Checksum mismatched");
                res.status(400).json({ error: 'Checksum mismatch' });
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};