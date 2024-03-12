import React from 'react';

function ImageSideLogin() {
  return (
    <div className="hidden lg:flex w-full items-center justify-center">
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `url(/images/login-image.svg)`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'contain',
        }}
      ></div>
    </div>
  );
}

export default ImageSideLogin;
