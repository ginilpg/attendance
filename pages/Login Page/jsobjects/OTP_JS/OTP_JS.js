export default 
{
	myVar1: [],
	myVar2: {},
	myFun1: () => {
		//write code here
	},
	verifyLogin:async()=>{
		if(appsmith.store.userData!=undefined && appsmith.store.userData.emp_id) 		navigateTo("Attendance View");
	},
	redirectToMainpage: async ()=>{
		storeValue("userData",Fetch_otp_details.data[0]);
		navigateTo('Attendance View');
		
	},
	activateOtp: async()=>{
		console.log(otpinput);
		//document.getElementById('otpinput').attr('enabled',true);
	},
	verifyOtp:async ()=>
	{
		let empDetails=await Fetch_otp_details.run({'mobile':mobile.text});
		if(empDetails.length>0)
		{
			if(Form1.data.otpinput!=undefined && Form1.data.otpinput.toString() == empDetails[0].otp)
			{
					storeValue("userData",empDetails[0]);
					navigateTo('Attendance View');
			}
		}
		else
			showModal('signinerror_modal');
	}
}