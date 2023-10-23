const palette = {
  darkGray: "#424242",
  darkGreen: "#2e5f62",
  lighterGray: "#eeeeee",
  lightGray: "#cccccc",
  lightGreen: "#e1e9df",
  white: "#ffffff",
};

const tabTheme = {
  backgroundColor: {
    hovered: palette.lightGreen,
    primary: palette.white,
  },
  borderColor: palette.lightGray,
  color: {
    default: palette.darkGray,
    selected: palette.darkGreen,
  },
};

export { palette, tabTheme };
