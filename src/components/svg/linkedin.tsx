import React from "react";

interface Props {
  size: number;
  color: string;
}

const PixelLinkedin = ({ size, color }: Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 33 32"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1128_19960)">
        <path d="M32.8501 3.04999H31.3201V28.95H32.8501V3.04999Z" />
        <path d="M31.32 28.95H29.8V30.48H31.32V28.95Z" />
        <path d="M31.32 1.51999H29.8V3.04999H31.32V1.51999Z" />
        <path d="M29.8001 4.57001H28.2701V27.43H29.8001V4.57001Z" />
        <path d="M29.8001 30.48H3.89014V32H29.8001V30.48Z" />
        <path d="M28.27 27.43H5.42004V28.95H28.27V27.43Z" />
        <path d="M23.7001 15.24H22.1801V13.71H19.1301V15.24H17.6101V13.71H14.5601V22.86H17.6101V18.29H19.1301V16.76H20.6601V18.29H22.1801V22.86H25.2301V16.76H23.7001V15.24Z" />
        <path d="M11.5101 13.71H8.46008V22.86H11.5101V13.71Z" />
        <path d="M11.5101 9.14001H8.46008V12.19H11.5101V9.14001Z" />
        <path d="M28.27 3.04999H5.42004V4.56999H28.27V3.04999Z" />
        <path d="M29.8001 0H3.89014V1.52H29.8001V0Z" />
        <path d="M5.42014 4.57001H3.89014V27.43H5.42014V4.57001Z" />
        <path d="M3.89012 28.95H2.37012V30.48H3.89012V28.95Z" />
        <path d="M3.89012 1.51999H2.37012V3.04999H3.89012V1.51999Z" />
        <path d="M2.3701 3.04999H0.850098V28.95H2.3701V3.04999Z" />
      </g>
      <defs>
        <clipPath id="clip0_1128_19960">
          <rect
            width="32"
            height="32"
            fill="white"
            transform="translate(0.850098)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default PixelLinkedin;
