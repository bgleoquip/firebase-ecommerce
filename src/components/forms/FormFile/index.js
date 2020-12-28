import React, { useState } from 'react';
import './styles.scss';
import spinner from '../../../assets/spinner.gif';
import ImageView from "../Images";
const FormFile = ({ handleChange, label, multipleEntry, getFileData, removeCallback, leftArrowCallBack, rightArrowCallback, files,...otherProps }) => {
	const [loading, setLoading] = useState(false);
	const [image,setImage] = useState([...files]);
	const uploadImage = async e => {
		

		const files = e.target.files
		const data = new FormData();
		data.append("file", files[0]);
		data.append("upload_preset", "cloudImage");
		setLoading(true);

		const res = await fetch("https://api.cloudinary.com/v1_1/cloudname7/image/upload",
		{
			method: "POST",
			body: data
		});

		const file = await res.json();
		console.log("file")
		if (multipleEntry) {
			getFileData([...image, file.secure_url])
			setImage([...image, file.secure_url]);
		} else { 
			getFileData([file.secure_url])
			setImage([file.secure_url]);
		}
		setLoading(false);
	}
	const removeImage = async (e) =>{
		debugger
		const item = e.target.dataset && e.target.dataset.src
		if(item) {
			const index = image.indexOf(item);
			image.splice(index, 1);
			setImage([...image]);
		}
		if(removeCallback) removeCallback();
	}
	function move(arr, old_index, new_index) {
		while (old_index < 0) {
			old_index += arr.length;
		}
		while (new_index < 0) {
			new_index += arr.length;
		}
		if (new_index >= arr.length) {
			var k = new_index - arr.length;
			while ((k--) + 1) {
				arr.push(undefined);
			}
		}
		 arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);  
	   return arr;
	}
	const leftArrow = async (e) =>{
		debugger
		const item = e.target.dataset && e.target.dataset.src
		if(item) {
			const index = image.indexOf(item);
			const images = move(image, index, index-1);
			setImage([...images]);
		}
		if(leftArrowCallBack) leftArrowCallBack();
	}
	const rightArrow = async (e) =>{
		const item = e.target.dataset && e.target.dataset.src
		if(item) {
			const index = image.indexOf(item);
			const images = move(image, index, index+1);
			setImage([...images]);
		}
		if(rightArrowCallback) rightArrowCallback();
	}
	return (
		<div className="formRow">
			<div>
			{
				label && (
					<label>{label}</label>
			)}
			</div>
			<div>
				{ 
				image.map((im,index) => {
					return (<ImageView
						key= {index}
						src= {im}
						alt= ""
						style= {{ width: "57px", height: "58px" }}
						removeImage= {removeImage}
						leftArrow= {leftArrow}
						rightArrow= {rightArrow}
					/>)
					})
				}
				{	loading?<img src={spinner} alt="" style={{ width: "57px", height: "58px" }}/>:""}
			</div>
		
		
		{/* <input className="fileInput" ref={fileRef} onChange={handleChange} style={{"display":"none"}} /> */}
		<input className="formInput" type="file" onChange={uploadImage} {...otherProps}/>
		</div>
	);
}

export default FormFile;