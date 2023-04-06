import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserPassword, updateUserProfile } from "../redux/actions/userActions";
import Swal from "sweetalert2";

export default function UserDetail() {
	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	const userDetails = useSelector((state) => state.userDetails);
	const { user } = userDetails;
	const dispatch2 = useDispatch();

	const [fullname, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [username, setUserName] = useState("");
	const [currentpassword, setCurrentPassword] = useState("");
	const [newpassword, setNewPassword] = useState("");
	const [confirmpassword, setConfirmPassword] = useState("");

	useEffect(() => {
		if (userInfo) {
			dispatch(getUserDetails("profile"));
		}
	}, []);

	useEffect(() => {
		if (user) {
			setFullName(user.fullname);
			setUserName(user.username);
			setEmail(user.email);
			setPhone(user.phone);
		}
	}, [dispatch2, user]);

	const handleChangeInfo = (e) => {
		e.preventDefault();
		dispatch2(updateUserProfile({ id: user._id, fullname, username, email, phone }))
	}
	const handleChangePassword = (e) => {
		
		if (newpassword !== confirmpassword) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "New password and confirm password do not match!",
			});
		}
		else {
			dispatch(updateUserPassword({ id: user._id, currentpassword, newpassword }));
		}
		e.preventDefault();
	}

	return (
		<div>
			<NavBar />
			<div className="ml-28">
				<h1 className="uppercase text-2xl font-bold pt-5">My Profile</h1>
				<div className="bg-violet-100 mr-10 rounded-2xl mt-5 p-5">
					<div>
						<form onSubmit={handleChangeInfo}>
							<h1 className="font-bold text-2xl mb-5 uppercase">{fullname}</h1>
							<div>{/*Location*/}</div>
							<div className="grid grid-cols-3">
								<fieldset className="col-span-2">
									<legend className="text-center text-gray-600 font-bold">PERSONAL INFORMATION</legend>
									<div>
										<div className="grid grid-cols-2 gap-9 uppercase text-gray-500">
											<label className="ml-3">Fullname</label>

										</div>
										<div className="grid grid-cols-2 gap-9">
											<input
												type="text"
												name="fullname"
												placeholder="Fullname"
												className="py-2 px-3 rounded-xl mt-5"
												value={fullname || ""}
												onChange={(e) => setFullName(e.target.value)}
											/>

										</div>
									</div>
									<div className="mt-5 uppercase text-gray-500">
										<label className="ml-3">Username</label>
										<div className="grid grid-cols-2 gap-9">
											<input
												type="text"
												name="username"
												placeholder="Username"
												className="py-2 px-3 rounded-xl mt-5"
												value={username || ""}
												onChange={(e) => setUserName(e.target.value)}
											/>
										</div>
									</div>
								</fieldset>
							</div>
							<div className="grid grid-cols-3 mt-5">
								<fieldset className="col-span-2">
									<legend className="text-center text-gray-600 font-bold">CONTACT INFORMATION</legend>
									<div className="uppercase text-gray-500">
										<div>
											<label className="ml-3">Email Address</label>
											<div>
												<input
													type="text"
													name="email"
													placeholder="Email"
													className="w-full py-2 px-3 rounded-xl mt-5"
													value={email || ""}
													onChange={(e) => setEmail(e.target.value)}
												/>
											</div>
										</div>
										<div className="mt-5">
											<label className="ml-3">Phone Number</label>
											<div>
												<div className="grid grid-cols-2 gap-9">
													<input
														type="text"
														name="phone"
														placeholder="Phone number"
														className="py-2 px-3 rounded-xl mt-5"
														value={phone || ""}
														onChange={(e) => setPhone(e.target.value)}
													/>
												</div>
												<div></div>
											</div>
										</div>
									</div>
								</fieldset>
							</div>
							<div>
								<button type='submit' className="bg-violet-500 text-white py-2 px-3 rounded-xl mt-5 hover:bg-violet-600 transition ease-in">Save Changes</button>
							</div>
						</form>
						<form onSubmit={(e) => handleChangePassword(e)}>
							<div className="grid grid-cols-3 mt-5" >
								<fieldset className="col-span-2">
									<legend className="text-center text-gray-600 font-bold">PASSWORD</legend>
									<div className="uppercase text-gray-500 grid grid-cols-3 gap-9">
										<div>
											<label className="ml-3">Current Password</label>
											<div>
												<input
													type="password"
													name="password"
													className="w-full py-2 px-3 rounded-xl mt-5"
													placeholder="Current Password"
													value={currentpassword || ""}
													onChange={(e) => setCurrentPassword(e.target.value)}
													required
												/>
											</div>
										</div>
										<div>
											<label className="ml-3">New Password</label>
											<div>
												<input
													type="password"
													name="newpassword"
													placeholder="New Password"
													className="w-full py-2 px-3 rounded-xl mt-5"
													value={newpassword || ""}
													onChange={(e) => setNewPassword(e.target.value)}
													required
												/>
											</div>
										</div>
										<div>
											<label className="ml-3">Confirm New Password</label>
											<div>
												<input
													type="password"
													name="confirmpassword"
													className="w-full py-2 px-3 rounded-xl mt-5"
													placeholder="Confirm New Password"
													value={confirmpassword || ""}
													onChange={(e) => setConfirmPassword(e.target.value)}
													required
												/>
											</div>
										</div>
									</div>
								</fieldset>
							</div>
							<div>
								<button className="bg-violet-500 text-white py-2 px-3 rounded-xl mt-5 hover:bg-violet-600 transition ease-in"
								type = 'submit'
									>Change Password</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
