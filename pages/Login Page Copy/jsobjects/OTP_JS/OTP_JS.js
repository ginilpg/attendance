export default 
{
	myVar1: [],
	myVar2: {},
	myFun1: () => {
		//write code here
	},
	redirectToMainpage: async ()=>{
		storeValue("userData",Fetch_otp_details.data[0]);
		navigateTo('Attendance View');
		
	},
	activateOtp: async()=>{
		console.log(otpinput);
		//document.getElementById('otpinput').attr('enabled',true);
	},
	verifyOtp:()=>
	{
	//debugger;
		if(Form1.data.otpinput!=undefined && Form1.data.otpinput.toString() == Fetch_otp_details.data[0].otp)
		{
			return true;
		}
		else return false;
		
	}
}