import React from "react";
import "./style.scss";

const ImageView = ({...props}) => {
    return (
        <React.Fragment>
            <div className="image-panel panel-default ">
                <div className="image-panel-heading">
                    {/* <h3 class="panel-title"></h3> */}
                    <span className="pull-right clickable" data-effect="fadeOut"  onClick={props.removeImage}>
                        <i className="fa fa-times" data-src={props.src} aria-hidden="true"></i>
                    </span>
                </div>
                <figure className="image-panel-body shadow">
                    <img {...props}/>        
                </figure>
                <div className="image-panel-footer">
                    <i className="fa fa-arrow-left" aria-hidden="true" data-src={props.src} onClick={props.leftArrow}></i>
                    <i className="fa fa-arrow-right" aria-hidden="true" data-src={props.src} onClick={props.rightArrow}></i>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ImageView;