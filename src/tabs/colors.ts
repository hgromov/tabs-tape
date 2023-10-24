const palette = {
  darkBlue: "#001331",
  darkGray: "#424242",
  darkGreen: "#2e5f62",
  lighterGray: "#eeeeee",
  lightGray: "#cccccc",
  paper: "#efefef",
  white: "#ffffff",
};

const tabTheme = {
  backgroundColor: {
    hovered: palette.white,
    primary: palette.paper,
  },
  borderColor: palette.lightGray,
  color: {
    default: palette.darkGray,
    selected: palette.darkGreen,
  },
};

export { palette, tabTheme };
