import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";

const CropFunctionality = ({ coverImage }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  }, []);

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };

  const onCropSizeChange = () => {};
  return (
    <>
      <Cropper
        image={coverImage}
        crop={crop}
        zoom={zoom}
        onCropChange={onCropChange}
        onCropComplete={onCropComplete}
        onZoomChange={onZoomChange}
        onCropSizeChange={onCropSizeChange}
        // cropSize={{ width: 1000, height: 200 }}
      />
    </>
  );
};

export default CropFunctionality;
