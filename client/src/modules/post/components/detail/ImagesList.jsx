import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

const ImagesList = (props) => {
    const { images } = props;
    const [currentImage, setCurrentImage] = useState();
    useEffect(() => {
        setCurrentImage(images[0])
    },[])
    return <React.Fragment>
        <div className="post-image-detail-show">
            <img src={currentImage} alt="Ảnh" />
        </div>

        <div className="post-image-detail-list">
            {images.map((i) => <div onClick={() => setCurrentImage(i)}>
                <img src={i} alt="Ảnh" />
            </div>)}
        </div>
        
    </React.Fragment>
};

const mapStateToProps = state => {
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(ImagesList);