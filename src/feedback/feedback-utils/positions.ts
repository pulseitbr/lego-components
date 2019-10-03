const width = "22em";

const wDefaults = {
    width,
    maxWidth: width,
    minWidth: width
};

export default {
    default: { ...wDefaults, top: 10, right: -172 },
    bottomRight: { ...wDefaults, bottom: 10, right: -172 },
    topLeft: { ...wDefaults, top: 10, left: 180 },
    bottomLeft: { ...wDefaults, bottom: 10, left: 180 },
    topCenter: { ...wDefaults, top: 10, left: "50%" },
    bottomCenter: { ...wDefaults, bottom: 10, left: "50%" },
    center: { ...wDefaults, top: "40%", left: "50%" }
};
