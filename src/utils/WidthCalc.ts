const keys = [
  { name: "mobile", default: "mwi", sufix: "" },
  { name: "tablet", default: "mwi", sufix: "-sm" },
  { name: "landscape", default: "mwi", sufix: "-sm" },
  { name: "desktop", default: "mwi", sufix: "-l" },
  { name: "large", default: "mwi", sufix: "-xl" }
];

const WidthCalc = (props: any) => {
  let className = "";
  keys.forEach((x) => {
    if (props.hasOwnProperty(x.name)) {
      className += `mw${props[x.name]}${x.sufix} `;
    } else {
      className += `${x.default}${x.sufix} `;
    }
  });
  return className;
};

export default WidthCalc;
