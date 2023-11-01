import { palette } from "../constants";
import { SvgProps } from "../tabs.types";

const ArrowIcon = ({
  color = palette.paper,
  height = 10,
  opacity = "1",
  width = 16,
  ...props
}: SvgProps) => (
  <svg
    width="16"
    height="10"
    viewBox="0 0 16 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.6061 9.63242C14.0943 10.1206 14.8858 10.1206 15.3739 9.63242C15.8621 9.14426 15.8621 8.35281 15.3739 7.86465L8.71411 1.20485C8.22596 0.716693 7.4345 0.716692 6.94634 1.20485L0.366114 7.86464C-0.122042 8.35279 -0.122041 9.14425 0.366114 9.63241C0.85427 10.1206 1.64573 10.1206 2.13388 9.63241L7.83023 3.85649L13.6061 9.63242Z"
      fill={color}
    />
  </svg>
);

export default ArrowIcon;
