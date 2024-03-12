import React from 'react';

function ImageSideRegister() {
  return (
    <div className="hidden lg:flex w-full items-center justify-center">
      <div
        className="w-full h-full mb-20"
        style={{
          backgroundImage: `url(/images/register-image.svg)`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'contain',
        }}
      ></div>
    </div>
  );
}

export default ImageSideRegister;
