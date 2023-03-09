export default {
	myVar1: [],
	verifyLogin:async()=>
	{
		if(appsmith.store.userData==undefined || !appsmith.store.userData?.emp_id) navigateTo("Login Page");
		
	},
	checkinTabSelected: async() => {
		if(Tabs1.selectedTab=="Checkin/Checkout")
		{
			navigator.permissions && navigator.permissions.query({name: 'geolocation'})
    .then((PermissionStatus)=>{ 
	 if(PermissionStatus.state != 'granted' && PermissionStatus.state != 'prompt') {
          storeValue("location_permission",false);
        }
				else
					storeValue("location_permission",true);

			});
				storeValue("checkin_data",{});
				await fetch_checkintime.run();
			  storeValue("current_location",await appsmith.geolocation.getCurrentPosition());
				if(fetch_checkintime.data.length>0) storeValue("checkin_data",fetch_checkintime.data[0]);
		}
	},
	
	submitCheckInOut: async (pastAttendance=false) => {
		//write code here
		let params={};
		if(pastAttendance)
		{
			params.checkin_location="NA";
			params.checkin_time=moment(CheckinDate.formattedDate + ' ' + mark_attendance_form.data.checkInTime + ":" + mark_attendance_form.data.checkinTimeMinute).format('Y-MM-DD HH:mm');

			params.checkout_time=moment(CheckinDate.formattedDate+' '+mark_attendance_form.data.checkOutTime+":"+mark_attendance_form.data.checkoutTimeMinute).format('Y-MM-DD HH:mm');
			await submit_missed_checkIn.run(params);
			closeModal('mark_attendance');
			fetch_attendance.run();
			return;
		}
		let checkin_type=Object.keys(appsmith.store.checkin_data).length>0? appsmith.store.checkin_data.checkout_time ? "checkin" : "checkout" : 'checkin';

		params.checkin_type=checkin_type;
		debugger;
		let checkin_location=await appsmith.geolocation.getCurrentPosition();
		let location_params={"latitude":checkin_location.coords.latitude,"longitude":checkin_location.coords.longitude};
		let loaction_data=await Reverse_geolocation.run(location_params);
		params.checkin_location=loaction_data.results[0].formatted;
	  console.log(params);
		if(checkin_type=="checkin")
			await submit_checkIn.run(params);
		else
			await update_checkout.run(params);
	 //this.checkinTabSelected();
		await fetch_checkintime.run();
    if (fetch_checkintime.data.length > 0) storeValue("checkin_data", fetch_checkintime.data[0]);
		await fetch_attendance.run();
		navigateTo('Attendance View');
		
	},
	verifyCheckinout:  ()=> {
		//use async-await or promises
	//	storeValue("checkin_type","checkin");

		//if(fetch_checkintime?.data[0]?.checkin_time)
		if(Object.keys(appsmith.store.checkin_data).length>0 && appsmith.store.checkin_data.checkin_time)
		{
			//storeValue("checkin_type","checkout");
			return 'CheckOut';
		}
		return 'CheckIn';
	}
}