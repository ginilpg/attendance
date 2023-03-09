export default 
{
	myVar1: [],
	myVar2: {},
	myFun1: () => {
		//write code here
	},
	myFun2: async () => {
		//use async-await or promises
	},
	redirectToMainpage: async ()=>{
		storeValue("userData",Fetch_otp_details.data[0]);
		navigateTo('Attendance View');
		
	},
	activateOtp:async ()=>{
		debugger;
		let userdata=await Fetch_otp_details.run({email:email.text});
		
			storeValue("userData",userdata[0]);
			if(userdata.length>0) 
			{
				let otp=Math.floor(1000 + Math.random() * 9000);
				generate_otp.run({'emp_id':userdata[0].emp_id,'otp':otp});
				send_otp_email.run({'email':email.text,'otp':otp});
				storeValue("otp",otp);
			}
	
	},
	verifyOtp: async ()=>
	{
		debugger;
		let otpdata=await verify_otp_query.run({'emp_id':appsmith.store.userData.emp_id,'otp':appsmith.store.otp});
		if(otpdata.length>1) this.redirectToMainpage();
		//console.log(otpdata);
	}
}